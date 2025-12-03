 "use client";

import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@/lib/validations/contact.schema";
import { Tag } from "@/lib/validations/tag.schema";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TagBadge } from "@/components/ui/tag-badge";
import { tagColorClasses } from "@/lib/constants/tag-colors";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="pl-2 w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre completo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("full_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electronico" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("phone")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    id: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Etiquetas" />
    ),
    cell: ({ row }) => {
      const tags: Tag[] = row.getValue("tags") || [];

      if (tags.length === 0) {
        return (
          <div className="text-muted-foreground text-sm">Sin etiquetas</div>
        );
      }

      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {tags.map((tag) => (
            <TagBadge
              key={tag.id}
              title={tag.title}
              color={tagColorClasses[tag.color] || tagColorClasses.gray}
            />
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creado en" />
    ),
    cell: ({ row }) => {
      // Obtener el valor de la fecha como string ISO
      const dateString = row.getValue("created_at") as string;
      
      const date = new Date(dateString);

      // Opciones de formato: día, mes y año numérico
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',    // dd
        month: '2-digit',  // MM
        year: 'numeric',   // yyyy
        hour: '2-digit',     // HH
        minute: '2-digit',   // mm
        second: '2-digit',   // ss
        hour12: false,       // Usar formato de 24 horas
      };

      // Formatear la fecha a 'dd/MM/yyyy HH:mm:ss'
      const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acciones" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];