export async function enhancePrompt(sentence, style) {
  const visualStyle = style || "cinematic";

  return `cinematic storyboard frame of ${sentence}, highly detailed environment, expressive characters, dramatic lighting, volumetric light rays, wide angle composition, depth of field, 35mm lens, cinematic color grading, film grain, professional movie still, ultra realistic, 4k quality, dynamic composition, concept art, ${visualStyle} style`;
}
