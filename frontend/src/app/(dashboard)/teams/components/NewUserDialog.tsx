"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserForm } from "./UserForm";
import { type UserFormData } from "@/lib/validations/user.schema";
import { adminService } from "@/lib/api";
import { toast } from "sonner";

interface NewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NewUserDialog({ open, onOpenChange, onSuccess }: NewUserDialogProps) {

  const handleSubmit = async (data: UserFormData) => {
    try {
      if (!data.password) {
        toast.error("La contraseña es requerida");
        return;
      }

      await adminService.createUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      toast.success("Usuario creado correctamente");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      toast.error(error instanceof Error ? error.message : "Error al crear el usuario");
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
