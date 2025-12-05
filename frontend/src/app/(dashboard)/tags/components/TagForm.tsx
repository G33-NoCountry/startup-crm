"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { tagFormSchema, type TagFormData } from "@/lib/validations/tag.schema";
import { colorOptions } from "@/lib/constants/tag-colors";

interface TagFormProps {
  defaultValues?: Partial<TagFormData>;
  onSubmit: (data: TagFormData) => Promise<void>;
  onCancel?: () => void;
  isPending?: boolean;
  mode: "create" | "edit";
}

export function TagForm({ defaultValues, onSubmit, onCancel, isPending = false, mode }: TagFormProps) {
  const form = useForm<TagFormData>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      title: "",
      color: "gray",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la etiqueta</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la etiqueta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Color de la etiqueta</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex flex-wrap gap-3"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                {colorOptions.map((colorOption) => (
                  <FormItem 
                    key={colorOption.value} 
                    className="flex flex-col items-center space-x-0 space-y-1"
                  >
                    <RadioGroupItem
                      value={colorOption.value}
                      id={`color-${colorOption.value}`}
                      className={cn(
                        // Estilo base del círculo
                        "size-6 border-none shadow-none cursor-pointer rounded-sm p-0.5", 
                        "transition-all duration-150",
                        colorOption.bgClass, // Color de fondo estático
                        // Estilo al seleccionar: Usar un anillo para indicar selección
                        `data-[state=checked]:ring-2 data-[state=checked]:ring-offset-2 ${colorOption.ringClass}`
                      )}
                    />
                    <FormLabel 
                      htmlFor={`color-${colorOption.value}`}
                      className="font-normal cursor-pointer text-xs"
                    >
                      {colorOption.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Crear etiqueta" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
