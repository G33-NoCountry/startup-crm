"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RecentConversation } from "@/types/dashboard";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface RecentConversationsProps {
    conversations: RecentConversation[];
    onSeeMore?: () => void;
}

export function RecentConversations({
    conversations,
    onSeeMore,
}: RecentConversationsProps) {
    const [channel, setChannel] = useState<"all" | "whatsapp" | "mail">("all");

    const filteredConversations = conversations.filter((conv) => {
        if (channel === "all") return true;
        return conv.channel === channel;
    });

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-orange-500",
            "bg-pink-500",
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                        Conversaciones recientes
                    </CardTitle>
                    <Button
                        variant="link"
                        className="h-auto p-0 text-sm text-primary"
                        onClick={onSeeMore}
                    >
                        Ver más
                    </Button>
                </div>
                <Tabs
                    value={channel}
                    onValueChange={(value) => setChannel(value as "all" | "whatsapp" | "mail")}
                    className="mt-4"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="text-xs">
                            Todas
                        </TabsTrigger>
                        <TabsTrigger value="whatsapp" className="text-xs">
                            Whatsapp
                        </TabsTrigger>
                        <TabsTrigger value="mail" className="text-xs">
                            Mail
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredConversations.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                        No hay conversaciones recientes
                    </p>
                ) : (
                    filteredConversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50 cursor-pointer group"
                        >
                            <Avatar>
                                <AvatarFallback
                                    className={getAvatarColor(conversation.contactName)}
                                >
                                    {getInitials(conversation.contactName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1 overflow-hidden">
                                <p className="text-sm font-medium leading-none">
                                    {conversation.contactName}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {conversation.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    - hace {conversation.timestamp}
                                </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
