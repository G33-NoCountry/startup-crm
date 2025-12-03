"use client";

import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EditContactDialog } from "./EditContactDialog";
import { DeleteContactDialog } from "./DeleteContactDialog";
import type { Contact } from "@/lib/validations/contact.schema";
import { toast } from "sonner";

import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const contact = row.original as Contact;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={() => setEditOpen(true)} className="cursor-pointer hover:bg-accent" >
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setDeleteOpen(true)} className="cursor-pointer text-red-600 focus:text-red-600" >
          Eliminar contacto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button variant="ghost" size="icon" onClick={() => setEditOpen(true)}>
        <Pencil />
    </Button>
    </div>
    {/* Edit Dialog */}
    <EditContactDialog
        contact={contact}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={
          // Aquí puedes refrescar la tabla si usas TanStack Query, etc.
          () => toast.success("Contacto actualizado")
        }
      />

      {/* Delete Dialog */}
      <DeleteContactDialog
        contact={contact}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onSuccess={
          // Refrescar tabla o mutar datos
          () => toast.success("Contacto eliminado")
        }
      />
    </>
  );
}