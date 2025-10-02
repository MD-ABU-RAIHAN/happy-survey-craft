import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CustomSwitch } from "@/components/ui/custom-switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DistributionType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface DistributionItemProps {
  distribution: DistributionType;
  isEnabled: boolean;
  isCollapsed: boolean;
  onToggleEnabled: () => void;
  onToggleCollapsed: () => void;
  children?: React.ReactNode;
}

const DistributionItem: React.FC<DistributionItemProps> = ({
  distribution,
  isEnabled,
  isCollapsed,
  onToggleEnabled,
  onToggleCollapsed,
  children,
}) => {
  const IconComponent = distribution.icon;

  return (
    <Collapsible open={!isCollapsed} onOpenChange={onToggleCollapsed}>
      <Card
        className={`transition-all duration-300 border-2 ${
          isEnabled
            ? `${distribution.borderColor} shadow-lg`
            : "border-muted hover:border-muted-foreground/20"
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CollapsibleTrigger className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isEnabled ? distribution.bgColor : "bg-muted"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 ${
                    isEnabled ? distribution.color : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold flex items-center gap-2">
                  {distribution.name}
                  {isEnabled ? (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      Inactive
                    </Badge>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {distribution.description}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <CustomSwitch checked={isEnabled} onCheckedChange={onToggleEnabled} />
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <CardContent className="pt-0 space-y-6">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default DistributionItem;
