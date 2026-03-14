import nlp from "compromise";

export function segmentText(text) {
  const doc = nlp(text);
  const sentences = doc.sentences().out("array");
  
  // Limit to maximum 5 scenes
  return sentences.map(s => s.trim()).filter(s => s.length > 0).slice(0, 5);
}
