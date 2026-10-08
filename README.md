# Photo Privacy Scrubber

A browser-based educational privacy-awareness project.

## Core flow
Upload → Scan EXIF metadata → Explain privacy exposure → Scrub → Download a cleaner copy.

## Tech
- HTML
- CSS
- JavaScript
- EXIFReader
- Canvas API

## Run
Open `index.html` in a modern browser with an internet connection for the EXIFReader CDN.

## Presentation idea
Demonstrate a photo containing EXIF metadata, show the detected GPS/device/time information, click Scrub Photo, then explain that the Canvas export does not carry the original EXIF metadata.

## Important limitation
This MVP is an educational browser demo. It should not be presented as a guarantee that every possible metadata/data channel has been removed from every image format.
