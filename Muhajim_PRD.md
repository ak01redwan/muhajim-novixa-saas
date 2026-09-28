# Muhajim (مُحجِّم)

## Product Requirements Document (PRD)

**Company:** Novixa --- `novixa.dev`\
**Product:** Muhajim (مُحجِّم)\
**Product type:** Single-purpose, client-side image resizing micro-SaaS\
**Primary market:** Global, Arabic-first\
**Document status:** Production PRD / Engineering Master Specification\
**Version:** 1.0.0\
**Date:** 2026-09-23\
**Primary objective:** Build the fastest, privacy-first,
zero-server-compute image resizing web application that is useful enough
to earn organic traffic and advertising revenue without compromising UX.

------------------------------------------------------------------------

# 1. Executive Summary

Muhajim is a focused web application for resizing images directly inside
the user's browser.

The product must solve one problem exceptionally well:

> **Resize images quickly, privately, accurately, and with as little
> friction as possible.**

The core architecture is intentionally serverless from a compute
perspective:

``` text
User
  │
  ▼
Web App
  │
  ├── Main UI
  │
  ├── Web Worker
  │     ├── Image decode
  │     ├── EXIF/orientation handling
  │     ├── Resize
  │     ├── Encoding
  │     └── Metadata handling
  │
  ├── OffscreenCanvas / Canvas
  │
  └── WASM / optimized image processing
          │
          ▼
     Local output file
```

No uploaded image should be sent to a Novixa application server for
normal processing.

The server infrastructure, if any, should be limited to static delivery,
analytics where privacy-appropriate, ads, configuration, sitemap/SEO
generation, and other non-image-compute functions.

Muhajim is not intended to become a general-purpose image editor in the
MVP. Feature expansion must not destroy the product's single-purpose
clarity.

------------------------------------------------------------------------

# 2. Product Vision

## 2.1 Vision

Create the world's simplest professional browser-based image resizer for
users who need to change image dimensions without uploading private
images to an unknown server.

The product should feel:

-   instant
-   private
-   reliable
-   lightweight
-   multilingual
-   mobile-friendly
-   professional
-   technically trustworthy

## 2.2 Product promise

Primary promise:

> **Resize your images directly in your browser. Your images do not need
> to leave your device.**

The privacy statement must be technically true. It must not claim that
absolutely no network activity occurs, because the page itself, fonts,
ads, analytics, or other resources may communicate with external
services.

## 2.3 Product positioning

Muhajim should be positioned around:

1.  Simplicity
2.  Privacy
3.  Speed
4.  Browser-local processing
5.  Arabic-first UX
6.  Global accessibility

Avoid positioning the product as a full Photoshop alternative.

------------------------------------------------------------------------

# 3. Problem Statement

Many image-resizing websites create unnecessary friction:

-   upload-first workflows
-   unclear privacy practices
-   slow processing
-   excessive advertisements
-   confusing controls
-   poor mobile UX
-   weak Arabic localization
-   inconsistent output quality
-   limited support for modern image formats
-   broken EXIF orientation
-   accidental image stretching
-   no clear explanation of output dimensions
-   unnecessary registration
-   server-side processing for a task that can often run locally

Users usually want to perform a very small task:

``` text
Select image
→ choose dimensions
→ resize
→ download
```

Muhajim must make this path exceptionally fast.

------------------------------------------------------------------------

# 4. Goals

## 4.1 Primary goals

### G1 --- Excellent resizing experience

A first-time visitor should understand the application immediately.

### G2 --- Client-side processing

Normal image processing must happen locally in the browser.

### G3 --- Strong privacy model

The application must not require uploading the user's image to a Novixa
backend.

### G4 --- Mobile reliability

The application must work on modern mobile browsers, including
constrained-memory environments.

### G5 --- Arabic-first localization

Arabic is the default product language and must receive first-class RTL
treatment.

### G6 --- Global SEO

Build crawlable localized landing pages around genuine search intent.

### G7 --- Sustainable monetization

Use advertising and contextual monetization without making the
application unpleasant to use.

### G8 --- Low operating cost

Avoid server-side image-processing infrastructure.

### G9 --- High performance

Target excellent Core Web Vitals and minimal JavaScript on the initial
route.

### G10 --- Extensible architecture

The architecture must support future image utilities without turning the
MVP into an uncontrolled multi-tool suite.

------------------------------------------------------------------------

# 5. Non-Goals

The following are explicitly outside the initial MVP:

-   full photo editor
-   layers
-   Photoshop-like filters
-   social network
-   user accounts
-   cloud image storage
-   server-side image processing
-   collaborative editing
-   complex AI image generation
-   permanent image hosting
-   image marketplace
-   social profiles
-   native mobile applications
-   mandatory registration
-   server-side conversion queues
-   complicated billing subscriptions

Future utilities may be added only if they preserve the core product
strategy.

------------------------------------------------------------------------

# 6. Target Users

## 6.1 General users

People who need to resize an image quickly without installing software.

Typical intent:

> "Make this image 800×600."

## 6.2 Social-media users

Users preparing images for:

-   profile images
-   posts
-   stories
-   banners
-   thumbnails
-   marketplace listings

## 6.3 Small businesses

Users preparing:

-   product images
-   website images
-   catalog images
-   advertisements
-   documents

## 6.4 Developers and designers

Users needing exact dimensions for:

-   UI assets
-   thumbnails
-   icons
-   test fixtures
-   mockups
-   web assets

## 6.5 Privacy-sensitive users

Users who prefer local browser processing because the source image may
be private.

------------------------------------------------------------------------

# 7. Core User Jobs

## Job 1 --- Resize by width

``` text
Input: image
Width: 1200
Height: automatic
Output: resized image
```

## Job 2 --- Resize by height

``` text
Input: image
Height: 800
Width: automatic
```

## Job 3 --- Resize to exact dimensions

``` text
Input: 4032×3024
Output: 1200×1200
Mode: exact
```

This mode must clearly warn that aspect ratio may change if cropping is
not enabled.

## Job 4 --- Keep aspect ratio

Default behavior:

``` text
Width changes
Height recalculates automatically
```

## Job 5 --- Resize multiple images

MVP may support batch processing if browser memory and UX testing
demonstrate reliable behavior.

Batch processing must never compromise single-image performance.

## Job 6 --- Download the result

The user should be able to download immediately without account
creation.

------------------------------------------------------------------------

# 8. Core Product Principles

## P1 --- Local first

Image bytes should remain on the device during processing.

## P2 --- No unnecessary upload

Do not send image files to a Novixa backend.

## P3 --- Progressive enhancement

The basic resize workflow should work without requiring advanced browser
APIs.

## P4 --- Small initial payload

Do not load WASM or heavy processing libraries before the user needs
them.

## P5 --- Worker isolation

Expensive image operations belong outside the main UI thread whenever
practical.

## P6 --- Memory-aware design

Never assume desktop-class memory.

## P7 --- Honest UX

Never claim a format, capability, or privacy property that the
implementation cannot guarantee.

## P8 --- Accessibility by default

Keyboard, touch, screen readers, contrast, focus, and reduced-motion
behavior are required.

## P9 --- RTL native

Arabic is not an English UI mirrored mechanically.

## P10 --- Single-purpose clarity

Every additional feature must pass the question:

> Does this make image resizing meaningfully easier?

