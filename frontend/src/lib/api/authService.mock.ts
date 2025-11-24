import type { LoginCredentials, LoginResponse } from "@/types/auth.types";

/**
 * Mock del servicio de autenticación - SOLO PARA DESARROLLO
 * Eliminar cuando el backend implemente el endpoint real
 */
export class AuthServiceMock {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simular validación
        if (credentials.email === "admin@crm.com" && credentials.password === "Admin123") {
            return {
                success: true,
                message: "Login exitoso",
                data: {
                    user: {
                        id: "1",
                        email: credentials.email,
                        name: "Usuario Demo",
                        role: "admin",
                    },
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluQGNybS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzIxMjM0NTYsImV4cCI6MTczMjIwOTg1Nn0.mock-token-signature",
                },
            };
        }

        throw {
            message: "Credenciales inválidas",
            statusCode: 401,
        };
    }

    async logout(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 300));
    }

    async verifyToken(token: string): Promise<boolean> {
        return token.includes("mock-token");
    }

    async getProfile(token: string) {
        return {
            id: "1",
            email: "admin@crm.com",
            name: "Usuario Demo",
            role: "admin",
        };
    }
}

export const authServiceMock = new AuthServiceMock();
