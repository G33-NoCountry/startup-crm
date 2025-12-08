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
import { Loader2, Tag as TagIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact.schema";
import { tagColorClasses } from "@/lib/constants/tag-colors";
import { useTags } from "../context/TagsContext";

interface ContactFormProps {
  defaultValues?: Partial<ContactFormData & { tags: number[] }>;
  onSubmit: (data: ContactFormData & { tags?: number[] }) => Promise<void>;
  onCancel?: () => void;
  isPending?: boolean;
  mode: "create" | "edit";
}

export function ContactForm({ defaultValues, onSubmit, onCancel, isPending = false, mode }: ContactFormProps) {
  const availableTags = useTags();

  const form = useForm<ContactFormData & { tags: number[] }>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      ...defaultValues,
      tags: mode === "edit"
        ? defaultValues?.tags ?? [] // ya deberían venir como number[]
        : [],
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
                    const id = Number(value); // el value es el ID como string → lo convertimos
                    const current = field.value || [];

                    if (current.includes(id)) {
                      field.onChange(current.filter((t: number) => t !== id));
                    } else {
                      field.onChange([...current, id]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona etiquetas..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTags.map((tag) => (
                      <SelectItem key={tag.id} value={String(tag.id)}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${tagColorClasses[tag.color]}`} />
                          {tag.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Mostrar tags seleccionadas */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value?.map((tagId) => {
                    const tag = availableTags.find((t) => t.id === tagId);
                    if (!tag) return null;
                    return (
                      <span
                        key={tag.id}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${tagColorClasses[tag.color]}`}
                      >
                        <TagIcon className="h-3 w-3" />
                        {tag.title}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(field.value?.filter((t) => t !== tagId) || []);
                          }}
                          className="ml-1 hover:opacity-70"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Crear contacto" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Form>
  );
}