"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { type ContactFormData } from "@/lib/validations/contact.schema";
import { toast } from "sonner"

interface NewContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NewContactDialog({ open, onOpenChange, onSuccess }: NewContactDialogProps) {

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al crear");

      toast.success("Contacto creado correctamente");
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      toast.error("Error al crear el contacto");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Nuevo contacto</DialogTitle>
        </DialogHeader>
        <ContactForm mode="create" onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}