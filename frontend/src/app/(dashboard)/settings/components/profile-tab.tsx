"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { userService } from "@/lib/api/userService"
import { profileFormSchema, type ProfileFormData } from "@/lib/validations/profile.schema"
import { toast } from "sonner"
import type { User } from "@/types/user.types"

interface ProfileTabProps {
  onSave?: () => void;
}

export function ProfileTab({ onSave }: ProfileTabProps) {
    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            full_name: "",
            email: "",
        },
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const user = await userService.getProfile();
                form.reset({
                    full_name: user.full_name,
                    email: user.email,
                });
            } catch (error) {
                toast.error("Error al cargar perfil");
            }
        };
        loadProfile();
    }, [form]);

    const handleSubmit = async (data: ProfileFormData) => {
        try {
            await userService.updateProfile(data);
            toast.success("Perfil actualizado correctamente");
            onSave?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error al actualizar perfil");
        }
    };

    useEffect(() => {
        (window as any).__profileFormSubmit = form.handleSubmit(handleSubmit);
        return () => {
            delete (window as any).__profileFormSubmit;
        };
    }, [form]);

    const { full_name, email } = form.watch();
    const initials = full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Información del Perfil</h3>

            <div className="mb-6 flex items-center gap-4">
                <Avatar className="size-16 bg-primary text-white">
                    <AvatarFallback className="bg-primary text-xl font-semibold text-white">
                        {initials || "U"}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Avatar generado automáticamente
                    </p>
                </div>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="full_name">Nombre completo</Label>
                    <Input
                        id="full_name"
                        {...form.register("full_name")}
                        className="bg-background"
                    />
                    {form.formState.errors.full_name && (
                        <p className="text-xs text-destructive">
                            {form.formState.errors.full_name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="bg-background"
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs text-destructive">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}
