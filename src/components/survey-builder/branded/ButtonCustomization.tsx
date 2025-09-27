import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Type } from "lucide-react";

interface ButtonSettings {
  enabled: boolean;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  fontWeight: string;
  backgroundHoverColor: string;
  shadow: boolean;
}

interface ButtonCustomizationProps {
  settings: ButtonSettings;
  onSettingsChange: (key: string, value: any) => void;
}

const ButtonCustomization: React.FC<ButtonCustomizationProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          <Type className="w-5 h-5 text-survey-success" />
          Button Customization
        </h5>
        <SlimSwitch
          checked={settings.enabled}
          onCheckedChange={(checked) =>
            onSettingsChange("button.enabled", checked)
          }
        />
      </div>

      {settings.enabled && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Background Color</Label>
              <Input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) =>
                  onSettingsChange("button.backgroundColor", e.target.value)
                }
                className="w-16"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Text Color</Label>
              <Input
                type="color"
                value={settings.textColor}
                onChange={(e) =>
                  onSettingsChange("button.textColor", e.target.value)
                }
                className="w-16"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Hover Color</Label>
              <Input
                type="color"
                value={settings.backgroundHoverColor}
                onChange={(e) =>
                  onSettingsChange(
                    "button.backgroundHoverColor",
                    e.target.value
                  )
                }
                className="w-16"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Border Radius</Label>
              <Input
                type="number"
                value={settings.borderRadius}
                onChange={(e) =>
                  onSettingsChange(
                    "button.borderRadius",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Font Size</Label>
              <Input
                type="number"
                value={settings.fontSize}
                onChange={(e) =>
                  onSettingsChange("button.fontSize", parseInt(e.target.value))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Font Weight</Label>
              <Select
                value={settings.fontWeight}
                onValueChange={(value) =>
                  onSettingsChange("button.fontWeight", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {!settings.enabled && (
        <p className="text-sm text-muted-foreground">
          Enable to customize button appearance
        </p>
      )}
    </div>
  );
};

export default ButtonCustomization;