------------------------------------------------------------------------

# 9. MVP Scope

## 9.1 Required MVP features

### Upload

-   drag and drop
-   file picker
-   mobile camera/gallery picker where supported
-   paste image where supported
-   clear supported-format messaging

### Image preview

Display:

-   thumbnail/preview
-   original dimensions
-   file size
-   format
-   orientation status when relevant

### Resize controls

-   width
-   height
-   aspect-ratio lock
-   reset
-   fit/contain behavior where applicable
-   exact dimensions
-   percentage resize

### Output controls

-   output format
-   quality for lossy formats
-   filename
-   download

### Processing

-   worker-based processing
-   progress indication for operations where measurable
-   cancellation
-   error recovery

### Privacy

Clear local-processing explanation.

### Localization

Initial architecture must support 20 languages even if translations are
released in phases.

### SEO

Localized, crawlable landing pages.

### Accessibility

WCAG-oriented implementation.

------------------------------------------------------------------------

# 10. Future Scope

Potential later utilities:

-   image compression
-   image format conversion
-   crop
-   rotate
-   flip
-   favicon generation
-   social image resizing
-   profile-picture resizing
-   passport/photo dimensions
-   WebP conversion
-   AVIF conversion
-   PNG/JPEG optimization
-   batch workflows

These should be considered separate tools or tightly related modes
rather than adding an uncontrolled toolbar to the primary UI.

Potential information architecture:

``` text
Muhajim
├── Resize Image
├── Compress Image
├── Convert Image
├── Crop Image
└── Image Tools
```

Only introduce this structure after the resizing product has proven
demand.

------------------------------------------------------------------------

# 11. Functional Requirements

## FR-001 --- Image selection

The user shall be able to select one or more supported image files.

Supported input formats should be determined by actual browser decoding
capability and tested per browser.

Initial target:

-   JPEG/JPG
-   PNG
-   WebP
-   GIF where static-frame handling is explicitly defined
-   BMP where browser support is reliable

Potential later formats:

-   AVIF
-   HEIC/HEIF
-   TIFF

Do not advertise a format simply because a library theoretically
supports it. Verify real browser behavior.

------------------------------------------------------------------------

## FR-002 --- File validation

Validate before processing:

-   MIME type
-   extension as secondary signal
-   file size
-   decodability
-   dimensions
-   browser capability

Never trust only the extension.

Example:

``` text
photo.jpg
Content-Type: image/png
```

The actual file content and browser decoder determine the final
decision.

------------------------------------------------------------------------

## FR-003 --- Dimension detection

After decoding, display:

``` text
Original
4032 × 3024 px
```

The dimension values must represent the effective displayed orientation
where appropriate.

------------------------------------------------------------------------

## FR-004 --- Aspect-ratio lock

Default:

``` text
Locked
```

When width changes:

``` text
newHeight = round(newWidth / originalAspectRatio)
```

When height changes:

``` text
newWidth = round(newHeight * originalAspectRatio)
```

Prevent invalid values:

-   zero
-   negative
-   NaN
-   Infinity
-   excessively large dimensions

------------------------------------------------------------------------

## FR-005 --- Exact resize

When the user unlocks the ratio:

``` text
Width: 1200
Height: 1200
```

The UI must clearly indicate that distortion can occur.

If cropping is not part of the selected mode, do not silently crop.

------------------------------------------------------------------------

## FR-006 --- Percentage resizing

Optional MVP feature:

``` text
25%
50%
75%
100%
125%
150%
200%
```

Custom percentage should be supported if UX remains simple.

------------------------------------------------------------------------

## FR-007 --- Output format

At minimum, provide:

-   original format
-   JPEG
-   PNG
-   WebP

Only expose formats that can be generated reliably by the selected
browser/API path.

Future:

-   AVIF

------------------------------------------------------------------------

# 12. Output Quality

## 12.1 JPEG

Provide a quality control.

Recommended conceptual range:

``` text
0.1–1.0
```

UI can present:

``` text
Low
Balanced
High
Maximum
```

Avoid exposing technical values unless useful.

## 12.2 PNG

PNG is lossless.

Do not show a misleading "JPEG-style quality" slider unless the
implementation actually performs an optimization that changes output
size.

## 12.3 WebP

Provide quality control.

## 12.4 AVIF

If supported later, lazy-load the required encoder and make the higher
processing cost explicit when relevant.

------------------------------------------------------------------------

# 13. EXIF and Orientation

This is a critical requirement.

Some cameras store the physical image pixels in one orientation and
record the intended display orientation in EXIF.

Muhajim must prevent the classic:

``` text
Original photo looks correct
↓
Resize
↓
Output appears rotated
```

The pipeline must normalize orientation before final export where
required.

Conceptual pipeline:

``` text
File
 ↓
Decode
 ↓
Read/interpret orientation
 ↓
Normalize transform
 ↓
Resize
 ↓
Encode
 ↓
Download
```

Do not depend on CSS preview rotation alone.

The exported pixels must have the correct orientation.

------------------------------------------------------------------------

# 14. Color Management

Color handling must be tested across:

-   Chrome
-   Edge
-   Firefox
-   Safari
-   iOS Safari

Canvas processing can alter color behavior depending on browser and
source profile.

Requirements:

-   avoid unnecessary color conversions
-   test common sRGB images
-   document known browser limitations
-   preserve expected visual appearance
-   never claim perfect ICC-profile preservation unless actually
    implemented and tested

If advanced color-profile preservation conflicts with the zero-server
architecture, prefer predictable sRGB output over a misleading claim of
full profile preservation.

------------------------------------------------------------------------

# 15. Animated Images

Animated input is a product decision rather than a trivial
implementation detail.

MVP recommendation:

-   treat animated GIF as a static image only if explicitly documented,
    or
-   reject animated files with a clear explanation

Do not silently convert an animated image into a one-frame output if the
user may reasonably expect animation preservation.

Animated resizing can be introduced later as a dedicated workflow.

------------------------------------------------------------------------

# 16. Image Processing Architecture

Recommended high-level architecture:

``` text
UI Thread
│
├── File selection
├── Settings
├── Preview shell
├── Progress
└── Download
       │
       │ postMessage / transferable objects
       ▼
Web Worker
│
├── Decode
├── EXIF/orientation
├── Resize
├── Encode
└── Memory cleanup
       │
       ▼
Blob
```

Potential processing stack:

``` text
Browser APIs
    +
OffscreenCanvas
    +
Pica.js
    +
WASM where justified
```

Use the lightest technology that meets quality and performance
requirements.

Do not introduce WASM merely because it is technically impressive.

------------------------------------------------------------------------

# 17. Worker Contract

Use a typed message protocol.

Conceptual TypeScript:

``` ts
type ResizeWorkerRequest =
  | {
      type: "resize";
      requestId: string;
      source: ArrayBuffer;
      width: number;
      height: number;
      output: {
        format: "jpeg" | "png" | "webp";
        quality?: number;
      };
      orientation?: number;
    }
  | {
      type: "cancel";
      requestId: string;
    };

type ResizeWorkerResponse =
  | {
      type: "progress";
      requestId: string;
      value: number;
    }
  | {
      type: "success";
      requestId: string;
      blob: Blob;
      width: number;
      height: number;
      format: string;
    }
  | {
      type: "error";
      requestId: string;
      code: string;
      message: string;
    };
```

