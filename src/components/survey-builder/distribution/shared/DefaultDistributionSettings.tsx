import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import UserTargeting from "./UserTargeting";

interface UserTargetingSettings {
  type: "all-users" | "segment-users";
  userTag: {
    enabled: boolean;
    selectedTags: string[];
  };
  newCustomer: boolean;
  returningCustomer: boolean;
  productPurchase: {
    enabled: boolean;
    selectedProducts: string[];
  };
}

interface DefaultDistributionSettingsProps {
  distribution: {
    id: string;
    name: string;
  };
  settings: {
    triggerDelay: string;
    displayDuration: string;
    userTargeting: UserTargetingSettings;
  };
  onSettingsChange: (distributionId: string, key: string, value: string | boolean | string[]) => void;
}

const DefaultDistributionSettings: React.FC<DefaultDistributionSettingsProps> = ({
  distribution,
  settings,
  onSettingsChange,
}) => {
  const handleUserTargetingChange = (key: string, value: string | boolean | string[]) => {
    onSettingsChange(distribution.id, key, value);
  };

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

      <UserTargeting
        settings={settings.userTargeting}
        onSettingsChange={handleUserTargetingChange}
        distributionId={distribution.id}
      />
    </>
  );
};

export default DefaultDistributionSettings;