import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StyleSelector from "./StyleSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  text: z.string().min(10, {
    message: "Story must be at least 10 characters.",
  }).max(1000, {
    message: "Story must not exceed 1000 characters.",
  }),
  style: z.string().min(1, { message: "Please select a visual style." }),
});

export default function StoryInput({ onSubmit, isLoading }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      style: "cinematic",
    },
  });

  const styleValue = watch("style");

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Enter Your Story
        </CardTitle>
        <CardDescription>
          Provide 3-5 sentences describing your narrative (max 1000 characters).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">The Pitch</Label>
            <Textarea
              id="text"
              placeholder="e.g., A startup struggled with slow customer support. They deployed an AI chatbot to answer queries instantly. Customer satisfaction improved dramatically."
              className="resize-none min-h-[120px]"
              {...register("text")}
            />
            {errors.text && (
              <p className="text-sm text-red-500 font-medium">
                {errors.text.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Visual Style</Label>
            <StyleSelector
              value={styleValue}
              onChange={(val) => setValue("style", val)}
            />
            {errors.style && (
              <p className="text-sm text-red-500 font-medium">
                {errors.style.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 
text-white w-full text-lg font-semibold tracking-wide "
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Visualizing...
              </span>
            ) : (
              "Generate Storyboard"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