The actual implementation must use transferable objects where
appropriate.

Avoid copying large ArrayBuffers unnecessarily.

------------------------------------------------------------------------

# 18. Memory Management

This is one of the highest-risk engineering areas.

A 6000×4000 RGBA bitmap requires approximately:

``` text
6000 × 4000 × 4
= 96,000,000 bytes
≈ 91.6 MiB
```

Additional buffers can multiply this substantially.

A naive pipeline can therefore consume hundreds of MB for one image.

## Required controls

-   revoke object URLs
-   release ImageBitmap objects
-   clear canvas references
-   terminate workers when appropriate
-   avoid duplicate full-resolution buffers
-   process sequentially for batch mode
-   impose sensible maximum dimensions
-   fail gracefully under memory pressure
-   avoid retaining source and output simultaneously when unnecessary

------------------------------------------------------------------------

# 19. Mobile Memory Strategy

Mobile browsers are a first-class target.

Particular attention is required for:

-   iOS Safari
-   low-memory Android devices
-   older devices
-   background-tab behavior
-   browser process termination
-   canvas dimension limits

Do not rely on desktop benchmarks.

Recommended strategy:

``` text
Small image
→ normal pipeline

Large image
→ worker
→ decode carefully
→ resize with bounded intermediate buffers
→ release source
→ encode
→ release output references
```

If an image exceeds a tested safe threshold:

``` text
"This image is too large for reliable browser processing on this device."
```

The application should never freeze the UI while attempting an
impossible operation.

------------------------------------------------------------------------

# 20. Canvas Limits

Different browsers/devices have practical maximum canvas dimensions and
memory limits.

The application must:

1.  detect or safely handle canvas failures
2.  avoid blindly creating huge canvases
3.  catch allocation/decode exceptions
4.  provide a human-readable recovery message
5.  suggest a smaller target or another browser/device when appropriate

Never display a raw browser exception to users.

------------------------------------------------------------------------

# 21. Progressive Loading

The critical page should load with minimal code.

Initial bundle:

-   application shell
-   upload control
-   basic UI
-   translations
-   lightweight validation

Lazy-loaded resources:

-   Pica.js
-   Squoosh/WASM
-   advanced encoders
-   EXIF parsing modules if not bundled minimally
-   batch-processing logic

Ideal flow:

``` text
Page loads
↓
User sees resize UI
↓
User selects image
↓
Processing dependency begins loading
↓
Processing starts
```

Do not download a multi-MB WASM binary for visitors who never process an
image.

------------------------------------------------------------------------

# 22. UI / UX Requirements

## 22.1 Primary screen

The homepage should be the tool.

Avoid a marketing-heavy hero that pushes the actual utility below the
fold.

Recommended structure:

``` text
Header
  Logo
  Language
  Theme

Main
  Product title
  Short privacy/value statement

  Upload / Drop Zone

  [After selection]
  Preview
  Original info
  Resize controls
  Output controls
  Resize button

  Result
  Download

Secondary
  How it works
  Privacy explanation
  FAQ
  SEO content

Footer
```

------------------------------------------------------------------------

# 23. Upload Zone

The upload area should communicate:

-   what the user can do
-   supported formats
-   privacy
-   primary action

Example conceptual copy:

> Resize images directly in your browser.

Secondary:

> Your image can be processed locally on your device.

Actions:

``` text
Choose Image
```

and:

``` text
Drop an image here
```

Do not overload the first viewport with paragraphs.

------------------------------------------------------------------------

# 24. Processing State

States:

``` text
idle
selecting
loading
decoding
processing
encoding
complete
error
cancelled
```

Progress should never fake precision.

If exact progress is unavailable, use an indeterminate indicator rather
than displaying:

``` text
73%
```

when 73% has no technical meaning.

------------------------------------------------------------------------

# 25. Result State

Display:

``` text
Done

Original:
4032 × 3024 · 4.8 MB

New:
1200 × 900 · 420 KB

[Download image]
[Resize another image]
```

Where possible, calculate and show size reduction:

``` text
91% smaller
```

This is informational, not a promise of compression quality.

------------------------------------------------------------------------

# 26. Error UX

Error categories should be user-oriented.

Examples:

### Unsupported format

> This image format is not supported by your browser.

### Too large

> This image is too large to process reliably on this device. Try a
> smaller image or target size.

### Memory failure

> Your device ran out of available memory while processing this image.
> Try closing other browser tabs or using a smaller image.

### Decode failure

> We couldn't read this image. The file may be damaged or unsupported.

### Browser limitation

> This browser does not support the processing feature required for this
> image.

Never show stack traces to users.

------------------------------------------------------------------------

# 27. Accessibility

Target WCAG 2.2 AA principles.

Requirements:

-   semantic HTML
-   keyboard navigation
-   visible focus
-   logical tab order
-   accessible labels
-   accessible error messages
-   sufficient contrast
-   touch targets of appropriate size
-   no color-only status
-   screen-reader-friendly progress states
-   reduced-motion support
-   correct language attributes
-   correct `dir`
-   accessible dialogs
-   accessible drag/drop alternative

Drag-and-drop must never be the only upload mechanism.

------------------------------------------------------------------------

# 28. Arabic-First RTL

Arabic is the default locale.

The application must use:

``` html
<html lang="ar" dir="rtl">
```

for Arabic.

English:

``` html
<html lang="en" dir="ltr">
```

Use logical CSS properties:

``` css
margin-inline-start
margin-inline-end
padding-inline-start
padding-inline-end
inset-inline-start
inset-inline-end
```

Tailwind equivalents should use logical utilities where supported.

Avoid:

``` css
margin-left
margin-right
left
right
```

for directional layout unless the element is genuinely physical rather
than logical.

------------------------------------------------------------------------

# 29. RTL Iconography

Some icons communicate direction.

Examples:

-   back
-   forward
-   arrows
-   previous/next

These may require mirroring in RTL.

Non-directional icons should not be mirrored.

------------------------------------------------------------------------

# 30. Arabic Typography

Requirements:

-   Arabic-friendly font
-   appropriate line height
-   correct punctuation handling
-   readable numerals
-   no clipped glyphs
-   correct mixed Arabic/Latin rendering
-   test long Arabic labels
-   test Arabic plus technical values such as `1200 × 800`

Avoid forcing Arabic text into narrow cards designed for English.

------------------------------------------------------------------------

# 31. Internationalization

Architecture must support 20 languages.

Suggested initial language set:

1.  Arabic
2.  English
3.  Chinese
4.  Hindi
5.  Spanish
6.  French
7.  Portuguese
8.  Bengali
9.  Russian
10. Urdu
11. Indonesian
12. German
13. Japanese
14. Nigerian Pidgin / localized English strategy where justified
15. Marathi
16. Telugu
17. Turkish
18. Korean
19. Vietnamese
20. Italian

The exact release list should be validated against search demand and
translation quality.

Do not machine-translate and publish without review for important
product copy.

------------------------------------------------------------------------

# 32. URL and Locale Architecture

Recommended:

``` text
/ar
/en
/es
/fr
/tr
...
```

Tool-specific pages:

``` text
/ar/resize-image
/en/resize-image
/es/resize-image
```

If the homepage itself is the tool, `/ar` can remain the primary Arabic
entry point.

Every localized page should have:

