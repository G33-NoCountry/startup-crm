"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@/lib/api/tagService";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { tagColorClasses } from "@/lib/constants/tag-colors";
import { Badge } from "@/components/ui/badge";
import { CircleSmall } from "lucide-react";

// Definimos los tipos de props que las columnas esperarán
interface TagColumnsProps {
    onTagUpdated: (updatedTag: Tag) => void;
    onTagDeleted: (deletedTagId: string | number) => void;
}

export const getTagColumns = ({ onTagUpdated, onTagDeleted }: TagColumnsProps): ColumnDef<Tag>[] => [
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
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Etiqueta" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "color",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Color" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        <Badge
                            variant="secondary"
                            className={tagColorClasses[row.getValue("color")]}
                        >
                            <CircleSmall />
                            {row.getValue("color")}
                        </Badge>
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Acciones" />
        ),
        // Pasamos las funciones de callback a DataTableRowActions
        cell: ({ row }) => (
            <DataTableRowActions 
                row={row} 
                onTagUpdated={onTagUpdated}
                onTagDeleted={onTagDeleted}
            />
        ),
    },
];
