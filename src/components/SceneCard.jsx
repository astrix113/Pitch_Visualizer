import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SceneCard({ scene, index }) {
  return (
    <Card className="overflow-hidden border-border/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
      <div className="relative aspect-square w-full group">
        <img
          src={scene.image}
          alt={`Scene ${index}`}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
          Scene {index}
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-lg font-medium leading-relaxed text-card-foreground">
          {scene.text}
        </p>
      </CardContent>
    </Card>
  );
}
