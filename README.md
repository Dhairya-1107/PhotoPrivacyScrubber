# 🛡️ Photo Privacy Scrubber

> **See what your photos reveal before you share them.**

A browser-based privacy tool that detects sensitive metadata hidden inside images and removes it before sharing.

## 🌐 Project Links

| Resource | Link |
|---|---|
| 🚀 Live Demo | https://photo-privacy-scrubber-dhairyas.vercel.app |
| 💻 GitHub Repository | https://github.com/Dhairya-1107/PhotoPrivacyScrubber |

---

## 🎯 Problem Statement

Digital photographs can contain hidden metadata that users may not realize they are sharing.

Depending on the device and image, metadata may contain:

- 📍 GPS location
- 📱 Camera or device information
- 🕐 Date and time of capture
- 🖼️ Image information

This information can unintentionally reveal details about where, when, or how a photograph was created.

### 💡 Proposed Solution

**Photo Privacy Scrubber** provides a simple browser-based workflow for inspecting and removing privacy-sensitive image metadata.

> **Upload → Scan → Assess Risk → Scrub → Download → Verify**

---

## ✨ Key Features

### 🔍 Metadata Detection
Scans uploaded images for privacy-sensitive metadata.

### 📍 GPS Detection
Identifies geographic coordinates when GPS metadata is available.

### 📱 Device Detection
Detects camera manufacturer and device information when available.

### 🕐 Capture Time Detection
Identifies the original capture date and time when available.

### ⚠️ Privacy Risk Score
Provides a simple risk score based on detected privacy-sensitive fields.

### 🛡️ Metadata Scrubbing
Creates a cleaned copy of the image without the targeted privacy-sensitive metadata.

### ✅ Verification
Allows the cleaned image to be uploaded again to verify that the targeted metadata has been removed.

### 🔒 Browser-Based Processing
The core image processing happens directly in the browser without requiring a backend server.

---

## 🔄 How It Works

```text
┌─────────────────────┐
│    Select Image     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   Read Image File   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   Extract Metadata  │
│      (ExifReader)   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Privacy Risk Score │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Scrub Metadata   │
│     (Canvas API)    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Download Cleaned   │
│        Image        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       Verify        │
└─────────────────────┘
What is EXIF Metadata?
EXIF (Exchangeable Image File Format) is metadata associated with many digital images.
Depending on the source image, EXIF information can include:
Metadata	Privacy Concern
GPS coordinates	Can reveal location
Camera model	Can reveal device information
Capture date/time	Can reveal when a photo was taken
Lens information	Can reveal camera details
Software information	Can reveal editing/software details


Photo Privacy Scrubber focuses on metadata that can have direct privacy implications.
🛠️ Technology Stack
Technology	Purpose
HTML5	Application structure
CSS3	UI and responsive styling
JavaScript	Application logic
ExifReader	EXIF metadata extraction
Canvas API	Creating cleaned images
Git	Version control
GitHub	Source code hosting
Vercel	Deployment


🏗️ System Architecture
                 USER
                   │
                   ▼
            ┌─────────────┐
            │ Image Upload│
            └──────┬──────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Browser File API│
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   ExifReader    │
          │ Metadata Parser │
          └────────┬────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
     GPS / Device       Capture Time
          │                 │
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │ Privacy Risk    │
          │     Score       │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   Canvas API    │
          │ Cleaned Image   │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Download &      │
          │ Verification    │
          └─────────────────┘

🔐 Privacy by Design
Privacy is a core principle of this project.
No backend required
The application performs its core processing inside the user's browser.
No database
The project does not require a database for metadata scanning or image scrubbing.
No account required
Users can use the application without creating an account.
Original image preservation
The original uploaded image is not modified.
A separate cleaned image is generated for download.
📱 Cross-Device Usage
The application is designed for use through modern browsers on:
- 📱 iPhone
- 📱 Android
- 💻 macOS
- 💻 Windows
Metadata availability depends on the source image and device.
For example, an original camera photo may contain GPS, device, and capture-time metadata, while a downloaded or processed image may contain little or no EXIF metadata.
🧪 Testing
The application was tested with different image sources and metadata conditions.
Original camera images
When privacy-sensitive EXIF metadata is present, the application can detect:
GPS Location
Device / Camera
Capture Time

Images without targeted EXIF
If the image does not contain the targeted metadata, the application reports those fields as:
Not detected

The application does not invent metadata that is not present.
Processed or downloaded images
Images shared through messaging platforms or other services may have their original metadata removed or modified.
Therefore, the same photograph may contain different metadata depending on how it was transferred or downloaded.
⚠️ Limitations
Metadata availability depends on the image itself.
Some limitations include:
- Not every image contains EXIF metadata.
- Messaging platforms may remove metadata.
- Screenshots may contain different metadata from original camera photos.
- Browser and image-format behavior can vary between devices.
- "Not detected" does not necessarily mean that an image contains absolutely no metadata.
- The current version focuses primarily on privacy-sensitive image metadata.
Project Structure
PhotoPrivacyScrubber/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .git/

File Responsibilities
index.html
Contains the structure of the web application.
style.css
Controls the visual design, layout, responsiveness, and interface styling.
script.js
Handles:
- File selection
- Image preview
- Metadata extraction
- Privacy scoring
- Metadata scrubbing
- Download
- Verification
README.md
Contains project documentation.
🔮 Future Scope
Possible future improvements include:
- Batch image processing
- Additional metadata formats
- More detailed metadata inspection
- Improved privacy-risk classification
- Additional image-format support
- Video metadata scanning
- PDF metadata scanning
- Progressive Web App support
- Offline usage
- Accessibility improvements
- Advanced metadata verification
🎥 Demonstration Flow
1. Select an image
       ↓
2. Scan metadata
       ↓
3. Identify privacy-sensitive information
       ↓
4. Calculate privacy risk
       ↓
5. Scrub metadata
       ↓
6. Download cleaned image
       ↓
7. Upload cleaned image again
       ↓
8. Verify metadata removal

📊 Project Highlights
Category	Implementation
Frontend	HTML, CSS, JavaScript
Metadata Extraction	ExifReader
Image Processing	Canvas API
Backend	Not required
Database	Not required
Deployment	Vercel
Source Control	GitHub
Processing Model	Browser-side

🌐 Live Application
🚀 Try the project
https://photo-privacy-scrubber-dhairyas.vercel.app
💻 Source Code
https://github.com/Dhairya-1107/PhotoPrivacyScrubber
👨‍💻 Author
Dhairya-1107
GitHub:
https://github.com/Dhairya-1107
📄 License
This project is developed for educational and demonstration purposes.