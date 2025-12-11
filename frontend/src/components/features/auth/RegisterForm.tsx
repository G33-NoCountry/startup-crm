"use client"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth.schema";
import { authService } from "@/lib/api/authService";
import { saveToken, saveRefreshToken, saveUser } from "@/lib/utils/tokenUtils";
import { toast } from "sonner";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            companyName: "",
            acceptTerms: false,
        },
    });

    async function onSubmit(data: RegisterFormData) {
        console.log("🔥 onSubmit LLAMADO - Datos:", data);
        console.log("🔥 Errores del form:", form.formState.errors);
        
        try {
            setIsLoading(true);
            console.log("🔥 Llamando al API...");
            
            const response = await authService.register({
                full_name: data.fullName,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword,
            } as any);

            console.log("🔥 Respuesta del API:", response);

            if (response.success) {
                saveToken(response.data.access_token);
                saveRefreshToken(response.data.refresh_token);
                saveUser(response.data.user);
                
                toast.success("¡Cuenta creada exitosamente!");
                
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);
            }
        } catch (error: any) {
            console.error("❌ Error en registro:", error);
            toast.error(error?.message || "Error al crear la cuenta. Intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }
    
    console.log("🔍 Estado del form:", {
        isValid: form.formState.isValid,
        errors: form.formState.errors,
        isDirty: form.formState.isDirty,
    });

    return (
        <div className="">
            <Card className="w-[473px] border shadow-none rounded-lg">
                <div className="px-8">
                    <div className="space-y-2 text-left py-6">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Registrate
                        </h1>
                        <p className="text-muted-foreground">
                            Introduzca sus datos para registrarse correctamente.
                        </p>
                    </div>
                    <div className="space-y-4 pt-1">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground font-medium">
                                                Nombre y apellido <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Ingrese nombre y apellido..." 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground font-medium">
                                                Correo electrónico <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="m@tumail.com" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground font-medium">
                                                Introduzca una contraseña <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input 
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Ingrese una contraseña..." 
                                                        {...field} 
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    >
                                                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground font-medium">
                                                Repetir contraseña <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input 
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Repita su contraseña..." 
                                                        {...field} 
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    >
                                                        {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button 
                                    type="submit" 
                                    className="w-full font-medium" 
                                    variant="default" 
                                    size="default"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                                </Button>
                            </form>
                        </Form>
                        
                        <Button 
                            onClick={async () => {
                                console.log("🚀 PRUEBA DIRECTA - Sin validación");
                                const valores = form.getValues();
                                console.log("📋 Valores:", valores);
                                
                                if (!valores.fullName || !valores.email || !valores.password) {
                                    toast.error("Por favor completa todos los campos");
                                    return;
                                }
                                
                                if (valores.password !== valores.confirmPassword) {
                                    toast.error("Las contraseñas no coinciden");
                                    return;
                                }
                                
                                await onSubmit(valores as RegisterFormData);
                            }}
                            className="w-full font-medium bg-green-600 hover:bg-green-700" 
                            variant="default" 
                            size="default"
                            disabled={isLoading}
                            type="button"
                        >
                            {isLoading ? "Creando..." : "🧪 PRUEBA DIRECTA (Bypass validación)"}
                        </Button>


                        <div className="text-center text-sm text-muted-foreground">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="/login" className="font-medium text-primary hover:underline">
                                Inicia sesión
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}