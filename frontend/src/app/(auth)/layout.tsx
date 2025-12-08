"use client";

import { RouteGuard } from "@/components/shared/route-guard";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RouteGuard requireAuth={false}>
            {children}
        </RouteGuard>
    );
}
