"use client";

import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EditContactDialog } from "./EditContactDialog";
import { DeleteContactDialog } from "./DeleteContactDialog";
import type { Contact } from "@/lib/validations/contact.schema";

import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  // Agregamos las funciones de callback del componente padre
  onContactUpdated: (updatedContact: Contact) => void; 
  onContactDeleted: (deletedContactId: string | number) => void;
}

export function DataTableRowActions<TData>({
  row,
  onContactUpdated,
  onContactDeleted,
}: DataTableRowActionsProps<TData>) {
  const contact = row.original as Contact;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
 
  return (
    <>
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
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onSelect={() => setEditOpen(true)} className="cursor-pointer hover:bg-accent" >
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setDeleteOpen(true)} className="cursor-pointer text-red-600 focus:text-red-600" >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* Edit Dialog */}
    <EditContactDialog
        contact={contact}
        open={editOpen}
        onOpenChange={setEditOpen}
        // Pasamos la función de actualización del componente padre
        onSuccess={onContactUpdated}
      />

      {/* Delete Dialog */}
      <DeleteContactDialog
        contact={contact}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        // Pasamos la función de eliminación del componente padre
        onSuccess={onContactDeleted}
      />
    </>
  );
}