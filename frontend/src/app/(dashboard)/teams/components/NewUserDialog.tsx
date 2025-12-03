"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserForm } from "./UserForm";
import { type UserFormData } from "@/lib/validations/user.schema";
import { toast } from "sonner";

interface NewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NewUserDialog({ open, onOpenChange, onSuccess }: NewUserDialogProps) {

  const handleSubmit = async (data: UserFormData) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Usuario creado correctamente");
      onSuccess?.();
      onOpenChange(false);
    } catch {
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Nuevo miembro</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Agrega un nuevo integrante al equipo.
          </p>
        </DialogHeader>
        <UserForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
