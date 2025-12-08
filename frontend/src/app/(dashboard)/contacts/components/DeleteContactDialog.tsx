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
import { contactsApi, type Contact } from "@/lib/api/contactService";
import { toast } from "sonner";

interface DeleteContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (deletedContactId: string | number) => void; // opcional: para refrescar la tabla
}

export function DeleteContactDialog({
  contact,
  open,
  onOpenChange,
  onSuccess,
}: DeleteContactDialogProps) {
  const handleDelete = async () => {
    try {
      await contactsApi.deleteContact(contact.id);

      toast.success(`Contacto "${contact.full_name}" eliminado correctamente`);
      onSuccess?.(contact.id); 
      onOpenChange(false);
    } catch (err) {
      //console.error("Error al eliminar el contacto:", err);
      toast.error("No se pudo eliminar el contacto");
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