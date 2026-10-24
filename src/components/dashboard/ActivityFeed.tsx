import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: "governance" | "allocation" | "compliance" | "system";
  status?: "success" | "pending" | "failed";
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  description?: string;
  className?: string;
}

export function ActivityFeed({
  items,
  title = "Recent System Activity",
  description = "Real-time audit log from BEAST System 3.0 governance engines.",
  className = "",
}: ActivityFeedProps) {
  const getCategoryBadgeVariant = (category: ActivityItem["category"]) => {
    switch (category) {
      case "governance":
        return "default";
      case "allocation":
        return "success";
      case "compliance":
        return "secondary";
      case "system":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No recent activity recorded in the current epoch.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {item.title}
                    </span>
                    <Badge variant={getCategoryBadgeVariant(item.category)}>
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap pl-4">
                  {item.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