-   self canonical
-   correct `hreflang`
-   `x-default` where appropriate
-   localized title
-   localized description
-   localized OG data
-   localized structured data where applicable

Do not rely only on cookies or JavaScript for language discovery.

------------------------------------------------------------------------

# 33. SEO Strategy

SEO must target actual user intent.

Core intent clusters:

``` text
resize image
resize image online
change image dimensions
reduce image dimensions
resize jpg
resize png
resize webp
image resizer
photo resizer
resize image without losing quality
resize image on mobile
```

Arabic intent:

``` text
تغيير حجم الصورة
تغيير أبعاد الصورة
تصغير حجم الصورة
تحجيم الصور
تغيير مقاس الصورة
تصغير الصور
أداة تغيير حجم الصور
تغيير حجم الصورة أونلاين
```

Do not create hundreds of thin pages for minor keyword variations.

------------------------------------------------------------------------

# 34. Programmatic SEO

Programmatic pages are allowed only when each page provides genuine
utility.

Good examples:

``` text
/ar/resize-image-to/800x600
/ar/resize-image-to/1080x1080
/ar/resize-image-for/instagram
```

But every generated page must have:

-   unique useful content
-   correct dimensions
-   actual tool state
-   internal links
-   no keyword stuffing
-   no doorway-page behavior

Avoid generating thousands of near-identical pages solely for search
rankings.

------------------------------------------------------------------------

# 35. Structured Data

Use structured data only when it accurately represents the page.

Potential schemas:

-   `WebApplication`
-   `SoftwareApplication`
-   `WebSite`
-   `Organization`
-   `FAQPage` only when the visible page genuinely contains qualifying
    FAQs

Do not fabricate:

-   ratings
-   reviews
-   download counts
-   company statistics
-   awards

------------------------------------------------------------------------

# 36. Performance Requirements

Target:

``` text
LCP: ideally < 1.2s on strong connections
INP: < 200ms
CLS: < 0.1
```

These are engineering targets, not guaranteed field results.

Primary performance priorities:

1.  fast HTML
2.  minimal initial JS
3.  optimized fonts
4.  stable layout
5.  lazy processing dependencies
6.  no giant hero images
7.  reserved ad slots
8.  limited animation
9.  efficient hydration
10. CDN/static delivery

------------------------------------------------------------------------

# 37. Ads and Monetization

The business model must never compromise the core utility.

Potential monetization:

-   Google AdSense
-   Mediavine or equivalent after traffic eligibility
-   contextual affiliate links
-   optional support/donation
-   related tools
-   commercial partnerships

## Ad rules

Ads must not:

-   cover upload controls
-   block download
-   cause layout shifts
-   appear deceptive
-   look like application buttons
-   interrupt processing
-   require interaction before the tool works

Reserve fixed ad space to reduce CLS.

------------------------------------------------------------------------

# 38. Recommended Ad Placement

Possible locations:

``` text
Top/below header
↓
Tool
↓
Ad
↓
SEO/help content
↓
Ad
↓
Footer
```

The primary resize workflow should remain visually dominant.

Never place an interstitial before the user can start the core task
unless there is a compelling business reason and UX testing proves it
acceptable.

------------------------------------------------------------------------

# 39. Privacy

## Core rule

Normal image processing must happen locally.

No image upload endpoint should be required.

The frontend must not send:

-   image pixels
-   original file contents
-   generated output
-   EXIF contents

to Novixa servers unless a future feature explicitly requires it and
obtains appropriate user consent.

## Third-party resources

Audit:

-   analytics
-   advertising
-   fonts
-   error reporting
-   CDN resources

Privacy messaging must distinguish:

``` text
Image processing
```

from:

``` text
Website telemetry / advertising
```

------------------------------------------------------------------------

# 40. Security

Even with no image backend, security remains important.

Review:

-   CSP
-   XSS
-   dependency vulnerabilities
-   third-party scripts
-   supply-chain risks
-   malicious image parsing
-   WASM packages
-   download filename handling
-   SVG handling
-   clipboard input
-   object URLs
-   iframe embedding
-   clickjacking

SVG is particularly important because SVG can contain active content.

If SVG input is supported later, define a safe sanitization policy or
avoid rasterizing untrusted SVG through unsafe paths.

------------------------------------------------------------------------

# 41. Content Security Policy

Recommended direction:

-   strict `default-src`
-   explicit script sources
-   explicit image sources
-   explicit worker sources
-   explicit WASM sources
-   `frame-ancestors 'none'` or appropriate policy
-   `object-src 'none'`

Ad providers may require additional sources.

CSP must be tested with all production integrations.

------------------------------------------------------------------------

# 42. Browser Compatibility

Primary:

-   Chrome
-   Edge
-   Firefox
-   Safari
-   iOS Safari
-   Android Chrome

Minimum browser support should be decided based on actual Web API
requirements.

If a feature is unsupported:

``` text
feature detection
→ fallback
→ clear message
```

Never perform browser detection solely by user-agent strings when
feature detection is sufficient.

------------------------------------------------------------------------

# 43. Download Architecture

Use browser-native downloads.

Typical flow:

``` text
Blob
↓
URL.createObjectURL(blob)
↓
temporary <a download>
↓
click
↓
URL.revokeObjectURL()
```

Filename:

``` text
original-name-resized.ext
```

Sanitize dangerous filename characters.

Preserve useful Unicode names where browser behavior is reliable.

------------------------------------------------------------------------

# 44. Clipboard

Optional enhancement:

Allow users to paste an image from the clipboard.

Requirements:

-   feature detection
-   permission handling
-   clear fallback
-   no background clipboard polling

------------------------------------------------------------------------

# 45. Drag and Drop

Support:

-   drag enter
-   drag over
-   drag leave
-   drop
-   keyboard/file-picker alternative

Do not allow a dropped file to navigate the browser away from the
application.

------------------------------------------------------------------------

# 46. Batch Processing

Batch support should be implemented only after single-image processing
is stable.

Requirements:

-   queue
-   per-item state
-   sequential memory-safe processing
-   cancel all
-   retry failed item
-   download individual
-   optional ZIP later

Avoid processing all images simultaneously.

For ZIP generation, use a lazy-loaded client-side ZIP library and
monitor memory usage.

------------------------------------------------------------------------

# 47. State Model

Suggested state:

``` ts
type ResizeStatus =
  | "idle"
  | "loading"
  | "ready"
  | "processing"
  | "success"
  | "error";

interface ImageAsset {
  id: string;
  fileName: string;
  inputType: string;
  inputSize: number;
  width: number;
  height: number;
  orientation?: number;
}

interface ResizeSettings {
  width: number | null;
  height: number | null;
  lockAspectRatio: boolean;
  outputFormat: "original" | "jpeg" | "png" | "webp";
  quality: number;
}
```

All domain state should be strongly typed.

------------------------------------------------------------------------

# 48. Error Model

Use stable internal error codes.

Example:

``` ts
type ResizeErrorCode =
  | "UNSUPPORTED_FORMAT"
  | "DECODE_FAILED"
  | "INVALID_DIMENSIONS"
  | "CANVAS_LIMIT"
  | "MEMORY_LIMIT"
  | "ENCODE_FAILED"
  | "WORKER_FAILED"
  | "CANCELLED"
  | "BROWSER_UNSUPPORTED";
```

UI translations should map these codes to localized messages.

