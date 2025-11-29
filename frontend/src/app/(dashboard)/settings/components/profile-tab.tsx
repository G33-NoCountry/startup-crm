"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ProfileTab() {
    const [emailError, setEmailError] = useState(false)

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Información del Perfil</h3>

            <div className="mb-6 flex items-center gap-4">
                <Avatar className="size-16 bg-[#f97316] text-white">
                    <AvatarFallback className="bg-[#f97316] text-xl font-semibold text-white">
                        MV
                    </AvatarFallback>
                </Avatar>
                <div>
                    <button className="text-sm font-medium text-[#6366f1] hover:underline">
                        Editar avatar
                    </button>
                    <p className="text-xs text-muted-foreground">
                        Ajusta tu avatar según tus preferencias
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                        id="nombre"
                        defaultValue="Marisa Villanieva"
                        className="bg-background"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="idioma">Idioma</Label>
                    <Select defaultValue="es">
                        <SelectTrigger id="idioma" className="bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className={emailError ? "text-destructive" : ""}>
                        Correo electrónico
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        defaultValue="marisa@gmail.com"
                        className={emailError ? "border-destructive" : "bg-background"}
                        onChange={(e) => {
                            setEmailError(e.target.value === "marisa@gmail.com")
                        }}
                    />
                    {emailError && (
                        <p className="text-xs text-destructive">
                            Ya existe una cuenta con este correo.
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zona">Zona horaria</Label>
                    <Select defaultValue="gmt1">
                        <SelectTrigger id="zona" className="bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gmt1">GMT+1 Madrid, España</SelectItem>
                            <SelectItem value="gmt-3">GMT-3 Buenos Aires, Argentina</SelectItem>
                            <SelectItem value="gmt-5">GMT-5 Ciudad de México, México</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                        id="telefono"
                        defaultValue="+54 351 990 1132"
                        className="bg-background"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fecha">Formato de fecha</Label>
                    <Select defaultValue="ddmmyyyy">
                        <SelectTrigger id="fecha" className="bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyymmdd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo del equipo</Label>
                    <Select defaultValue="admin">
                        <SelectTrigger id="cargo" className="bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Administrador del sistema</SelectItem>
                            <SelectItem value="manager">Gerente</SelectItem>
                            <SelectItem value="user">Usuario</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="moneda">Moneda</Label>
                    <Select defaultValue="ars">
                        <SelectTrigger id="moneda" className="bg-background">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ars">PESOS ARG ($)</SelectItem>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
