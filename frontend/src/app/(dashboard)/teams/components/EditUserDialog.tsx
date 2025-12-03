"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserForm } from "./UserForm";
import { type UserFormData } from "@/lib/validations/user.schema";
import { toast } from "sonner"
import type { User } from "@/lib/validations/user.schema";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditUserDialog({ user, open, onOpenChange, onSuccess }: EditUserDialogProps) {

  const handleSubmit = async (data: UserFormData) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Usuario actualizado correctamente");
      onSuccess?.();
      onOpenChange(false);
    } catch {
      toast.error("Error al actualizar el usuario");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar miembro</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Actualiza los datos de este integrante del equipo.
          </p>
        </DialogHeader>
        <UserForm
            mode="edit"
            defaultValues={{
                full_name: user.full_name,
                email: user.email,
                phone: user.phone || "",
                role: user.role,
                status: user.status,
            }}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
