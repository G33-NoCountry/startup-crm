import LoginForm from "@/components/features/auth/LoginForm";
import Image from "next/image";
import { BarChart3, Users, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full lg:flex">
            <div className="hidden lg:flex w-1/2 bg-foreground p-12 flex-col justify-center text-white relative overflow-hidden">
                <div className="relative z-10 max-w-lg mx-auto">
                    <div className="mb-10">
                        <Image
                            src="/images/logo-start.svg"
                            alt="Logo Start CRM"
                            width={150}
                            height={50}
                            priority // imagen principal visible al cargar (LCP)
                        />
                    </div>

                    <h2 className="text-3xl font-semibold mb-4 leading-tight">
                        Bienvenido a tu CRM
                    </h2>
                    <p className="text-slate-400 mb-12 text-lg">
                        Gestioná tus clientes, seguí tus ventas y hacé crecer tu negocio con nosotros.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div>
                                <h3 className="font-medium text-white text-lg">Analítica avanzada</h3>
                                <p className="text-slate-400 text-sm">Supervisá el rendimiento en tiempo real.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div>
                                <h3 className="font-medium text-white text-lg">Colaboración en equipo</h3>
                                <p className="text-slate-400 text-sm">Trabajá en conjunto de manera fluida.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div>
                                <h3 className="font-medium text-white text-lg">Seguro y confiable</h3>
                                <p className="text-slate-400 text-sm">Tus datos están protegidos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    {/* <LoginForm /> */}
                </div>
            </div>
        </div>
    );
}