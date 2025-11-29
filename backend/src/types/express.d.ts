
declare namespace Express {
    export interface User {
        id: number;
        role: 'Admin' | 'Agente' | 'Manager';
        email: string;
    }

    export interface Request {
        user?: User;
    }
}