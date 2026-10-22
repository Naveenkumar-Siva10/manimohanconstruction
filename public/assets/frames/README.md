# Hero build-sequence frames

Source: `3d architecture video for scrolling animation effect.mp4` (project
root — 1280×720, 24 fps, 10 s).

The hero scrubs these stills on a canvas instead of seeking a <video>: one
exact frame per scroll position, so the picture never judders.

    # desktop — 160 frames, 1280×720
    ffmpeg -i SOURCE.mp4 -an -vf fps=16 -c:v libwebp -quality 58 \
      -compression_level 6 -preset photo -start_number 0 desktop/%03d.webp

    # phones — 120 frames, 960×540
    ffmpeg -i SOURCE.mp4 -an -vf "fps=12,scale=960:-2" -c:v libwebp -quality 55 \
      -compression_level 6 -preset photo -start_number 0 mobile/%03d.webp

    # first / last frame stills (instant paint + reduced-motion image)
    ffmpeg -i SOURCE.mp4 -vf "select=eq(n\,0)" -frames:v 1 -q:v 3 ../video/build-sequence-start.jpg
    ffmpeg -sseof -0.1 -i SOURCE.mp4 -frames:v 1 -q:v 3 ../video/build-sequence-end.jpg

If you change the frame counts, update `BUILD_SEQUENCE.frames` in
`lib/content.ts`.
