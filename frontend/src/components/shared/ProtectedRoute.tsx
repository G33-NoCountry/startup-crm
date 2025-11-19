"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "member";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, checkAuth } = useAuthStore();

  useEffect(() => {
    // Verificar autenticación al montar el componente
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
