"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
// import { type ContactFormData } from "@/lib/validations/contact.schema";
import { type ContactFormData, type Contact, contactsApi } from "@/lib/api/contactService"; 
import { toast } from "sonner"

interface NewContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (newContact: Contact) => void;
}

export function NewContactDialog({ open, onOpenChange, onSuccess }: NewContactDialogProps) {

  const handleSubmit = async (data: ContactFormData) => {
    try {
      // Utilizamos el cliente contactsApi para crear el contacto
       const newContact = await contactsApi.createContact(data);

      toast.success("Contacto creado correctamente");
      onSuccess?.(newContact);
      onOpenChange(false);
    } catch (error) {
      //console.error("Error al crear la etiqueta:", error);
      toast.error("Error al crear el contacto.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Nuevo contacto</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Agrega un nuevo contacto.
          </p>
        </DialogHeader>
        <ContactForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}