Do not use backend-style opaque error strings directly in the UI.

------------------------------------------------------------------------

# 49. Suggested Project Structure

For Nuxt:

``` text
app/
components/
  resize/
    ResizeWorkspace.vue
    UploadDropzone.vue
    ImagePreview.vue
    ResizeControls.vue
    OutputControls.vue
    ProcessingState.vue
    ResultCard.vue
  layout/
  ads/
composables/
  useImageResize.ts
  useLocale.ts
  useProcessingWorker.ts
lib/
  image/
    formats.ts
    dimensions.ts
    orientation.ts
    memory.ts
    validation.ts
workers/
  image-resize.worker.ts
utils/
  filenames.ts
  errors.ts
i18n/
  ar.json
  en.json
  ...
public/
  icons/
  og/
content/
pages/
  [locale]/
```

For Next.js, map the same boundaries into App Router conventions.

The exact framework may be selected during implementation, but
processing/domain logic must remain framework-independent.

------------------------------------------------------------------------

# 50. Architecture Boundaries

Separate:

``` text
Presentation
↓
Application orchestration
↓
Image domain logic
↓
Browser adapters
↓
Worker
```

Avoid putting image-processing algorithms directly into UI components.

This makes future migration between Nuxt and Next.js significantly
easier.

------------------------------------------------------------------------

# 51. Testing Strategy

## Unit tests

Test:

-   dimension calculations
-   aspect ratio
-   filename generation
-   validation
-   error mapping
-   orientation transforms
-   quality normalization

## Integration tests

Test:

-   worker communication
-   decode → resize → encode
-   cancellation
-   object URL lifecycle
-   output format selection

## Browser tests

Test:

-   Chrome desktop
-   Chrome Android
-   Safari macOS
-   Safari iOS
-   Firefox

## Visual tests

Test:

-   Arabic
-   English
-   long translated strings
-   RTL controls
-   dark mode
-   light mode
-   mobile breakpoints

------------------------------------------------------------------------

# 52. Critical Edge Cases

The test matrix must include:

-   1×1 image
-   extremely wide image
-   extremely tall image
-   very large image
-   transparent PNG
-   JPEG with EXIF rotation
-   JPEG with no EXIF
-   WebP transparency
-   filename with Arabic characters
-   filename with emoji
-   duplicate filenames
-   zero/invalid dimensions
-   width only
-   height only
-   exact dimensions
-   unlocked aspect ratio
-   browser without OffscreenCanvas
-   browser without WebAssembly
-   worker crash
-   encoder failure
-   memory pressure
-   user cancellation
-   repeated processing
-   repeated uploads
-   rapid file replacement
-   closing/reopening the tool
-   navigating away during processing

------------------------------------------------------------------------

# 53. Quality Preservation

The application must avoid claiming "no quality loss" for lossy formats.

Correct language:

> Resize while maintaining the selected output quality.

For PNG:

> PNG output is lossless, but resizing changes pixels because the image
> dimensions change.

For JPEG/WebP:

> Output quality depends on the selected quality setting.

------------------------------------------------------------------------

# 54. Image Smoothing

The resizing implementation should use a high-quality resampling
algorithm.

Potential approach:

-   Pica.js for high-quality browser resizing
-   Canvas `imageSmoothingQuality = "high"` as a fallback
-   WASM/Squoosh where format/quality requirements justify it

Benchmark actual output quality and performance.

Do not assume one library is always fastest on every device.

------------------------------------------------------------------------

# 55. Pica vs Squoosh/WASM Strategy

## Pica

Strengths:

-   strong browser resizing
-   relatively straightforward integration
-   suitable for client-side use
-   good quality/performance balance

Weaknesses:

-   does not solve every encoding problem
-   still constrained by browser memory

## Squoosh/WASM

Strengths:

-   high-quality codecs
-   advanced image processing
-   useful for compression/conversion

Weaknesses:

-   larger binaries
-   initialization overhead
-   memory overhead
-   more complex worker integration
-   potentially worse first-use latency

### Product decision

Use Pica/native browser APIs for the basic resize path if benchmarks
confirm it meets quality requirements.

Lazy-load WASM only for operations that actually need it.

------------------------------------------------------------------------

# 56. Offline / PWA Strategy

A PWA can be considered after MVP.

Potential offline experience:

``` text
First visit
↓
Assets cached
↓
Future visit
↓
Resize without network dependency
```

However, advertising and analytics cannot be assumed to work offline.

The tool itself should remain useful without network access after
required assets are cached.

------------------------------------------------------------------------

# 57. Analytics

Analytics should measure product performance and funnel behavior without
collecting image contents.

Useful events:

``` text
tool_view
upload_started
upload_completed
resize_started
resize_completed
resize_failed
download_clicked
output_format_selected
language_changed
faq_opened
```

Do not send:

-   image pixels
-   image filenames unless necessary and privacy-reviewed
-   EXIF metadata
-   image contents
-   unnecessary device identifiers

------------------------------------------------------------------------

# 58. Product Metrics

## North-star metric

Successful image resize/download sessions.

## Supporting metrics

-   tool start rate
-   upload completion rate
-   processing success rate
-   download rate
-   average processing time
-   median processing time
-   mobile failure rate
-   error rate by browser
-   repeat usage
-   organic landing traffic
-   localized traffic
-   ad revenue per session
-   revenue per 1,000 sessions
-   Core Web Vitals

------------------------------------------------------------------------

# 59. Performance Budgets

Suggested initial budgets:

``` text
Initial JS: aggressively minimized
Critical CSS: minimal
Fonts: ≤ 1–2 families
Above-the-fold images: minimal
WASM: never eagerly loaded unless proven necessary
Third-party scripts: minimized
```

The actual numeric bundle budget should be enforced in CI after
benchmarking.

------------------------------------------------------------------------

# 60. Deployment

Preferred model:

``` text
Static/edge hosting
+
CDN
+
No image-processing server
```

Suitable infrastructure can include:

-   Vercel
-   Cloudflare Pages
-   Netlify
-   static hosting/CDN

The application should not require a long-running application server for
image processing.

------------------------------------------------------------------------

# 61. Environment Variables

Do not expose secrets in the client bundle.

Public configuration may include:

``` text
PUBLIC_SITE_URL
PUBLIC_DEFAULT_LOCALE
PUBLIC_ADSENSE_CLIENT_ID
PUBLIC_ANALYTICS_ID
```

Only expose variables that are intentionally public.

Any secret analytics/admin/API credentials must remain server-side.

------------------------------------------------------------------------

# 62. SEO Technical Requirements

Required:

-   sitemap.xml
-   robots.txt
-   canonical URLs
-   hreflang
-   localized metadata
-   OG tags
-   favicon
-   WebApplication structured data where valid
-   semantic headings
-   crawlable HTML
-   no accidental noindex
-   no duplicate locale pages
-   404 handling
-   stable URLs

Do not rely on client-side JavaScript to create the only meaningful SEO
content.

------------------------------------------------------------------------

# 63. Content Architecture

Core pages:

``` text
/[locale]
/[locale]/resize-image
/[locale]/privacy
/[locale]/about
/[locale]/faq
/[locale]/contact
```

Potential intent pages later:

``` text
/[locale]/resize-jpg
/[locale]/resize-png
/[locale]/resize-webp
/[locale]/resize-image-for-instagram
/[locale]/resize-image-for-whatsapp
```

Only create pages with genuine differentiated utility.

------------------------------------------------------------------------

# 64. FAQ Topics

Recommended questions:

1.  How does Muhajim resize images?
2.  Are my images uploaded?
3.  Can I resize images on my phone?
4.  Which formats are supported?
5.  Can I preserve the aspect ratio?
6.  Can I resize to exact dimensions?
7.  Does resizing reduce image quality?
8.  Can I resize multiple images?
9.  Why did my image fail?
10. Does Muhajim work offline?
11. What happens to EXIF orientation?
12. Why is a very large image difficult to process?

FAQ answers must reflect actual implementation.

------------------------------------------------------------------------

# 65. Design System

Brand direction:

-   modern
-   minimal
-   technical
-   trustworthy
-   Arabic-first
-   fast
-   not overly decorative

Suggested Novixa brand palette may be reused selectively:

``` text
Primary: #2563EB
Dark: #0F172A
Deep: #020617
Accent: #14B8A6
```

Do not force every Novixa color into the product.

Muhajim should have its own coherent visual system while remaining
recognizably part of Novixa.

------------------------------------------------------------------------

# 66. Dark Mode

Support:

-   light
-   dark
-   system preference

Dark mode must not merely invert colors.

Audit:

-   upload area
-   preview
-   sliders
-   input controls
-   buttons
-   errors
-   success states
-   ads
-   footer
-   dialogs

Maintain contrast in both themes.

------------------------------------------------------------------------

# 67. Motion

Motion should communicate state.

Useful:

-   upload-zone activation
-   processing indicator
-   result transition
-   subtle button feedback

Avoid:

-   heavy background animations
-   long entrance sequences
-   animation that delays interaction
-   motion that causes layout shifts

Respect:

``` css
prefers-reduced-motion
```

------------------------------------------------------------------------

# 68. Ads and CLS

Ad slots must have reserved dimensions.

Do not:

``` text
Page loads
↓
Content shifts
↓
Ad appears
↓
Tool moves
```

Prefer:

``` text
Reserved ad container
↓
Ad fills reserved area
```

The resize controls should never move unexpectedly because an ad loads.

------------------------------------------------------------------------

# 69. Legal Pages

Required before serious monetization:

-   Privacy Policy
-   Terms of Use
-   Cookie/consent policy where legally required
-   Contact information

Privacy documentation must accurately describe:

-   client-side image processing
-   third-party advertising
-   analytics
-   cookies/local storage
-   external resources
-   retention behavior

Do not claim "we never collect any data" if analytics or advertising
systems collect website-level information.

------------------------------------------------------------------------

# 70. Abuse and Malicious Files

Even without server uploads, users can load malicious or malformed files
into their browser.

Mitigations:

-   keep dependencies updated
-   use established decoders
-   isolate heavy parsing in workers
-   avoid unnecessary HTML interpretation of image content
-   do not render SVG as HTML
-   enforce reasonable limits
-   recover from worker crashes

------------------------------------------------------------------------

# 71. Browser Worker Lifecycle

Workers should not remain active unnecessarily.

Recommended lifecycle:

``` text
Idle
↓
Create worker when needed
↓
Process
↓
Return result
↓
Release transferable resources
↓
Terminate if no queued work
```

For repeated operations, reuse a worker when this reduces initialization
overhead without causing memory retention.

------------------------------------------------------------------------

# 72. Cancellation

Users must be able to cancel long-running processing.

Cancellation flow:

``` text
UI
→ cancel request
→ worker checks cancellation state
→ processing stops at safe checkpoint
→ buffers released
→ UI returns to ready state
```

If an underlying codec cannot be interrupted immediately, terminate the
worker and create a fresh worker.

------------------------------------------------------------------------

# 73. Concurrency

Default:

``` text
1 active image-processing task
```

Do not process multiple large images concurrently on mobile.

Desktop batch mode may use limited concurrency only after benchmarks
demonstrate that it improves total throughput without causing memory
spikes.

------------------------------------------------------------------------

# 74. File Size Limits

Do not choose an arbitrary low limit merely for convenience.

Establish limits based on:

-   decoded pixel count
-   estimated memory consumption
-   browser/device testing
-   output requirements

A pixel-based safety threshold is often more meaningful than raw file
size because:

``` text
5 MB JPEG
```

can decode to a very large bitmap.

------------------------------------------------------------------------

# 75. Dimension Limits

Define safe application limits such as:

``` text
max source pixels
max output width
max output height
max output pixels
```

These should be configurable constants and tested against target
browsers.

Do not hard-code a value without documenting why it exists.

------------------------------------------------------------------------

# 76. Security Headers

Recommended:

``` text
Content-Security-Policy
Referrer-Policy
X-Content-Type-Options
Permissions-Policy
Strict-Transport-Security
```

Configure policies according to the actual deployment and third-party
providers.

------------------------------------------------------------------------

# 77. SEO + Ads Tradeoff

Do not sacrifice tool speed for advertising inventory.

Priority order:

``` text
User task completion
>
Performance
>
Accessibility
>
Trust/privacy
>
SEO
>
Monetization optimization
```

SEO and monetization should support the product rather than dominate it.

------------------------------------------------------------------------

# 78. Growth Strategy

## Phase 1 --- Utility

Launch:

``` text
Arabic + English
```

Validate:

-   technical stability
-   organic indexing
-   actual usage
-   mobile compatibility

## Phase 2 --- Internationalization

Add high-demand languages based on:

-   search volume
-   traffic
-   translation quality
-   geography

## Phase 3 --- SEO expansion

Create genuinely useful intent pages.

## Phase 4 --- Related tools

Add compression/conversion/crop only after resize has established
demand.

------------------------------------------------------------------------

# 79. Acquisition Channels

Primary:

-   Google organic search
-   localized SEO
-   direct sharing
-   developer communities
-   Arabic technology communities
-   social media
-   educational content
-   backlinks from useful tool directories

Potential partnerships:

-   web designers
-   agencies
-   ecommerce sellers
-   educational websites
-   Arabic tech communities

Avoid spammy backlink campaigns.

------------------------------------------------------------------------

# 80. Content Strategy

Useful articles can target genuine questions:

-   How to resize an image without stretching it
-   How to resize images on iPhone
-   How to resize images on Android
-   JPG vs PNG when resizing
-   How image dimensions affect website speed
-   Recommended image dimensions for common platforms

Each article should link naturally to the tool.

------------------------------------------------------------------------

# 81. Conversion Strategy

The product should have a very short funnel:

``` text
Search
↓
Landing page
↓
Upload
↓
Resize
↓
Download
```

No account.

No mandatory email.

No forced registration.

No paywall for the basic resize function in the initial business model.

------------------------------------------------------------------------

# 82. Trust Signals

Use factual trust signals:

-   local browser processing
-   no required account
-   clear supported formats
-   transparent privacy explanation
-   open explanation of how processing works
-   HTTPS
-   professional domain
-   Novixa identity
-   accessible contact information

Do not invent:

-   user counts
-   processing counts
-   security certifications
-   awards
-   "trusted by millions"

------------------------------------------------------------------------

# 83. Product Copy Principles

Prefer:

> Resize images directly in your browser.

Over:

> The revolutionary next-generation AI-powered image transformation
> ecosystem.

Prefer:

> Your image can be processed locally on your device.

