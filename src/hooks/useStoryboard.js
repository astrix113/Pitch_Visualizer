import { useState } from "react";
import axios from "axios";

export function useStoryboard() {
  const [scenes, setScenes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateStoryboard = async (data) => {
    setIsLoading(true);
    setError(null);
    setScenes([]);

    try {
      const response = await axios.post("/api/generate", data);
      if (response.data.scenes) {
        setScenes(response.data.scenes);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to generate storyboard");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scenes,
    isLoading,
    error,
    generateStoryboard,
  };
}
