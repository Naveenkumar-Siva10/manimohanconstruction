"""
Builds the three.js typeface JSON used by the 3D typography.

Takes the Archivo variable font (SIL Open Font License, Google Fonts),
freezes it at a single display instance — bold, semi-expanded — so the 3D
letters match the site's headings (font-display in globals.css), keeps only
Latin letters/digits/punctuation, and writes the outline data in three.js's
FontLoader format.

    python scripts/build-3d-font.py <Archivo[wdth,wght].ttf>

Source: https://github.com/google/fonts/tree/main/ofl/archivo
"""

import json
import sys
from pathlib import Path

from fontTools.pens.basePen import BasePen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

INSTANCE = {"wght": 700, "wdth": 112}
CHARS = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "0123456789"
    " .,:;!?&'’-—()/"
)
OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "fonts" / "archivo-display.typeface.json"


class ThreeOutlinePen(BasePen):
    """Records outlines in three.js order: q = end, control; b = end, c1, c2."""

    def __init__(self, glyph_set):
        super().__init__(glyph_set)
        self.cmds: list[str] = []

    @staticmethod
    def _n(v: float) -> str:
        return str(round(v))

    def _moveTo(self, pt):
        self.cmds += ["m", self._n(pt[0]), self._n(pt[1])]

    def _lineTo(self, pt):
        self.cmds += ["l", self._n(pt[0]), self._n(pt[1])]

    def _qCurveToOne(self, pt1, pt2):
        self.cmds += ["q", self._n(pt2[0]), self._n(pt2[1]), self._n(pt1[0]), self._n(pt1[1])]

    def _curveToOne(self, pt1, pt2, pt3):
        self.cmds += ["b", *(self._n(v) for v in (pt3[0], pt3[1], pt1[0], pt1[1], pt2[0], pt2[1]))]

    def _closePath(self):
        # three.js closes sub-paths implicitly when the next "m" starts.
        pass


def main(src: str) -> None:
    font = TTFont(src)
    font = instancer.instantiateVariableFont(font, INSTANCE)

    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]
    upem = font["head"].unitsPerEm

    glyphs = {}
    for ch in CHARS:
        name = cmap.get(ord(ch))
        if name is None:
            continue
        pen = ThreeOutlinePen(glyph_set)
        glyph_set[name].draw(pen)
        bounds = font["glyf"][name]
        glyphs[ch] = {
            "ha": hmtx[name][0],
            "x_min": getattr(bounds, "xMin", 0),
            "x_max": getattr(bounds, "xMax", 0),
            "o": " ".join(pen.cmds),
        }

    head = font["head"]
    hhea = font["hhea"]
    post = font["post"]
    data = {
        "glyphs": glyphs,
        "familyName": "Archivo Display",
        "ascender": hhea.ascent,
        "descender": hhea.descent,
        "underlinePosition": post.underlinePosition,
        "underlineThickness": post.underlineThickness,
        "boundingBox": {"yMin": head.yMin, "xMin": head.xMin, "yMax": head.yMax, "xMax": head.xMax},
        "resolution": upem,
        "original_font_information": {
            "format": 0,
            "copyright": "Copyright 2020 The Archivo Project Authors. SIL Open Font License 1.1.",
            "fontFamily": "Archivo",
            "fontSubfamily": "Bold SemiExpanded (static instance)",
        },
        "cssFontWeight": "700",
        "cssFontStyle": "normal",
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size / 1024:.1f} KB, {len(glyphs)} glyphs)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
