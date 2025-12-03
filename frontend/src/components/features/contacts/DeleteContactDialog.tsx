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
import { toast } from "sonner";

interface DeleteContactDialogProps {
  contact: {
    id: string | number;
    full_name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // opcional: para refrescar la tabla
}

export function DeleteContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: DeleteContactDialogProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Error al eliminar");
      }

      toast.success(`Contacto "${contact.full_name}" eliminado`);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      toast.error("No se pudo eliminar el contacto");
      console.error(err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar contacto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el contacto
            <strong className="mx-1 font-semibold">{contact.full_name}</strong>.
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