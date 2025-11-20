"use client"
import RegisterForm from "@/components/features/auth/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full bg-[#FAFAFA] relative flex flex-col items-center justify-center p-4">

            <div className="absolute top-8 left-8 md:top-12 md:left-16 z-10">
                <div className="flex flex-col items-start gap-1">
                    <Image
                        src="/images/logo-start-light.svg"
                        alt="Logo Start CRM"
                        width={120}
                        height={50}
                        className="pb-1"
                        priority
                    />
                    <span className="h-1.5 w-12 bg-orange-500 rounded-full"></span>
                </div>
            </div>

            <div className="w-full max-w-md space-y-8 mt-10 md:mt-0">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Crea una cuenta gratuita
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base max-w-xs mx-auto">
                        ¡Comienza a gestionar tus ventas y clientes con nosotros!
                    </p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}