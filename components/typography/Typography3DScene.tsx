"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { clamp, damp, easeInOutCubic, easeOutCubic, lerp, range } from "@/lib/math";
import { COLORS } from "@/lib/site";

const FONT_URL = "/assets/fonts/archivo-display.typeface.json";

/** One animated word and the slice of section progress it owns. */
export type TypeChapter = {
  word: string;
  /** Section progress at which the word starts assembling. */
  start: number;
  /** Section progress at which it has fully left (ignored for `hold`). */
  end: number;
  /** Keep the word on screen after it arrives (the final chapter). */
  hold?: boolean;
};

export type Typography3DSceneProps = {
  chapters: TypeChapter[];
  /** Section scroll progress 0..1 (from useScrollProgress). */
  progressRef: RefObject<number>;
  reducedMotion: boolean;
  /** Fewer curve / bevel segments and a capped DPR for phones. */
  lite: boolean;
  /** Pauses rendering while the section is off screen. */
  active: boolean;
  /** "light" = white letters for use over imagery; "dark" = charcoal on the page. */
  tone?: "light" | "dark";
  onReady?: () => void;
  onError?: () => void;
};

// Glyph geometry is built at size 1 and scaled to fit the canvas each frame.
const DEPTH = 0.16;
const TRACKING = 0.035;
const STAGGER = 0.16;
const FOV = 30;
const CAMERA_Z = 10;

let fontPromise: Promise<Font> | null = null;
function loadFont() {
  fontPromise ??= fetch(FONT_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`Font request failed: ${r.status}`);
      return r.json();
    })
    .then((json) => new FontLoader().parse(json));
  return fontPromise;
}

/**
 * Two materials per glyph (TextGeometry groups: 0 = front/back faces,
 * 1 = extruded sides). Faces are unlit so the letterform shows the exact
 * brand colour and stays crisp; the sides are lit and a step lighter, which
 * is what makes the depth read.
 */
type GlyphMaterials = [THREE.MeshBasicMaterial, THREE.MeshStandardMaterial];

type Letter = {
  mesh: THREE.Mesh<TextGeometry, GlyphMaterials>;
  /** Resting x position (letter centre) inside the word. */
  x: number;
};

type Word = {
  group: THREE.Group;
  inner: THREE.Group;
  letters: Letter[];
  width: number;
};

/** Builds one mesh per glyph so every letter can move independently. */
type Palette = { ink: GlyphMaterials; accent: GlyphMaterials };

function buildWord(word: string, font: Font, lite: boolean, materials: Palette): Word {
  const scale = 1 / font.data.resolution;
  const letters: Letter[] = [];
  const inner = new THREE.Group();
  let pen = 0;

  for (const ch of word) {
    const glyph = font.data.glyphs[ch];
    if (!glyph) continue;
    if (ch.trim()) {
      const geometry = new TextGeometry(ch, {
        font,
        size: 1,
        depth: DEPTH,
        curveSegments: lite ? 4 : 9,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.018,
        bevelSegments: lite ? 1 : 3,
      });
      geometry.computeBoundingBox();
      const box = geometry.boundingBox!;
      const cx = (box.min.x + box.max.x) / 2;
      // Pivot each letter on its own centre, at the baseline, mid-depth.
      geometry.translate(-cx, 0, -DEPTH / 2);
      // The full stop picks up the brand pink; everything else is charcoal / white.
      const source = /[.!?]/.test(ch) ? materials.accent : materials.ink;
      const material: GlyphMaterials = [source[0].clone(), source[1].clone()];
      const mesh = new THREE.Mesh(geometry, material);
      inner.add(mesh);
      letters.push({ mesh, x: pen + cx });
    }
    pen += glyph.ha * scale + TRACKING;
  }

  const width = pen - TRACKING;
  for (const l of letters) l.mesh.position.x = l.x - width / 2;
  const group = new THREE.Group();
  group.add(inner);
  return { group, inner, letters, width };
}

