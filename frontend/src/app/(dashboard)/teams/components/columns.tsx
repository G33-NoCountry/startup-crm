"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/validations/user.schema";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<User>[] = [
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
            <DataTableColumnHeader column={column} title="Miembros" />
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
            <DataTableColumnHeader column={column} title="Email" />
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
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rol" />
        ),
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[200px] truncate font-medium">
                        {role}
                    </span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge
                    variant={status === "Activo" ? "default" : "secondary"}
                    className={status === "Activo" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                    {status}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Acciones" />
        ),
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
