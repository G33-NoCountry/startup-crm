import * as React from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ComboboxOption {
  value: string // ID
  label: string // Texto a mostrar
}

interface ComboboxSelectProps {
  options: ComboboxOption[]
  value: string | undefined // ID seleccionado (string ID o undefined para 'Ninguno')
  onChange: (value: string | undefined) => void
  placeholder: string
  loading: boolean
  disabled?: boolean
}

export function ComboboxSelect({
  options,
  value,
  onChange,
  placeholder,
  loading,
  disabled = false,
}: ComboboxSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (currentLabel: string) => {
    // Buscar el valor (ID) de la opción seleccionada por su label
    const selectedOption = options.find(o => o.label.toLowerCase() === currentLabel.toLowerCase());
    
    // Si la opción seleccionada coincide con el valor actual, o si es la opción de limpieza, pasamos undefined
    const newValue = selectedOption?.value;

    onChange(newValue);
    setOpen(false);
  }

  if (loading) {
    return (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={false}
        className="w-full justify-between text-muted-foreground"
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Cargando {placeholder}...
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedOption
            ? selectedOption.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[300px] overflow-y-auto p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${placeholder}...`} />
          <CommandEmpty>No se encontró {placeholder}.</CommandEmpty>
          <CommandGroup>
            {/* Opción para borrar la selección (valor vacío) */}
            <CommandItem 
                onSelect={() => {
                  onChange(undefined);
                  setOpen(false);
                }} 
                className={cn(!value && "bg-accent text-accent-foreground")}
            >
                <Check
                    className={cn(
                        'mr-2 h-4 w-4',
                        !value ? 'opacity-100' : 'opacity-0'
                    )}
                />
                Ninguno
            </CommandItem>

            {options.map((option) => (
              <CommandItem
                key={option.value}
                // Usamos el label como valor de búsqueda en CommandItem
                value={option.label} 
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}