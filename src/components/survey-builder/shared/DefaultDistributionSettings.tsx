import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  Users,
} from "lucide-react";

interface DefaultDistributionSettingsProps {
  distribution: {
    id: string;
    name: string;
  };
  settings: {
    triggerDelay: string;
    displayDuration: string;
    targetAudience: string;
  };
  onSettingsChange: (distributionId: string, key: string, value: string) => void;
}

const DefaultDistributionSettings: React.FC<DefaultDistributionSettingsProps> = ({
  distribution,
  settings,
  onSettingsChange,
}) => {
  return (
    <>
      <div className="bg-white/50 rounded-lg p-4 space-y-4">
        <h5 className="font-medium text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-survey-warning" />
          Timing & Display Settings
        </h5>

        <div className="grid grid-cols-2 gap-4">
          {distribution.id !== "email-campaign" && (
            <>
              <div className="space-y-2">
                <Label className="text-xs">
                  Trigger Delay (seconds)
                </Label>
                <Input
                  type="number"
                  value={settings.triggerDelay}
                  onChange={(e) =>
                    onSettingsChange(
                      distribution.id,
                      "triggerDelay",
                      e.target.value
                    )
                  }
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">
                  Display Duration (seconds)
                </Label>
                <Input
                  type="number"
                  value={settings.displayDuration}
                  onChange={(e) =>
                    onSettingsChange(
                      distribution.id,
                      "displayDuration",
                      e.target.value
                    )
                  }
                  min="5"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white/50 rounded-lg p-4 space-y-4">
        <h5 className="font-medium text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary-brand" />
          Target Audience
        </h5>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">
              Customer Segment
            </Label>
            <Select
              value={settings.targetAudience}
              onValueChange={(value) =>
                onSettingsChange(
                  distribution.id,
                  "targetAudience",
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-customers">
                  All Customers
                </SelectItem>
                <SelectItem value="new-customers">
                  New Customers
                </SelectItem>
                <SelectItem value="returning-customers">
                  Returning Customers
                </SelectItem>
                <SelectItem value="vip-customers">
                  VIP Customers
                </SelectItem>
                <SelectItem value="specific-products">
                  Specific Product Buyers
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">
                Min. Order Value
              </Label>
              <Input
                type="number"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">
                Geographic Location
              </Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Locations
                  </SelectItem>
                  <SelectItem value="us">
                    United States
                  </SelectItem>
                  <SelectItem value="ca">
                    Canada
                  </SelectItem>
                  <SelectItem value="uk">
                    United Kingdom
                  </SelectItem>
                  <SelectItem value="eu">
                    European Union
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDistributionSettings;