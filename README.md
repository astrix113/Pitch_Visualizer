# Pitch Visualizer

Pitch Visualizer is a Next.js application that converts short narratives or startup pitches into a visual storyboard using AI-generated images.

Users submit a short story and select a visual style, then the app:
- splits the story into scenes,
- builds cinematic prompts,
- generates an image for each scene,
- and renders a storyboard grid in the UI.

## Features

- Story input form with validation (`10-1000` characters)
- Style presets (cinematic, digital art, photorealistic, comic book, watercolor)
- Automatic sentence segmentation into scenes
- Scene-by-scene prompt enhancement for image generation
- AI image generation through Hugging Face Inference API (Stable Diffusion XL)
- Responsive storyboard UI with loading skeletons and error alerts
- Server-side API route with scene-level fault tolerance

## Tech Stack

- **Framework:** Next.js (App Router), React
- **Styling:** Tailwind CSS
- **Forms and validation:** React Hook Form, Zod
- **NLP sentence splitting:** compromise
- **HTTP client:** Axios
- **UI primitives:** Shadcn-style component setup
- **Image model endpoint:** `stabilityai/stable-diffusion-xl-base-1.0` via Hugging Face router

## How It Works

1. User submits `text` + `style` from the homepage.
2. Frontend calls `POST /api/generate`.
3. API validates input and segments text into sentences.
4. API keeps up to 4 scenes per request.
5. Each scene sentence is transformed into an enhanced visual prompt.
6. Prompt is sent to Hugging Face image inference endpoint.
7. Returned binary image is converted to base64 data URL.
8. UI renders all generated scene cards.

## Project Structure

```txt
src/
  app/
    api/generate/route.js       # Storyboard generation API
    layout.js                   # App layout and metadata
    page.js                     # Main page
  components/
    StoryInput.jsx              # Form + validation messages
    StyleSelector.jsx           # Style dropdown
    Storyboard.jsx              # Scene grid + loading state
    SceneCard.jsx               # Single scene display
    ui/                         # Reusable UI primitives
  hooks/
    useStoryboard.js            # Client state + API call hook
  lib/
    segmentText.js              # Sentence segmentation logic
    promptGenerator.js          # Prompt enhancement
    imageGenerator.js           # Hugging Face request + base64 conversion
    gemini.js                   # Gemini client setup (currently unused)
  utils/
    constants.js                # Style options
```

## Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm
- A Hugging Face access token with inference permissions

## Installation

```bash
git clone https://github.com/your-username/pitch-visualizer.git
cd pitch-visualizer
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
HUGGINGFACE_TOKEN=your_huggingface_token_here
```

Notes:
- `HUGGINGFACE_TOKEN` is the only required variable for local and Vercel deployment.
- `GEMINI_API_KEY` is not required for current app functionality.

## Running the App

Start development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push your project to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. In **Project Settings -> Environment Variables**, add:
   - `HUGGINGFACE_TOKEN` = your Hugging Face token
4. Deploy.

Optional recommendation:
- Redeploy after changing the token value.

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## API Reference

### `POST /api/generate`

Generates storyboard scenes and images from input text.

#### Request body

```json
{
  "text": "A founder enters a boardroom. Investors look skeptical. The demo impresses everyone.",
  "style": "cinematic"
}
```

#### Success response (`200`)

```json
{
  "scenes": [
    {
      "text": "A founder enters a boardroom.",
      "prompt": "cinematic storyboard frame of ...",
      "image": "data:image/png;base64,..."
    }
  ]
}
```

#### Error responses

- `400` when `text` is missing
- `400` when no valid sentences are parsed
- `500` for unexpected server-side failures

## Current Limits and Behavior

- API processes scenes sequentially for predictable flow.
- Maximum returned scenes per request: `4`.
- If one scene fails to generate, the API continues with remaining scenes.
- Generation speed depends on upstream model latency and token limits.

## Troubleshooting

- **`Text is required`**  
  Ensure request includes a non-empty `text` field.

- **Images are blank**  
  Check `HUGGINGFACE_TOKEN` and quota/permissions on Hugging Face.

- **Slow generation**  
  Use shorter input (3-4 sentences) and retry during lower API load.

- **Build/runtime env issues**  
  Confirm `.env.local` exists at project root and restart dev server after edits.

## Roadmap Ideas

- Parallel scene generation with controlled concurrency
- Download/export storyboard as PDF
- Shareable storyboard links
- Better prompt engineering per selected style
- Optional model/provider abstraction layer

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run lint/build checks
5. Open a pull request

