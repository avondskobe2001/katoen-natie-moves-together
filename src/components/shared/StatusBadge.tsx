import { Badge } from "@/components/ui/badge";
import type { ChallengeStatus } from "@/types";

const statusVariant: Record<ChallengeStatus, "success" | "default" | "secondary"> = {
  active: "success",
  upcoming: "default",
  completed: "secondary",
};

interface StatusBadgeProps {
  status: ChallengeStatus;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariant[status]}>
      {label ?? status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}