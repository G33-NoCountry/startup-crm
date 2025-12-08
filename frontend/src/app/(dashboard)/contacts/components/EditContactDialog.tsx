"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { type ContactFormData, type Contact, contactsApi } from "@/lib/api/contactService";

import { toast } from "sonner"

interface EditContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedContact: Contact) => void;
}

export function EditContactDialog({ contact, open, onOpenChange, onSuccess }: EditContactDialogProps) {

  const handleSubmit = async (data: ContactFormData & { tags?: number[] }) => {
    try {
      const updatedContact = await contactsApi.updateContact(contact.id, {
      ...data,
      tags: data.tags, // ← ya es number[]
    }); 

      toast.success("Contacto actualizado correctamente");
      onSuccess?.(updatedContact); 
      onOpenChange(false);
    } catch (error) {
      //console.error("Error al actualizar el contacto:", error);
      toast.error("Error al actualizar el contacto");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar contacto</DialogTitle>
        </DialogHeader>
        <ContactForm
            mode="edit"
            defaultValues={{
                full_name: contact.full_name,
                email: contact.email,
                phone: contact.phone || "",
                tags: contact.tags?.map(t => t.id) ?? [], // aquí convertimos a IDs
            }}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}