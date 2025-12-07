"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TagForm } from "./TagForm";
import { type TagFormData, type Tag, tagsApi } from "@/lib/api/tagService"; 
import { toast } from "sonner"

interface EditTagDialogProps {
  tag: Tag;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedTag: Tag) => void;
}

export function EditTagDialog({ tag, open, onOpenChange, onSuccess }: EditTagDialogProps) {

  const handleSubmit = async (data: TagFormData) => {
    try {
      // 1. Usamos el cliente tagsApi.updateTag
      const updatedTag = await tagsApi.updateTag(tag.id, data); 

      toast.success("Etiqueta actualizada correctamente");
      // 2. Llamamos onSuccess con la etiqueta actualizada para reflejar el cambio en la tabla
      onSuccess?.(updatedTag); 
      onOpenChange(false);
    } catch (error) {
      //console.error("Error al actualizar la etiqueta:", error);
      toast.error("Error al actualizar la etiqueta. Por favor, verifica tu sesión.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar etiqueta</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Actualiza los datos de esta etiqueta.
          </p>
        </DialogHeader>
        <TagForm
            mode="edit"
            defaultValues={{
                title: tag.title,
                color: tag.color,
            }}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
