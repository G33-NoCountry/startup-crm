"use client"

import { useState } from "react"
import { MessageSquare, Mail, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function IntegrationsTab() {
    const [whatsappConnected, setWhatsappConnected] = useState(false)
    const [brevoConnected, setBrevoConnected] = useState(true)

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Gestión de integraciones</h3>
            <p className="mb-6 text-sm text-muted-foreground">
                Conecta y configura tus servicios de mensajería y email marketing
            </p>

            <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-[#25D366]/10">
                                <MessageSquare className="size-6 text-[#25D366]" />
                            </div>
                            <div>
                                <h4 className="font-semibold">WhatsApp Business</h4>
                                <p className="text-sm text-muted-foreground">
                                    Gestiona conversaciones con clientes
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {whatsappConnected ? (
                                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                    <Check className="size-3" />
                                    Conectado
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    <X className="size-3" />
                                    Desconectado
                                </div>
                            )}
                        </div>
                    </div>

                    {whatsappConnected ? (
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp-number">Número de teléfono</Label>
                                    <Input
                                        id="whatsapp-number"
                                        defaultValue="+54 351 990 1132"
                                        className="bg-background"
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp-name">Nombre del negocio</Label>
                                    <Input
                                        id="whatsapp-name"
                                        defaultValue="Mi Empresa SRL"
                                        className="bg-background"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                                <Input
                                    id="whatsapp-webhook"
                                    defaultValue="https://api.miempresa.com/webhook/whatsapp"
                                    className="bg-background"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setWhatsappConnected(false)}
                                >
                                    Desconectar
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#6366f1]"
                                >
                                    Probar conexión
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Conecta tu cuenta de WhatsApp Business para enviar y recibir mensajes
                                directamente desde el CRM.
                            </p>
                            <Button
                                className="bg-[#25D366] hover:bg-[#25D366]/90"
                                onClick={() => setWhatsappConnected(true)}
                            >
                                <MessageSquare className="mr-2 size-4" />
                                Conectar WhatsApp
                            </Button>
                        </div>
                    )}
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-[#0B996E]/10">
                                <Mail className="size-6 text-[#0B996E]" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Brevo (Sendinblue)</h4>
                                <p className="text-sm text-muted-foreground">
                                    Automatiza campañas de email marketing
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {brevoConnected ? (
                                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                    <Check className="size-3" />
                                    Conectado
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    <X className="size-3" />
                                    Desconectado
                                </div>
                            )}
                        </div>
                    </div>

                    {brevoConnected ? (
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="brevo-api-key">API Key</Label>
                                    <Input
                                        id="brevo-api-key"
                                        type="password"
                                        defaultValue="xkeysib-••••••••••••••••"
                                        className="bg-background"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brevo-sender">Email del remitente</Label>
                                    <Input
                                        id="brevo-sender"
                                        type="email"
                                        defaultValue="contacto@miempresa.com"
                                        className="bg-background"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="brevo-sender-name">Nombre del remitente</Label>
                                    <Input
                                        id="brevo-sender-name"
                                        defaultValue="Mi Empresa"
                                        className="bg-background"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brevo-list">Lista de contactos</Label>
                                    <Select defaultValue="main">
                                        <SelectTrigger id="brevo-list" className="bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="main">Lista Principal</SelectItem>
                                            <SelectItem value="leads">Leads</SelectItem>
                                            <SelectItem value="customers">Clientes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBrevoConnected(false)}
                                >
                                    Desconectar
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#6366f1]"
                                >
                                    Enviar email de prueba
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Conecta tu cuenta de Brevo para enviar campañas de email y automatizar
                                la comunicación con tus contactos.
                            </p>
                            <Button
                                className="bg-[#0B996E] hover:bg-[#0B996E]/90"
                                onClick={() => setBrevoConnected(true)}
                            >
                                <Mail className="mr-2 size-4" />
                                Conectar Brevo
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
