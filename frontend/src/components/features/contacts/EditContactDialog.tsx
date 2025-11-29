"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact.schema";
import { toast } from "sonner"
import type { Contact } from "@/lib/validations/contact.schema";

interface EditContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditContactDialog({ contact, open, onOpenChange, onSuccess }: EditContactDialogProps) {

  const handleSubmit = async (data: ContactFormData & { tags?: string[] }) => {
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Contacto actualizado");
      onSuccess?.();
      onOpenChange(false);
    } catch {
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
                tags: contact.tags.map(t => t.title),
                // tags: contact.tags || [],
            }}
            onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}