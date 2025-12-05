"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TagForm } from "./TagForm";
import { type TagFormData, type Tag, tagsApi } from "@/lib/api/tagService"; 
import { toast } from "sonner";

interface NewTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (newTag: Tag) => void;
}

export function NewTagDialog({ open, onOpenChange, onSuccess }: NewTagDialogProps) {

  const handleSubmit = async (data: TagFormData) => {
    try {
       // Utilizamos el cliente tagsApi para crear la etiqueta
       const newTag = await tagsApi.createTag(data);

      toast.success("Etiqueta creada correctamente");
      onSuccess?.(newTag);
      onOpenChange(false);
    } catch (error) {
      //console.error("Error al crear la etiqueta:", error);
      toast.error("Error al crear la etiqueta.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Nueva etiqueta</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Agrega una nueva etiqueta.
          </p>
        </DialogHeader>
        <TagForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
