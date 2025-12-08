"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
import { getContactColumns } from "./components/columns"
import { NewContactDialog } from "./components/NewContactDialog";
import { TagsProvider } from "./context/TagsContext";

import { UserPlus } from "lucide-react";
import { contactsApi, Contact, ContactsQueryParams } from "@/lib/api/contactService";
import { tagsApi, Tag } from "@/lib/api/tagService";
import { toast } from "sonner";

export default function ContactPage() {

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

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
        //console.error("Error al obtener los contactos:", err);
        toast.error("Error al obtener los contactos");
      } finally {
        setLoading(false);
      }
  }, [queryParams]);

  const fetchTags = useCallback(async () => {
    try {
      const data = await tagsApi.getTags({ limit: 100 });
      setTags(data); // data.items depende de tu API
    } catch (err) {
      toast.error("Error al cargar las etiquetas");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
    fetchTags();
  }, [fetchContacts, fetchTags]);

  // Función para actualizar parámetros
  const updateParams = (newParams: Partial<ContactsQueryParams>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  // Lógica para insertar la nueva etiqueta al inicio de la lista
  const onContactCreated = useCallback((newContact: Contact) => {
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  },[]);

  // Lógica para actualizar una etiqueta existente
  const onContactUpdated = useCallback((updatedContact: Contact) => {
      setContacts((prevContacts) => 
          prevContacts.map((contact) => 
              contact.id === updatedContact.id ? updatedContact : contact
          )
      );
  },[]);

  // Lógica para eliminar una etiqueta de la lista
  const onContactDeleted = useCallback((deletedContactId: string | number) => {
      setContacts((prevContacts) => 
          prevContacts.filter((contact) => contact.id !== deletedContactId)
      );
  },[]);

  // Generamos las columnas dinámicamente, pasando los handlers de acciones
  const columns = useMemo(() => getContactColumns({ onContactUpdated, onContactDeleted}), [
      onContactUpdated,
      onContactDeleted
  ]);
    
    return (
      <TagsProvider tags={tags}>
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
                <DataTable data={contacts} columns={columns} toolbar={DataTableToolbar} loading={loading} emptyMessage="No hay contactos..." />
              </CardContent>
            </Card>

            {/* Add new dialog */}
            <NewContactDialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen} onSuccess={onContactCreated} />
        </div>
    </TagsProvider>
    );
}