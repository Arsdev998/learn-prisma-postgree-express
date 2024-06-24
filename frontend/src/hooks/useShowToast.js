// src/hooks/useShowToast.js
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

const useShowToast = () => {
  const { toast } = useToast();

  const triggerToast = useCallback((description, variant) => {
    toast({
      description,
      variant,
    });
  }, [toast]);

  return triggerToast;
};

export default useShowToast;
