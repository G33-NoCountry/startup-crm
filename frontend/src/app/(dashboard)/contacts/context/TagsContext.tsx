"use client";

import { createContext, useContext, ReactNode } from "react";
import { Tag } from "@/lib/validations/tag.schema";

type TagsContextType = {
  tags: Tag[];
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export function TagsProvider({
    children,
    tags,
}: {
    children: ReactNode;
    tags: Tag[];
}) {
  return <TagsContext.Provider value={{ tags }}>{children}</TagsContext.Provider>;
}

export function useTags() {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTags must be used within a TagsProvider");
  }
  return context.tags;
}