Over:

> Military-grade privacy guaranteed.

Only make claims supported by the implementation.

------------------------------------------------------------------------

# 84. Definition of Done --- MVP

The MVP is complete only when all are true:

### Product

-   [ ] Upload works
-   [ ] Preview works
-   [ ] Dimensions detected
-   [ ] Aspect ratio works
-   [ ] Exact resize works
-   [ ] Output format works
-   [ ] Quality works where applicable
-   [ ] Download works
-   [ ] Errors are understandable
-   [ ] Cancel works

### Processing

-   [ ] Worker pipeline works
-   [ ] EXIF orientation handled
-   [ ] object URLs released
-   [ ] worker lifecycle tested
-   [ ] memory behavior tested
-   [ ] large image failure handled
-   [ ] browser limitations handled

### UX

-   [ ] Mobile UX complete
-   [ ] Desktop UX complete
-   [ ] RTL polished
-   [ ] English polished
-   [ ] keyboard navigation works
-   [ ] screen-reader labels exist
-   [ ] reduced motion works
-   [ ] dark mode works

### SEO

-   [ ] metadata complete
-   [ ] sitemap works
-   [ ] robots works
-   [ ] canonical works
-   [ ] hreflang works
-   [ ] structured data validated
-   [ ] OG previews work

### Monetization

-   [ ] ad slots reserved
-   [ ] ads do not block tool
-   [ ] no major CLS introduced
-   [ ] privacy documentation updated

### Production

-   [ ] production build passes
-   [ ] typecheck passes
-   [ ] lint passes
-   [ ] unit tests pass
-   [ ] browser tests pass
-   [ ] Lighthouse/performance audit passes
-   [ ] mobile QA passes
-   [ ] deployment smoke test passes

------------------------------------------------------------------------

# 85. Release Gates

## Gate A --- Engineering

Must pass:

``` text
TypeScript
Lint
Unit tests
Build
```

## Gate B --- Browser

Must pass:

``` text
Chrome
Firefox
Safari
iOS Safari
Android Chrome
```

## Gate C --- Performance

Measure:

-   initial load
-   upload-to-preview
-   processing latency
-   memory usage
-   download latency

## Gate D --- UX

Test with real users or representative workflows.

## Gate E --- SEO

Verify:

-   crawlability
-   metadata
-   canonical
-   hreflang
-   sitemap
-   structured data

## Gate F --- Monetization

Verify:

-   ad layout
-   CLS
-   privacy
-   no accidental interaction blocking

------------------------------------------------------------------------

# 86. Acceptance Tests

### AT-001

Given a JPEG 4000×3000,

When the user enters width 1000 with aspect ratio locked,

Then output must be approximately:

``` text
1000×750
```

### AT-002

Given a 4000×3000 image,

When exact mode is set to 1000×1000,

Then output must be exactly:

``` text
1000×1000
```

and the UI must indicate that aspect ratio is not preserved.

### AT-003

Given a rotated JPEG with EXIF orientation,

When resized,

Then the downloaded pixels must have the correct visual orientation.

### AT-004

Given an unsupported file,

When selected,

Then no processing should begin and a localized error must appear.

### AT-005

Given a huge image that exceeds the safe processing threshold,

When selected,

Then the application must fail gracefully without freezing the UI.

### AT-006

Given a successful result,

When the user clicks download,

Then the browser downloads the output without a server upload.

### AT-007

Given Arabic locale,

Then:

``` text
lang="ar"
dir="rtl"
```

and the entire interface must render correctly.

### AT-008

Given English locale,

Then:

``` text
lang="en"
dir="ltr"
```

and the interface must render correctly.

### AT-009

Given reduced-motion preference,

Then non-essential animation must be reduced or removed.

### AT-010

Given a slow mobile device,

Then the UI must remain responsive while processing occurs.

------------------------------------------------------------------------

# 87. Technical Risks

## Risk R1 --- Mobile memory exhaustion

**Severity:** Critical

**Mitigation:**

-   workers
-   bounded buffers
-   sequential processing
-   pixel limits
-   aggressive cleanup
-   real-device testing

## Risk R2 --- Safari limitations

**Severity:** High

**Mitigation:**

-   feature detection
-   fallback paths
-   Safari/iOS test matrix
-   conservative memory strategy

## Risk R3 --- WASM bundle size

**Severity:** High

**Mitigation:**

-   lazy loading
-   only load required codecs
-   cache after first use

## Risk R4 --- Canvas color changes

**Severity:** Medium

**Mitigation:**

-   sRGB testing
-   browser matrix
-   avoid unsupported claims

## Risk R5 --- Ads harming UX

**Severity:** High

**Mitigation:**

-   reserved slots
-   limited placements
-   performance budgets
-   measure CLS and retention

## Risk R6 --- SEO thin-page expansion

**Severity:** High

**Mitigation:**

-   genuine content
-   limited programmatic pages
-   search-intent validation

## Risk R7 --- Product scope creep

**Severity:** High

**Mitigation:**

-   preserve single-purpose MVP
-   separate future tools
-   feature approval gate

------------------------------------------------------------------------

# 88. Recommended Implementation Sequence

## Sprint 1 --- Foundation

1.  Create application shell
2.  Configure i18n
3.  Configure RTL
4.  Build upload flow
5.  Build validation
6.  Build image metadata extraction
7.  Create worker protocol

## Sprint 2 --- Processing

1.  Implement decode
2.  Implement EXIF orientation
3.  Implement resize
4.  Implement output encoding
5.  Implement download
6.  Implement cancellation
7.  Implement cleanup

## Sprint 3 --- UX

1.  Preview
2.  Controls
3.  Result state
4.  Error states
5.  Mobile layout
6.  Dark mode
7.  accessibility

## Sprint 4 --- SEO / Production

1.  Metadata
2.  sitemap
3.  robots
4.  hreflang
5.  structured data
6.  OG assets
7.  legal pages
8.  analytics
9.  ads

## Sprint 5 --- Hardening

1.  Browser matrix
2.  Memory tests
3.  large-image tests
4.  performance
5.  security
6.  final QA
7.  production release

------------------------------------------------------------------------

# 89. Recommended Repository Standards

Use:

``` text
main
develop
feature/*
fix/*
chore/*
```

Every significant feature should include:

-   implementation
-   tests
-   documentation
-   acceptance criteria
-   performance consideration

No feature is complete merely because it visually works.

------------------------------------------------------------------------

# 90. CI Requirements

CI should run:

``` text
install
↓
lint
↓
typecheck
↓
unit tests
↓
build
↓
e2e tests
↓
bundle/performance checks
```

Production deployment should fail when critical checks fail.

------------------------------------------------------------------------

# 91. Observability

Since image data must remain local, observability should focus on
application behavior.

Track:

-   browser family
-   processing success/failure code
-   approximate processing duration
-   output format
-   source pixel bucket
-   device category

Do not log raw image data.

Avoid sending filenames or EXIF metadata unless specifically justified.

------------------------------------------------------------------------

# 92. Data Retention

Normal image data:

``` text
Retention on Novixa servers: none
```

Local browser memory:

``` text
Only while required by the current operation.
```

Generated object URLs:

``` text
Revoked after use.
```

Analytics retention must be governed by the selected analytics provider
and Novixa privacy policy.

------------------------------------------------------------------------

