"use client";

import { Ellipsis, Pencil, Trash2, UserCog } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import type { User } from "@/lib/validations/user.schema";
import { toast } from "sonner";

import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onSuccess?: () => void;
}

export function DataTableRowActions<TData>({
  row,
  onSuccess,
}: DataTableRowActionsProps<TData>) {
  const user = row.original as User;
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
          Eliminar miembro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EditUserDialog
        user={user}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={() => {
          onSuccess?.();
        }}
      />

      <DeleteUserDialog
        user={user}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onSuccess={() => {
          onSuccess?.();
        }}
      />
    </>
  );
}
