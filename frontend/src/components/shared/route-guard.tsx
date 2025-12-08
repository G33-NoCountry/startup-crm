"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

// Componente para proteger rutas según el estado de autenticación

export function RouteGuard({ children, requireAuth = true }: RouteGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, checkAuth } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        checkAuth();

        const timer = setTimeout(() => {
            setIsChecking(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isChecking) {
            if (requireAuth && !isAuthenticated) {
                const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
                router.replace(loginUrl);
            } else if (!requireAuth && isAuthenticated) {
                router.replace("/dashboard");
            }
        }
    }, [isChecking, isAuthenticated, requireAuth, pathname, router]);

    if (isChecking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                        Verificando acceso...
                    </p>
                </div>
            </div>
        );
    }

    if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
        return null;
    }

    return <>{children}</>;
}