# 93. Monetization Roadmap

### Stage 1

AdSense or equivalent.

### Stage 2

Optimize:

-   ad density
-   placement
-   viewability
-   RPM

without damaging tool completion.

### Stage 3

Contextual affiliate links around relevant workflows.

### Stage 4

Optional support:

``` text
Support Muhajim
```

### Stage 5

Related Novixa tools.

------------------------------------------------------------------------

# 94. Future Premium Possibilities

If demand justifies it:

-   batch ZIP processing
-   advanced compression
-   specialized social presets
-   developer API
-   desktop/PWA offline bundle
-   commercial usage tools

These must not force a cloud-upload architecture unless there is a
strong product reason.

------------------------------------------------------------------------

# 95. Future API

A future API would be a separate product.

Do not mix it into the initial browser application.

Potential architecture:

``` text
Muhajim Web
    ↓
local processing

Muhajim API
    ↓
separate paid infrastructure
```

This preserves the zero-server-cost consumer product.

------------------------------------------------------------------------

# 96. Product Governance

Every proposed feature should be evaluated against:

  Criterion       Question
  --------------- -------------------------------------------------
  User value      Does it solve a real resizing problem?
  Complexity      Does it substantially increase code complexity?
  Performance     Does it increase initial or processing cost?
  Memory          Does it increase peak memory?
  Privacy         Does it require image upload?
  SEO             Does it create genuine search value?
  Monetization    Does it support sustainable revenue?
  Accessibility   Can it be implemented accessibly?
  RTL             Does it work naturally in Arabic?
  Maintenance     Can Novixa maintain it cheaply?

A feature that scores poorly across several dimensions should not enter
the MVP.

------------------------------------------------------------------------

# 97. Final Product Architecture

The intended production architecture is:

``` text
                    ┌──────────────────────┐
                    │       Search         │
                    │ Social / Direct      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Muhajim Web App    │
                    │   Arabic-first RTL   │
                    └──────────┬───────────┘
                               │
                     User selects image
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Browser File API     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Web Worker        │
                    │                      │
                    │ Decode               │
                    │ EXIF orientation     │
                    │ Resize               │
                    │ Encode               │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Local Blob            │
                    │ Object URL             │
                    └──────────┬───────────┘
                               │
                               ▼
                         Download
```

Infrastructure:

``` text
Static/Edge Hosting
       │
       ├── Web application
       ├── SEO pages
       ├── Static assets
       ├── Sitemap
       └── Legal content

Third-party services
       ├── Ads
       └── Optional privacy-aware analytics

No normal image-processing backend
```

------------------------------------------------------------------------

# 98. Final Product Principles

Muhajim succeeds if it becomes the product users describe as:

> "I just opened it, selected my image, resized it, and downloaded it."

The engineering must remain invisible.

The product should not make users understand:

-   Web Workers
-   WASM
-   OffscreenCanvas
-   EXIF
-   codecs
-   memory allocation
-   browser APIs

Those are implementation details.

The user experience should remain:

``` text
Choose
→ Resize
→ Download
```

while the engineering underneath provides:

``` text
Local processing
+
High-quality resampling
+
Memory safety
+
EXIF correctness
+
Responsive UX
+
RTL localization
+
SEO
+
Accessibility
+
Low infrastructure cost
```

------------------------------------------------------------------------

# 99. Launch Checklist

## Product

-   [ ] Single-image resize is excellent
-   [ ] No mandatory login
-   [ ] Download is immediate
-   [ ] Privacy explanation is clear
-   [ ] Errors are recoverable

## Engineering

-   [ ] Type-safe
-   [ ] Worker-based
-   [ ] memory-safe
-   [ ] tested on iOS Safari
-   [ ] tested on Android
-   [ ] EXIF tested
-   [ ] output formats tested

## UX

-   [ ] Arabic-first
-   [ ] RTL-native
-   [ ] mobile-first
-   [ ] accessible
-   [ ] dark mode
-   [ ] reduced motion

## SEO

-   [ ] localized URLs
-   [ ] sitemap
-   [ ] robots
-   [ ] canonical
-   [ ] hreflang
-   [ ] metadata
-   [ ] structured data
-   [ ] OG images

## Monetization

-   [ ] ad policy reviewed
-   [ ] ad slots reserved
-   [ ] CLS tested
-   [ ] ads do not obstruct tool
-   [ ] privacy policy updated

## Production

-   [ ] domain configured
-   [ ] HTTPS
-   [ ] CSP
-   [ ] security headers
-   [ ] monitoring
-   [ ] analytics privacy reviewed
-   [ ] deployment smoke test
-   [ ] rollback plan

------------------------------------------------------------------------

# 100. Success Definition

Muhajim should not be judged by the number of features.

The MVP is successful when it demonstrates:

1.  **Fast first-use experience**
2.  **Reliable local processing**
3.  **Excellent mobile behavior**
4.  **Correct image orientation**
5.  **Professional Arabic RTL UX**
6.  **Strong organic search foundation**
7.  **Low infrastructure cost**
8.  **Non-intrusive monetization**
9.  **High successful-download rate**
10. **A clear path toward a family of profitable client-side image
    utilities**

The long-term strategy is:

``` text
Muhajim Resize
      ↓
Proven organic traffic
      ↓
Related image utilities
      ↓
Muhajim Tools ecosystem
      ↓
High-volume SEO utility network
      ↓
Advertising + affiliate + optional premium revenue
```

The critical constraint remains:

> **Grow the product without destroying the speed, simplicity, privacy,
> and trust that make the original tool useful.**

------------------------------------------------------------------------

## Appendix A --- Engineering Decision Defaults

Unless later benchmarks prove otherwise:

  Area              Default
  ----------------- ------------------------------
  Processing        Client-side
  Main processing   Web Worker
  Resize engine     Pica/native Canvas
  Advanced codecs   Lazy-loaded WASM
  Orientation       Normalize before export
  Aspect ratio      Locked by default
  Output            User-selectable
  Login             Not required
  Storage           No server image storage
  Batch             Post-MVP / carefully bounded
  Framework         Nuxt or Next.js
  Styling           Tailwind CSS
  Direction         RTL-first
  Default locale    Arabic
  Hosting           Static/edge
  Analytics         Privacy-reviewed
  Ads               Non-blocking
  PWA               Post-MVP
  API               Separate future product

------------------------------------------------------------------------

## Appendix B --- Engineering Non-Negotiables

1.  Never upload user images for normal resizing.
2.  Never block the main thread with avoidable heavy processing.
3.  Never silently distort an image.
4.  Never silently lose animation when the user expects animation
    preservation.
5.  Never claim lossless output for a lossy codec.
6.  Never ignore EXIF orientation.
7.  Never allow large-image failures to freeze the interface.
8.  Never ship Arabic as an afterthought.
9.  Never let advertisements obstruct the core task.
10. Never create SEO pages that provide no genuine user value.
11. Never expose secrets in client-side code.
12. Never retain large object URLs or image buffers unnecessarily.
13. Never treat desktop memory as the baseline for mobile.
14. Never add a feature merely because a competitor has it.
15. Never sacrifice the core resize experience for secondary
    functionality.

------------------------------------------------------------------------

## Appendix C --- Product North Star

**Muhajim = the fastest, simplest, privacy-first way to resize an image
in the browser.**

Everything else is subordinate to that promise.
