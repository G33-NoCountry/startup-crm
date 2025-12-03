"use client";

import { useState } from "react";
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
import { columns } from "./components/columns"
import { userDbSchema } from "@/lib/validations/user.schema"
import { NewUserDialog } from "./components/NewUserDialog";

import { UserPlus } from "lucide-react";
import { z } from "zod";
import dataUsers from "@/lib/data/users.json";

export default function TeamsPage() {

  const users = z.array(userDbSchema).parse(dataUsers);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

    return (       
        <div className="flex flex-1 flex-col gap-4 py-4">          
            <Card>
              <CardHeader className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle>Equipo</CardTitle>
                  <CardDescription>Administra, añade o edita tu equipo.</CardDescription>
                </div>
                <CardAction className="w-full md:w-auto">
                  <Button variant="default" size="lg" className="w-full md:w-auto" onClick={() => setIsNewDialogOpen(true)}>
                    <UserPlus /> Nuevo miembro
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <DataTable data={users} columns={columns} toolbar={DataTableToolbar} emptyMessage="No hay miembros en el equipo..." />
              </CardContent>
            </Card>

            <NewUserDialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen} />
        </div>
    );
}