function Words({ chapters, progressRef, reducedMotion, lite, tone = "dark", onReady, onError }: Typography3DSceneProps) {
  const [font, setFont] = useState<Font | null>(null);
  const rootRef = useRef<THREE.Group>(null);
  const smoothed = useRef<number | null>(null);
  const announced = useRef(false);

  useEffect(() => {
    let alive = true;
    loadFont()
      .then((f) => alive && setFont(f))
      .catch(() => alive && onError?.());
    return () => {
      alive = false;
    };
  }, [onError]);

  const materials = useMemo<Palette>(() => {
    const side = (color: string, toward: string, amount: number) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color).lerp(new THREE.Color(toward), amount),
        roughness: 0.55,
        metalness: 0.05,
        transparent: true,
      });
    const face = tone === "light" ? COLORS.surface : COLORS.ink;
    const accent = tone === "light" ? COLORS.blush : COLORS.rose;
    return {
      ink: [
        new THREE.MeshBasicMaterial({ color: face, transparent: true }),
        // White letters get warm grey sides; charcoal letters get lighter charcoal sides.
        tone === "light" ? side(COLORS.line, COLORS.slate, 0.25) : side(COLORS.ink, COLORS.surface, 0.3),
      ],
      accent: [
        new THREE.MeshBasicMaterial({ color: accent, transparent: true }),
        side(accent, COLORS.ink, 0.2),
      ],
    };
  }, [tone]);

  const words = useMemo(
    () => (font ? chapters.map((c) => buildWord(c.word, font, lite, materials)) : []),
    [font, chapters, lite, materials],
  );

  // Mount / dispose the generated meshes.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !words.length) return;
    words.forEach((w) => root.add(w.group));
    return () => {
      words.forEach((w) => {
        root.remove(w.group);
        w.letters.forEach(({ mesh }) => {
          mesh.geometry.dispose();
          mesh.material.forEach((m) => m.dispose());
        });
      });
    };
  }, [words]);

  useEffect(() => () => [...materials.ink, ...materials.accent].forEach((m) => m.dispose()), [materials]);

  useFrame((state, delta) => {
    if (!words.length) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;

    // Light extra damping on top of the hook's smoothing — the letters feel
    // weighted without lagging noticeably behind the scrollbar.
    const raw = progressRef.current ?? 0;
    smoothed.current = smoothed.current === null ? raw : damp(smoothed.current, raw, 9, dt);
    const p = smoothed.current;

    // Fit the longest word to the canvas: 92% of the visible width, and no
    // taller than 62% of the visible height. Left aligned like the copy.
    const { width, height } = state.size;
    const visibleH = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const visibleW = visibleH * (width / height);
    const longest = Math.max(...words.map((w) => w.width));
    const scale = Math.min((visibleW * 0.92) / longest, visibleH * 0.62);
    const left = -visibleW / 2 + visibleW * 0.02;

    words.forEach((word, wi) => {
      const chapter = chapters[wi];
      const t = range(p, chapter.start, chapter.end);
      const n = word.letters.length;

      // Assemble over the first 40% of the chapter, leave over the last 22%.
      const enter = range(t, 0, 0.4);
      const exit = chapter.hold ? 0 : range(t, 0.78, 1);
      const visible = reducedMotion ? (p >= chapter.start && (chapter.hold || p < chapter.end) ? 1 : 0) : 1;

      word.group.visible = enter > 0 && exit < 1 && visible > 0;
      if (!word.group.visible) return;

      word.group.scale.setScalar(scale);
      word.group.position.set(left + (word.width * scale) / 2, -0.36 * scale, 0);
      // A slow turn across the chapter shows off the extrusion depth.
      word.inner.rotation.y = reducedMotion ? -0.08 : lerp(0.2, -0.14, easeInOutCubic(t));
      word.inner.rotation.x = reducedMotion ? 0.04 : lerp(0.12, 0.03, easeOutCubic(enter));

      word.letters.forEach((letter, i) => {
        const { mesh } = letter;
        // Per-letter stagger: letter i starts STAGGER later than letter i-1.
        const span = 1 + STAGGER * (n - 1);
        const le = reducedMotion ? 1 : easeOutCubic(clamp(enter * span - i * STAGGER));
        const lx = reducedMotion ? 0 : easeInOutCubic(clamp(exit * span - i * STAGGER));

        const float = reducedMotion ? 0 : Math.sin(time * 1.1 + i * 0.7) * 0.015 * le * (1 - lx);
        mesh.position.y = lerp(-0.85, 0, le) + lerp(0, 0.75, lx) + float;
        mesh.position.z = lerp(-0.8, 0, le) + lerp(0, 0.6, lx);
        // Letters flip up from flat (−90°) and tip forward on their way out.
        mesh.rotation.x = lerp(-Math.PI / 2, 0, le) + lerp(0, Math.PI / 2.4, lx);
        const opacity = le * (1 - lx);
        mesh.material[0].opacity = opacity;
        mesh.material[1].opacity = opacity;
      });
    });

    if (!announced.current) {
      announced.current = true;
      onReady?.();
    }
  });

  return <group ref={rootRef} />;
}

/**
 * Transparent canvas that renders the 3D chapter words. Loaded client-side
 * only (see Typography3D) so three.js stays out of the server bundle.
 */
export default function Typography3DScene(props: Typography3DSceneProps) {
  const { lite, reducedMotion, active } = props;
  return (
    <Canvas
      dpr={lite ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      camera={{ fov: FOV, near: 0.1, far: 100, position: [0, 0, CAMERA_Z] }}
      frameloop={active && !reducedMotion ? "always" : "demand"}
      onCreated={({ gl }) => {
        gl.setClearColor(COLORS.paper, 0);
        // No tone mapping: the unlit letter faces must match the brand hex exactly.
        gl.toneMapping = THREE.NoToneMapping;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <hemisphereLight args={[COLORS.surface, COLORS.line, 1.2]} />
      <directionalLight position={[-5, 7, 6]} intensity={1.6} />
      <Words {...props} />
    </Canvas>
  );
}
