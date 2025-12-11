"use client"
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth.schema";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    
    // Zustand store
    const { login, isLoading, error, clearError, isBlocked, loginAttempts } = useAuthStore();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    useEffect(() => {
        const subscription = form.watch(() => {
            if (error) {
                clearError();
            }
        });
        return () => subscription.unsubscribe();
    }, [error, clearError, form]);

    async function onSubmit(data: any) {
        const success = await login({
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe ?? false,
        });

        if (success) {
            router.push("/dashboard");
        }
    }

    return (
        <Card className="border-none shadow-none rounded-lg w-full max-w-md mx-auto bg-white">
            <div className="px-8">
                <div className="space-y-2 text-left py-6">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Iniciar sesión en Start
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Ingresa tus datos para iniciar sesión.
                    </p>
                </div>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        
                        {error && (
                            <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        {isBlocked && (
                            <div className="flex items-center gap-2 p-3 text-sm text-orange-800 bg-orange-50 border border-orange-200 rounded-lg">
                                <AlertCircle className="h-4 w-4" />
                                <span>Tu cuenta está temporalmente bloqueada por seguridad.</span>
                            </div>
                        )}
                        
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground font-medium">
                                        Correo electrónico <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@tuemail.com" {...field} />
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
                                        Contraseña <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input 
                                                type={showPassword ? "text" : "password"} 
                                                placeholder="Ingrese su contraseña..." 
                                                {...field} 
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? (
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between pt-2">
                            <FormField
                                control={form.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                                                Recordarme
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-[#0f172a] hover:bg-[#0f172a]/90 text-white font-medium mt-4" 
                            disabled={isLoading}
                        >
                            {isLoading ? "Iniciando..." : "Iniciar sesión"}
                        </Button>
                    </form>
                </Form>

                <div className="space-y-4 mt-4">
                    <div className="text-center text-sm text-muted-foreground">
                        ¿Todavía no tienes una cuenta?{" "}
                        <a href="/register" className="font-medium text-primary hover:underline">
                            Regístrate
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
}