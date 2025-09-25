import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Image, Upload } from "lucide-react";
import FileUpload from "../shared/FileUpload";

interface LogoSetting {
  enabled: boolean;
  url: string;
  width: number;
  height: number;
}

interface LogoSettingsProps {
  headerLogo: LogoSetting;
  sideLogo: LogoSetting;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({
  headerLogo,
  sideLogo,
  onSettingsChange,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-6 border border-muted">
      <h5 className="font-semibold flex items-center gap-2">
        <Image className="w-5 h-5 text-survey-purple" />
        Logo Settings
      </h5>

      {/* Header Logo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="font-medium">Header Logo</Label>
          <Switch
            checked={headerLogo.enabled}
            onCheckedChange={(checked) =>
              onSettingsChange("headerLogo.enabled", checked)
            }
          />
        </div>

        {headerLogo.enabled && (
          <div className="space-y-3">
            <FileUpload
              label="Header Logo"
              value={headerLogo.url}
              onChange={(value) => onSettingsChange("headerLogo.url", value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Width (px)</Label>
                <Input
                  type="number"
                  value={headerLogo.width}
                  onChange={(e) =>
                    onSettingsChange(
                      "headerLogo.width",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Height (px)</Label>
                <Input
                  type="number"
                  value={headerLogo.height}
                  onChange={(e) =>
                    onSettingsChange(
                      "headerLogo.height",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side Logo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="font-medium">Side Logo</Label>
          <Switch
            checked={sideLogo.enabled}
            onCheckedChange={(checked) =>
              onSettingsChange("sideLogo.enabled", checked)
            }
          />
        </div>

        {sideLogo.enabled && (
          <div className="space-y-3">
            <FileUpload
              label="Side Logo"
              value={sideLogo.url}
              onChange={(value) => onSettingsChange("sideLogo.url", value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Width (px)</Label>
                <Input
                  type="number"
                  value={sideLogo.width}
                  onChange={(e) =>
                    onSettingsChange("sideLogo.width", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Height (px)</Label>
                <Input
                  type="number"
                  value={sideLogo.height}
                  onChange={(e) =>
                    onSettingsChange(
                      "sideLogo.height",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoSettings;
