"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { dealService, contactsApi } from "@/lib/api";
import type { CreateDealDto, DealStage, DealPriority } from "@/types/deal.types";
import type { Contact } from "@/lib/api/contactService";
import { Loader2 } from "lucide-react";

interface NewDealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const STAGES: { value: DealStage; label: string }[] = [
  { value: "lead", label: "Prospección" },
  { value: "qualified", label: "Calificación" },
  { value: "proposal", label: "Propuesta" },
  { value: "negotiation", label: "Negociación" },
  { value: "closed_won", label: "Cierre" },
];

const PRIORITIES: { value: DealPriority; label: string }[] = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
];

export function NewDealDialog({ open, onOpenChange, onSuccess }: NewDealDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  
  const [formData, setFormData] = useState<CreateDealDto>({
    title: "",
    description: "",
    value: 0,
    currency: "USD",
    stage: "proposal",
    priority: "high",
    contact_id: "",
    expected_close_date: "",
  });

  useEffect(() => {
    if (open) {
      loadContacts();
    }
  }, [open]);

  const loadContacts = async () => {
    try {
      setLoadingContacts(true);
      const response = await contactsApi.getContacts();
      setContacts(response.items);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
      toast.error("Error al cargar contactos");
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("El título es requerido");
      return;
    }

    if (!formData.contact_id) {
      toast.error("Debes seleccionar un contacto");
      return;
    }

    if (formData.value <= 0) {
      toast.error("La ganancia debe ser mayor a 0");
      return;
    }

    try {
      setIsLoading(true);
      await dealService.create(formData);
      toast.success("Oportunidad creada correctamente");
      onSuccess?.();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error al crear oportunidad:", error);
      toast.error(error instanceof Error ? error.message : "Error al crear oportunidad");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      value: 0,
      currency: "USD",
      stage: "proposal",
      priority: "high",
      contact_id: "",
      expected_close_date: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Nueva oportunidad</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Introduce los datos de la nueva oportunidad
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Título de la oportunidad</Label>
              <Input
                id="title"
                placeholder="Renovación Licencias"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Ganancia</Label>
              <Input
                id="value"
                type="number"
                placeholder="80000"
                value={formData.value || ""}
                onChange={(e) =>
                  setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Etapa del pipeline</Label>
              <Select
                value={formData.stage}
                onValueChange={(value) =>
                  setFormData({ ...formData, stage: value as DealStage })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una etapa" />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Probabilidad de venta</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value as DealPriority })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona prioridad" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected_close_date">Fecha de vencimiento</Label>
              <Input
                id="expected_close_date"
                type="date"
                value={formData.expected_close_date}
                onChange={(e) =>
                  setFormData({ ...formData, expected_close_date: e.target.value })
                }
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="contact_id">Contacto</Label>
              <Select
                value={formData.contact_id}
                onValueChange={(value) => setFormData({ ...formData, contact_id: value })}
                disabled={loadingContacts}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingContacts ? "Cargando..." : "Buscar contacto"} />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={String(contact.id)}>
                      {contact.full_name} ({contact.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea
                id="description"
                placeholder="Escribe los detalles..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear oportunidad
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
