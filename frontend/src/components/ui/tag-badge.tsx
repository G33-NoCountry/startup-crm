import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  title: string;
  color: string;
  className?: string;
}

export function TagBadge({ title, color, className }: TagBadgeProps) {
  return (
    <Badge
      className={cn(
        "font-medium",
        color,
        className
      )}
    >
      {title}
    </Badge>
  );
}