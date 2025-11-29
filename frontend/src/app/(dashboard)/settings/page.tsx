"use client"

import { useState } from "react"
import { User, Palette, Link2, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProfileTab } from "./components/profile-tab"
import { AppearanceTab } from "./components/appearance-tab"
import { IntegrationsTab } from "./components/integrations-tab"
import { SecurityTab } from "./components/security-tab"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("perfil")

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Configuraciones</CardTitle>
                                <CardDescription className="mt-1">
                                    Administra las preferencias de tu cuenta y sistema
                                </CardDescription>
                            </div>
                            <Button className="bg-[#1a1d29] hover:bg-[#1a1d29]/90">
                                Guardar cambios
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="mb-6 w-full justify-center bg-transparent p-0">
                                <TabsTrigger
                                    value="perfil"
                                    className="gap-2 rounded-md data-[state=active]:bg-[#1a1d29] data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                                >
                                    <User className="size-4" />
                                    Perfil
                                </TabsTrigger>
                                <TabsTrigger
                                    value="apariencia"
                                    className="gap-2 rounded-md data-[state=active]:bg-[#1a1d29] data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                                >
                                    <Palette className="size-4" />
                                    Apariencia
                                </TabsTrigger>
                                <TabsTrigger
                                    value="integraciones"
                                    className="gap-2 rounded-md data-[state=active]:bg-[#1a1d29] data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                                >
                                    <Link2 className="size-4" />
                                    Integraciones
                                </TabsTrigger>
                                <TabsTrigger
                                    value="seguridad"
                                    className="gap-2 rounded-md data-[state=active]:bg-[#1a1d29] data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                                >
                                    <Shield className="size-4" />
                                    Seguridad
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="perfil" className="space-y-6">
                                <ProfileTab />
                            </TabsContent>

                            <TabsContent value="apariencia" className="space-y-6">
                                <AppearanceTab />
                            </TabsContent>

                            <TabsContent value="integraciones" className="space-y-6">
                                <IntegrationsTab />
                            </TabsContent>

                            <TabsContent value="seguridad">
                                <SecurityTab />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
