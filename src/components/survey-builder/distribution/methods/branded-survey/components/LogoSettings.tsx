import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Image } from "lucide-react";
import { FileUpload } from "../../../shared";

interface LogoSetting {
  enabled: boolean;
  url: string;
  width: number;
  height: number;
}

interface LogoSettingsProps {
  headerLogo: LogoSetting;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({
  headerLogo,
  onSettingsChange,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <div className="flex items-center justify-between">
        <Label className="font-semibold flex items-center gap-2">
          <Image className="w-5 h-5 text-survey-purple" />
          Brand Logo
        </Label>
        <SlimSwitch
          checked={headerLogo.enabled}
          onCheckedChange={(checked) =>
            onSettingsChange("headerLogo.enabled", checked)
          }
        />
      </div>

      {headerLogo.enabled && (
        <div className="space-y-3">
          <FileUpload
            label="Upload Logo"
            value={headerLogo.url}
            onChange={(value) => onSettingsChange("headerLogo.url", value)}
          />
        </div>
      )}

      {!headerLogo.enabled && (
        <p className="text-sm text-muted-foreground">
          Enable to add your brand logo to the survey
        </p>
      )}
    </div>
  );
};

export default LogoSettings;
