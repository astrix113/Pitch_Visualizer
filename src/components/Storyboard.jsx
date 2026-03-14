import SceneCard from "./SceneCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Storyboard({ scenes, isLoading }) {
  if (!isLoading && scenes.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 pb-20">
      <h2 className="text-3xl font-extrabold text-center tracking-tight mb-8">
        Your Visual Storyboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-square rounded-2xl" />
                <Skeleton className="w-full h-16 rounded-lg" />
              </div>
            ))
          : scenes.map((scene, index) => (
              <SceneCard key={index} scene={scene} index={index + 1} />
            ))}
      </div>
    </div>
  );
}
