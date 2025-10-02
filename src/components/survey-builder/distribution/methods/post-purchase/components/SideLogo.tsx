import React from "react";
import { Button } from "@/components/ui/button";
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
import { Upload } from "lucide-react";
import { FileUpload } from "../../../shared";

interface SideLogoSettings {
  enabled: boolean;
  url: string;
  width: number;
  height: number;
  position: "left" | "right" | "center";
}

interface SideLogoProps {
  settings: SideLogoSettings;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

const SideLogo: React.FC<SideLogoProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Side Logo</Label>
        <SlimSwitch
          checked={settings.enabled}
          onCheckedChange={(checked) =>
            onSettingsChange("sideLogo.enabled", checked)
          }
        />
      </div>

      {settings.enabled && (
        <div className="space-y-3">
          <FileUpload
            label="Side Logo"
            value={settings.url}
            onChange={(value) => onSettingsChange("sideLogo.url", value)}
          />
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Width</Label>
              <Input
                type="number"
                value={settings.width}
                onChange={(e) =>
                  onSettingsChange("sideLogo.width", parseInt(e.target.value))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Height</Label>
              <Input
                type="number"
                value={settings.height}
                onChange={(e) =>
                  onSettingsChange("sideLogo.height", parseInt(e.target.value))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Position</Label>
              <Select
                value={settings.position}
                onValueChange={(value) =>
                  onSettingsChange("sideLogo.position", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideLogo;
