"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { DataTable } from "@/components/shared/data-table/data-table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { getColumns } from "./components/columns"
import { NewUserDialog } from "./components/NewUserDialog";
import { adminService } from "@/lib/api";
import type { User } from "@/types/user.types";
import { toast } from "sonner";

import { UserPlus } from "lucide-react";

export default function TeamsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setIsLoading(true);
      const data = await adminService.getAllUsers();
      
      const adaptedUsers = data.map(user => ({
        ...user,
        status: user.status ? "Activo" : "Inactivo",
      }));
      
      setUsers(adaptedUsers);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      toast.error("Error al cargar el equipo");
    } finally {
      setIsLoading(false);
    }
  }

  return (       
    <div className="flex flex-1 flex-col gap-4 py-4">          
      <Card>
        <CardHeader className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Equipo</CardTitle>
            <CardDescription>Administra, añade o edita tu equipo.</CardDescription>
          </div>
          <CardAction className="w-full md:w-auto">
            <Button 
              variant="default" 
              size="lg" 
              className="w-full md:w-auto" 
              onClick={() => setIsNewDialogOpen(true)}
            >
              <UserPlus /> Nuevo miembro
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Cargando equipo...</p>
            </div>
          ) : (
            <DataTable 
              data={users} 
              columns={getColumns(loadUsers)} 
              toolbar={DataTableToolbar} 
              emptyMessage="No hay miembros en el equipo..." 
            />
          )}
        </CardContent>
      </Card>

      <NewUserDialog 
        open={isNewDialogOpen} 
        onOpenChange={setIsNewDialogOpen}
        onSuccess={loadUsers}
      />
    </div>
  );
}