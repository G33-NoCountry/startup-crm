"use client"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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



export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setIsLoading(true);
        console.log("Datos de registro:", data);

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }

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
                            className="w-full font-medium text-foreground hover:bg-secondary/70 bg-white border" 
                            size="default" 
                            type="button"
                            disabled={isLoading}
                        >
                            Continuar con Google
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