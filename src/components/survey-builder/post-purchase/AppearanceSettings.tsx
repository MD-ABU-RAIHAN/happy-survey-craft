import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette } from "lucide-react";

interface AppearanceSettings {
  primaryColor: string;
  backgroundColor: string;
  borderRadius: number;
  shadow: boolean;
}

interface AppearanceSettingsProps {
  settings: AppearanceSettings;
  onSettingsChange: (key: string, value: any) => void;
}

const AppearanceSettingsComponent: React.FC<AppearanceSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <h5 className="font-semibold flex items-center gap-2">
        <Palette className="w-5 h-5 text-survey-success" />
        Appearance
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm">Primary Color</Label>
          <Input
            type="color"
            value={settings.primaryColor}
            onChange={(e) =>
              onSettingsChange("appearance.primaryColor", e.target.value)
            }
            className="w-16"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Background Color</Label>
          <Input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              onSettingsChange("appearance.backgroundColor", e.target.value)
            }
            className="w-16"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Border Radius</Label>
          <Input
            type="number"
            value={settings.borderRadius}
            onChange={(e) =>
              onSettingsChange(
                "appearance.borderRadius",
                parseInt(e.target.value)
              )
            }
            min={0}
            max={20}
          />
        </div>
        <div className="space-y-2 flex items-center">
          <Switch
            checked={settings.shadow}
            onCheckedChange={(checked) =>
              onSettingsChange("appearance.shadow", checked)
            }
          />
          <Label className="text-sm ml-2">Drop Shadow</Label>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettingsComponent;
