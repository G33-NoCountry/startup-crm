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
import { getTagColumns } from "./components/columns" 
import { NewTagDialog } from "./components/NewTagDialog";

import { UserPlus } from "lucide-react";
import { tagsApi, Tag, TagsQueryParams } from "@/lib/api/tagService";
import { toast } from "sonner";

export default function TagsPage() {

const [tags, setTags] = useState<Tag[]>([]);

  const [loading, setLoading] = useState(true);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  // Estado para parámetros de consulta
  const [queryParams, setQueryParams] = useState<TagsQueryParams>({
    limit: 10,
  });

    const fetchTags = useCallback(async () => {
      setLoading(true);

      try {
        const data = await tagsApi.getTags(queryParams);
        setTags(data); // data.items si usamos paginacion
      } catch (err) {
        //console.error("Error al obtener las etiquetas:", err);
        toast.error("Error al obtener las etiquetas");
      } finally {
        setLoading(false);
      }
    }, [queryParams]);

    useEffect(() => {
      fetchTags();
    }, [fetchTags]);

    // Función para actualizar parámetros
    const updateParams = (newParams: Partial<TagsQueryParams>) => {
      setQueryParams((prev) => ({ ...prev, ...newParams }));
    };

    // Lógica para insertar la nueva etiqueta al inicio de la lista
    const onTagCreated = useCallback((newTag: Tag) => {
      // Usamos la forma inmutable de actualizar el estado de React:
      // La nueva etiqueta va primero, seguida por el resto de etiquetas previas.
      setTags((prevTags) => [newTag, ...prevTags]);
    },[]);// Dependencia vacía ya que setTags es estable

    // Lógica para actualizar una etiqueta existente
    const onTagUpdated = useCallback((updatedTag: Tag) => {
        setTags((prevTags) => 
            prevTags.map((tag) => 
                tag.id === updatedTag.id ? updatedTag : tag
            )
        );
    },[]);// Dependencia vacía ya que setTags es estable

    // Lógica para eliminar una etiqueta de la lista
    const onTagDeleted = useCallback((deletedTagId: string | number) => {
        setTags((prevTags) => 
            prevTags.filter((tag) => tag.id !== deletedTagId)
        );
    },[]);// Dependencia vacía ya que setTags es estable

    // Generamos las columnas dinámicamente, pasando los handlers de acciones
    const columns = useMemo(() => getTagColumns({ onTagUpdated, onTagDeleted }), [
        onTagUpdated,
        onTagDeleted
    ]);

    return (       
        <div className="flex flex-1 flex-col gap-4 py-4">          
            <Card>
              <CardHeader className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle>Mis Etiquetas</CardTitle>
                  <CardDescription>Administra, añade o edita tus etiquetas.</CardDescription>
                </div>
                <CardAction className="w-full md:w-auto">
                  <Button variant="default" size="lg" className="w-full md:w-auto" onClick={() => setIsNewDialogOpen(true)}>
                    <UserPlus /> Añadir etiqueta
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <DataTable data={tags} columns={columns} toolbar={DataTableToolbar} loading={loading} emptyMessage="No hay etiquetas..." />
              </CardContent>
            </Card>

            <NewTagDialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen} onSuccess={onTagCreated} />
        </div>
    );
}