# Data Table - Componentes Compartidos

Este directorio contiene componentes reutilizables para tablas de datos basados en TanStack Table y Shadcn UI.

## Componentes

### `DataTable`
Componente principal de tabla con todas las funcionalidades (paginación, ordenamiento, filtros, selección).

**Props:**
- `columns`: Definición de columnas (ColumnDef[])
- `data`: Array de datos a mostrar
- `toolbar`: Componente de toolbar personalizado que recibe `table` como prop
- `emptyMessage`: Mensaje cuando no hay datos (opcional)

**Uso:**
```tsx
import { DataTable } from "@/components/shared/data-table";
import { MyToolbar } from "./my-toolbar";

<DataTable 
  data={myData} 
  columns={columns} 
  toolbar={MyToolbar}
  emptyMessage="No hay datos disponibles" 
/>
```

### `DataTableColumnHeader`
Header de columna con opciones de ordenamiento (Asc/Desc/Ocultar).

**Uso:**
```tsx
import { DataTableColumnHeader } from "@/components/shared/data-table";

{
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Nombre" />
  ),
}
```

### `DataTablePagination`
Componente de paginación con selector de filas por página.

**Uso:** Se incluye automáticamente en `DataTable`.

### `DataTableViewOptions`
Dropdown para mostrar/ocultar columnas.

**Uso:**
```tsx
import { DataTableViewOptions } from "@/components/shared/data-table";

<DataTableViewOptions table={table} />
```

### `DataTableFacetedFilter`
Filtro con opciones múltiples (checkbox).

**Uso:**
```tsx
import { DataTableFacetedFilter } from "@/components/shared/data-table";

const statusOptions = [
  { label: "Activo", value: "active" },
  { label: "Inactivo", value: "inactive" },
];

<DataTableFacetedFilter
  column={table.getColumn("status")}
  title="Estado"
  options={statusOptions}
/>
```

## Estructura Recomendada

### Componentes Compartidos (aquí)
- `data-table.tsx`
- `data-table-column-header.tsx`
- `data-table-pagination.tsx`
- `data-table-view-options.tsx`
- `data-table-faceted-filter.tsx`

### Componentes Específicos por Feature
Cada feature (contacts, teams, etc.) debe tener:
- `columns.tsx` - Definición de columnas específicas
- `data-table-toolbar.tsx` - Toolbar con búsqueda y filtros específicos
- `data-table-row-actions.tsx` - Acciones específicas por fila
- Diálogos CRUD específicos (NewXDialog, EditXDialog, DeleteXDialog)
- Formularios específicos (XForm)

## Ejemplo Completo

```tsx
// teams/page.tsx
import { DataTable } from "@/components/shared/data-table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { columns } from "./components/columns";

export default function TeamsPage() {
  const data = [...]; // tus datos
  
  return (
    <DataTable 
      data={data} 
      columns={columns} 
      toolbar={DataTableToolbar}
      emptyMessage="No hay miembros en el equipo" 
    />
  );
}

// teams/components/data-table-toolbar.tsx
import { DataTableViewOptions, DataTableFacetedFilter } from "@/components/shared/data-table";

export function DataTableToolbar({ table }) {
  return (
    <div className="flex items-center justify-between">
      <Input placeholder="Buscar..." />
      <DataTableFacetedFilter column={table.getColumn("role")} title="Rol" options={[...]} />
      <DataTableViewOptions table={table} />
    </div>
  );
}

// teams/components/columns.tsx
import { DataTableColumnHeader } from "@/components/shared/data-table";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  // ... más columnas
];
```

## Notas
- **NO duplicar código**: Siempre usar estos componentes compartidos
- Personalizar comportamiento a través de props, no copiando archivos
- Cada feature solo debe tener sus componentes específicos
