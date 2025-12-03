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

import { DataTable } from "@/components/features/contacts/data-table";
import { DataTableToolbar } from "@/components/features/contacts/data-table-toolbar";
import { columns } from "@/components/features/contacts/columns"
import { contactDbSchema } from "@/lib/validations/contact.schema"
import { NewContactDialog } from "@/components/features/contacts/NewContactDialog";

import { UserPlus } from "lucide-react";
import { z } from "zod";
import dataContacts from "@/lib/data/contacts.json";

export default function ContactPage() {

  const contacts = z.array(contactDbSchema).parse(dataContacts);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

    return (       
        <div className="flex flex-1 flex-col gap-4 py-4">          
            <Card>
              <CardHeader className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle>Administra tus contactos</CardTitle>
                  <CardDescription>Gestiona y edita tu base de datos de contactos.</CardDescription>
                </div>
                <CardAction className="w-full md:w-auto">
                  <Button variant="default" size="lg" className="w-full md:w-auto" onClick={() => setIsNewDialogOpen(true)}>
                    <UserPlus /> Nuevo contacto
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <DataTable data={contacts} columns={columns} toolbar={DataTableToolbar} />
              </CardContent>
            </Card>

            {/* Add new contact dialog */}
            <NewContactDialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen} />
        </div>
    );
}