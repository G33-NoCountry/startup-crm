"use client"

import { useState } from "react"
import { Moon, Sun, Monitor, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const PRESET_COLORS = [
    { color: "#f97316", name: "Naranja" },
    { color: "#ef4444", name: "Rojo" },
    { color: "#ec4899", name: "Rosa" },
    { color: "#a855f7", name: "Púrpura" },
    { color: "#6366f1", name: "Índigo" },
    { color: "#3b82f6", name: "Azul" },
    { color: "#0ea5e9", name: "Cian" },
    { color: "#14b8a6", name: "Verde azulado" },
    { color: "#10b981", name: "Verde" },
    { color: "#84cc16", name: "Lima" },
    { color: "#eab308", name: "Amarillo" },
    { color: "#f59e0b", name: "Ámbar" },
    { color: "#64748b", name: "Gris" },
    { color: "#475569", name: "Gris oscuro" },
    { color: "#1e293b", name: "Pizarra" },
    { color: "#0f172a", name: "Negro" },
]

export function AppearanceTab() {
    const [selectedColor, setSelectedColor] = useState("#f97316")
    const [theme, setTheme] = useState("system")
    const [compactMode, setCompactMode] = useState(false)

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Personalización de apariencia</h3>
            <p className="mb-6 text-sm text-muted-foreground">
                Personaliza la interfaz según tus preferencias visuales
            </p>

            <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4">
                        <h4 className="font-semibold">Color del perfil</h4>
                        <p className="text-sm text-muted-foreground">
                            Selecciona el color de tu avatar y elementos personales
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Avatar 
                                className="size-16 text-white transition-colors" 
                                style={{ backgroundColor: selectedColor }}
                            >
                                <AvatarFallback 
                                    className="text-xl font-semibold text-white"
                                    style={{ backgroundColor: selectedColor }}
                                >
                                    MV
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Label htmlFor="color-picker" className="text-sm font-medium">
                                    Color seleccionado: {selectedColor.toUpperCase()}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Vista previa de tu avatar con el color elegido
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>Colores predefinidos</Label>
                            <div className="grid grid-cols-8 gap-3">
                                {PRESET_COLORS.map(({ color, name }) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`size-10 rounded-lg transition-all hover:scale-110 ${
                                            selectedColor === color
                                                ? "ring-2 ring-offset-2 ring-offset-background ring-primary"
                                                : "hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-muted-foreground/50"
                                        }`}
                                        style={{ backgroundColor: color }}
                                        title={name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="custom-color">Color personalizado</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="custom-color"
                                    type="color"
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="h-10 w-20 cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="flex-1 bg-background"
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4">
                        <h4 className="font-semibold">Tema de la interfaz</h4>
                        <p className="text-sm text-muted-foreground">
                            Elige entre modo claro, oscuro o automático
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <button
                            onClick={() => setTheme("light")}
                            className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                                theme === "light"
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                            }`}
                        >
                            <div className="flex size-12 items-center justify-center rounded-full bg-yellow-500/10">
                                <Sun className="size-6 text-yellow-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Claro</p>
                                <p className="text-xs text-muted-foreground">
                                    Interfaz con fondo blanco
                                </p>
                            </div>
                            {theme === "light" && (
                                <Check className="size-4 text-primary" />
                            )}
                        </button>

                        <button
                            onClick={() => setTheme("dark")}
                            className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                                theme === "dark"
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                            }`}
                        >
                            <div className="flex size-12 items-center justify-center rounded-full bg-slate-500/10">
                                <Moon className="size-6 text-slate-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Oscuro</p>
                                <p className="text-xs text-muted-foreground">
                                    Interfaz con fondo oscuro
                                </p>
                            </div>
                            {theme === "dark" && (
                                <Check className="size-4 text-primary" />
                            )}
                        </button>

                        <button
                            onClick={() => setTheme("system")}
                            className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                                theme === "system"
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                            }`}
                        >
                            <div className="flex size-12 items-center justify-center rounded-full bg-blue-500/10">
                                <Monitor className="size-6 text-blue-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Sistema</p>
                                <p className="text-xs text-muted-foreground">
                                    Según preferencias del SO
                                </p>
                            </div>
                            {theme === "system" && (
                                <Check className="size-4 text-primary" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4">
                        <h4 className="font-semibold">Densidad de la interfaz</h4>
                        <p className="text-sm text-muted-foreground">
                            Ajusta el espaciado y tamaño de los elementos
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <button
                            onClick={() => setCompactMode(false)}
                            className={`flex flex-col gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                                !compactMode
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Cómodo</p>
                                    <p className="text-xs text-muted-foreground">
                                        Más espacio entre elementos
                                    </p>
                                </div>
                                {!compactMode && (
                                    <Check className="size-4 text-primary" />
                                )}
                            </div>
                            <div className="space-y-2 rounded border bg-background p-3">
                                <div className="h-3 w-full rounded bg-muted" />
                                <div className="h-3 w-3/4 rounded bg-muted" />
                            </div>
                        </button>

                        <button
                            onClick={() => setCompactMode(true)}
                            className={`flex flex-col gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                                compactMode
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Compacto</p>
                                    <p className="text-xs text-muted-foreground">
                                        Menos espacio, más contenido
                                    </p>
                                </div>
                                {compactMode && (
                                    <Check className="size-4 text-primary" />
                                )}
                            </div>
                            <div className="space-y-1 rounded border bg-background p-2">
                                <div className="h-2 w-full rounded bg-muted" />
                                <div className="h-2 w-3/4 rounded bg-muted" />
                                <div className="h-2 w-full rounded bg-muted" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <div className="mb-4">
                        <h4 className="font-semibold">Opciones adicionales</h4>
                        <p className="text-sm text-muted-foreground">
                            Personaliza otros aspectos visuales
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="font-size">Tamaño de fuente</Label>
                            <Select defaultValue="medium">
                                <SelectTrigger id="font-size" className="bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="small">Pequeña</SelectItem>
                                    <SelectItem value="medium">Mediana</SelectItem>
                                    <SelectItem value="large">Grande</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sidebar-position">Posición del menú</Label>
                            <Select defaultValue="left">
                                <SelectTrigger id="sidebar-position" className="bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="left">Izquierda</SelectItem>
                                    <SelectItem value="right">Derecha</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="animation">Animaciones</Label>
                            <Select defaultValue="normal">
                                <SelectTrigger id="animation" className="bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Desactivadas</SelectItem>
                                    <SelectItem value="reduced">Reducidas</SelectItem>
                                    <SelectItem value="normal">Normales</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="border-radius">Bordes redondeados</Label>
                            <Select defaultValue="medium">
                                <SelectTrigger id="border-radius" className="bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Sin redondeo</SelectItem>
                                    <SelectItem value="small">Pequeño</SelectItem>
                                    <SelectItem value="medium">Mediano</SelectItem>
                                    <SelectItem value="large">Grande</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
