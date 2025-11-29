"use client"

import { useState } from "react"
import { Key, Shield, UserCog, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SecurityTab() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [sessionTimeout, setSessionTimeout] = useState("30")

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Configuración de seguridad</h3>
            <p className="mb-6 text-sm text-muted-foreground">
                Protege tu cuenta y gestiona el acceso al sistema
            </p>

            <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                            <Key className="size-6 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Cambiar contraseña</h4>
                            <p className="text-sm text-muted-foreground">
                                Actualiza tu contraseña regularmente para mayor seguridad
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Contraseña actual</Label>
                            <Input
                                id="current-password"
                                type="password"
                                placeholder="Ingresa tu contraseña actual"
                                className="bg-background"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nueva contraseña</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    placeholder="Mínimo 8 caracteres"
                                    className="bg-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Repite la nueva contraseña"
                                    className="bg-background"
                                />
                            </div>
                        </div>

                        <div className="rounded-md bg-muted/50 p-3">
                            <p className="text-xs text-muted-foreground">
                                <strong>Requisitos:</strong> Mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos
                            </p>
                        </div>

                        <Button className="bg-[#1a1d29] hover:bg-[#1a1d29]/90">
                            Actualizar contraseña
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
                                <Shield className="size-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Autenticación de dos factores (2FA)</h4>
                                <p className="text-sm text-muted-foreground">
                                    Agrega una capa extra de seguridad a tu cuenta
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {twoFactorEnabled ? (
                                <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                    Activado
                                </div>
                            ) : (
                                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    Desactivado
                                </div>
                            )}
                        </div>
                    </div>

                    {twoFactorEnabled ? (
                        <div className="space-y-4">
                            <div className="rounded-md border bg-background p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Shield className="size-4 text-green-600" />
                                    <p className="text-sm font-medium">2FA está activo</p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Tu cuenta está protegida con autenticación de dos factores. Se te pedirá un código
                                    cada vez que inicies sesión desde un nuevo dispositivo.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Método de verificación</Label>
                                <Select defaultValue="app">
                                    <SelectTrigger className="bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="app">Aplicación de autenticación</SelectItem>
                                        <SelectItem value="sms">SMS al teléfono</SelectItem>
                                        <SelectItem value="email">Correo electrónico</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setTwoFactorEnabled(false)}
                                >
                                    Desactivar 2FA
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#6366f1]"
                                >
                                    Ver códigos de respaldo
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                La autenticación de dos factores agrega una capa adicional de seguridad requiriendo
                                un código de verificación además de tu contraseña.
                            </p>
                            <Button
                                className="bg-green-600 hover:bg-green-600/90"
                                onClick={() => setTwoFactorEnabled(true)}
                            >
                                <Shield className="mr-2 size-4" />
                                Activar 2FA
                            </Button>
                        </div>
                    )}
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
                            <Clock className="size-6 text-purple-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Gestión de sesiones</h4>
                            <p className="text-sm text-muted-foreground">
                                Controla el tiempo de inactividad y sesiones activas
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="session-timeout">Tiempo de inactividad antes de cerrar sesión</Label>
                            <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                                <SelectTrigger id="session-timeout" className="bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 minutos</SelectItem>
                                    <SelectItem value="30">30 minutos</SelectItem>
                                    <SelectItem value="60">1 hora</SelectItem>
                                    <SelectItem value="120">2 horas</SelectItem>
                                    <SelectItem value="never">Nunca</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border bg-background p-4">
                            <h5 className="mb-3 text-sm font-medium">Sesiones activas</h5>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                                    <div>
                                        <p className="text-sm font-medium">Windows - Chrome</p>
                                        <p className="text-xs text-muted-foreground">
                                            Buenos Aires, Argentina • Sesión actual
                                        </p>
                                    </div>
                                    <span className="text-xs text-green-600">Activa ahora</span>
                                </div>
                                <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                                    <div>
                                        <p className="text-sm font-medium">Android - Chrome Mobile</p>
                                        <p className="text-xs text-muted-foreground">
                                            Buenos Aires, Argentina • Hace 2 horas
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs text-destructive">
                                        Cerrar
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full">
                            Cerrar todas las demás sesiones
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
                            <UserCog className="size-6 text-orange-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Permisos y roles</h4>
                            <p className="text-sm text-muted-foreground">
                                Gestiona los permisos de acceso de tu cuenta
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-md border bg-background p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Rol actual</p>
                                    <p className="text-xs text-muted-foreground">Define tus permisos en el sistema</p>
                                </div>
                                <span className="rounded-full bg-[#1a1d29] px-3 py-1 text-xs font-medium text-white">
                                    Administrador del sistema
                                </span>
                            </div>
                            <div className="space-y-2 text-xs text-muted-foreground">
                                <p>✓ Acceso completo a todas las funcionalidades</p>
                                <p>✓ Gestión de usuarios y permisos</p>
                                <p>✓ Configuración del sistema</p>
                                <p>✓ Visualización de métricas y reportes</p>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full">
                            Ver todos los permisos
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-destructive/10">
                            <AlertTriangle className="size-6 text-destructive" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-destructive">Zona de peligro</h4>
                            <p className="text-sm text-muted-foreground">
                                Acciones irreversibles que afectan tu cuenta
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md border border-destructive/20 bg-background p-4">
                            <div>
                                <p className="text-sm font-medium">Cerrar sesión en todos los dispositivos</p>
                                <p className="text-xs text-muted-foreground">
                                    Cierra todas las sesiones activas excepto la actual
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                                Cerrar todas
                            </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-md border border-destructive/20 bg-background p-4">
                            <div>
                                <p className="text-sm font-medium">Desactivar cuenta</p>
                                <p className="text-xs text-muted-foreground">
                                    Desactiva temporalmente tu cuenta. Podrás reactivarla más tarde
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                                Desactivar
                            </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-md border border-destructive/20 bg-background p-4">
                            <div>
                                <p className="text-sm font-medium">Eliminar cuenta permanentemente</p>
                                <p className="text-xs text-muted-foreground">
                                    Esta acción no se puede deshacer. Todos tus datos serán eliminados
                                </p>
                            </div>
                            <Button variant="destructive" size="sm">
                                Eliminar cuenta
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
