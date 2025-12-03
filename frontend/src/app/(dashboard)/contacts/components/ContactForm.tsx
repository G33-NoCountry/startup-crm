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
import { Loader2, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact.schema";

const AVAILABLE_TAGS = [
  { value: "cliente", label: "Cliente", color: "bg-green-400" },
  { value: "proveedor", label: "Proveedor", color: "bg-blue-400" },
  { value: "lead", label: "Lead", color: "bg-yellow-400" },
  { value: "vip", label: "VIP", color: "bg-purple-400" },
  { value: "inactivo", label: "Inactivo", color: "bg-gray-400" },
];

interface ContactFormProps {
  defaultValues?: Partial<ContactFormData & { tags: string[] }>;
  onSubmit: (data: ContactFormData & { tags?: string[] }) => Promise<void>;
  isPending?: boolean;
  mode: "create" | "edit";
}

export function ContactForm({ defaultValues, onSubmit, isPending = false, mode }: ContactFormProps) {
  const form = useForm<ContactFormData & { tags: string[] }>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      tags: [],
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="juan@empresa.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="+54 9 11 1234-5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags solo en modo edición */}
        {mode === "edit" && (
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiquetas</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const current = field.value || [];
                    if (current.includes(value)) {
                      field.onChange(current.filter((t: string) => t !== value));
                    } else {
                      field.onChange([...current, value]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona etiquetas..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AVAILABLE_TAGS.map((tag) => (
                      <SelectItem key={tag.value} value={tag.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                          {tag.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Mostrar tags seleccionadas */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value?.map((tagValue) => {
                    const tag = AVAILABLE_TAGS.find((t) => t.value === tagValue);
                    return tag ? (
                      <span
                        key={tag.value}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white ${tag.color}`}
                      >
                        <Tag className="h-3 w-3" />
                        {tag.label}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(field.value.filter((t: string) => t !== tag.value));
                          }}
                          className="ml-1 hover:opacity-70"
                        >
                          ×
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Crear contacto" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Form>
  );
}