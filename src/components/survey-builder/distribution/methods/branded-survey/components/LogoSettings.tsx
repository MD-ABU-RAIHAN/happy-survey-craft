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
import { Image } from "lucide-react";
import { FileUpload } from "../../../shared";

interface LogoSetting {
  enabled: boolean;
  url: string;
  width: number;
  height: number;
  position?: "left" | "center" | "right";
}

interface LogoSettingsProps {
  headerLogo: LogoSetting;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

export default function LogoSettings({
  headerLogo,
  onSettingsChange,
}: LogoSettingsProps) {
  const handleToggle = (enabled: boolean) => {
    onSettingsChange("headerLogo.enabled", enabled);
  };

  const handleFileSelect = (value: string) => {
    onSettingsChange("headerLogo.url", value);
  };

  const handlePositionChange = (position: string) => {
    onSettingsChange("headerLogo.position", position);
  };

  const handleWidthChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 50 && numValue <= 500) {
      onSettingsChange("headerLogo.width", numValue);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4" />
          <span className="text-sm font-medium">Brand Logo</span>
        </div>
        <SlimSwitch
          checked={headerLogo.enabled}
          onCheckedChange={handleToggle}
        />
      </div>

      {headerLogo.enabled && (
        <div className="space-y-4">
          <FileUpload
            accept="image/*"
            label="Logo"
            value={headerLogo.url}
            onChange={handleFileSelect}
          />

          {headerLogo.url && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Logo Alignment</Label>
                <Select
                  value={headerLogo.position || "center"}
                  onValueChange={handlePositionChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Logo Width (px)</Label>
                <Input
                  type="number"
                  value={headerLogo.width || 200}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  min="50"
                  max="500"
                  placeholder="200"
                  className="text-center"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
