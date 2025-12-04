"use client";

import { useState, useEffect, useCallback } from "react";
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
import { columns } from "@/components/features/contacts/columns"
import { NewContactDialog } from "@/components/features/contacts/NewContactDialog";

import { UserPlus } from "lucide-react";
import { contactsApi, Contact, ContactsQueryParams } from "@/lib/api/contactService";
import { toast } from "sonner";

export default function ContactPage() {

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [loading, setLoading] = useState(true);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  // Estado para parámetros de consulta
  const [queryParams, setQueryParams] = useState<ContactsQueryParams>({
    limit: 10,
  });

    const fetchContacts = useCallback(async () => {
    setLoading(true);

    try {
      const data = await contactsApi.getContacts(queryParams);
      setContacts(data.items);
    } catch (err) {
      console.error("Error al obtener los contactos:", err);
      toast.error("Error al obtener los contactos");
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Función para actualizar parámetros
  const updateParams = (newParams: Partial<ContactsQueryParams>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

    return (       
        <div className="flex flex-1 flex-col gap-4 py-4">          
            <Card>
              <CardHeader className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1"> 
                  <CardTitle className="text-2xl">Mis contactos</CardTitle>
                  <CardDescription>Administra las preferencias de tu cuenta y sistema</CardDescription>
                </div>
                <CardAction className="w-full md:w-auto">
                  <Button variant="default" size="lg" className="w-full md:w-auto" onClick={() => setIsNewDialogOpen(true)}>
                    <UserPlus /> Añadir contacto
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <DataTable data={contacts} columns={columns} loading={loading} />
              </CardContent>
            </Card>

            {/* Add new contact dialog */}
            <NewContactDialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen} />
        </div>
    );
}