"use client";

import { useStoryboard } from "@/hooks/useStoryboard";
import StoryInput from "@/components/StoryInput";
import Storyboard from "@/components/Storyboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { scenes, isLoading, error, generateStoryboard } = useStoryboard();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Pitch <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Visualizer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn stories into visual storyboards in seconds using the power of AI.
          </p>
        </div>

        {/* Input Form */}
        <StoryInput onSubmit={generateStoryboard} isLoading={isLoading} />

        {/* Error Handling */}
        {error && (
          <div className="max-w-2xl mx-auto mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Storyboard Rendering */}
        <Storyboard scenes={scenes} isLoading={isLoading} />

      </div>
    </main>
  );
}
