"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { tagsApi, type Tag } from "@/lib/api/tagService";
import { toast } from "sonner";

interface DeleteTagDialogProps {
  tag: Tag;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (deletedTagId: string | number) => void;
}

export function DeleteTagDialog({
  tag,
  open,
  onOpenChange,
  onSuccess,
}: DeleteTagDialogProps) {
  const handleDelete = async () => {
    try {
      // 1. Usamos el cliente tagsApi.deleteTag
      await tagsApi.deleteTag(tag.id);

      toast.success(`Etiqueta "${tag.title}" eliminada correctamente`);
      // 2. Llamamos onSuccess con el ID
      onSuccess?.(tag.id); 
      onOpenChange(false);
    } catch (err) {
      //console.error("Error al eliminar la etiqueta:", err);
      toast.error("No se pudo eliminar la etiqueta");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar etiqueta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la etiqueta
            <strong className="mx-1 font-semibold">{tag.title}</strong>
            y perderá el acceso al sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
