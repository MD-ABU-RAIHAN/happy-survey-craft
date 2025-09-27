import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link, RotateCcw, Zap, Copy, Check } from "lucide-react";

interface BrandedSurveySettings {
  useCustomDomain: boolean;
  customDomain: string;
  customUrl: string;
}

interface SurveyUrlSectionProps {
  settings: BrandedSurveySettings;
  onSettingsChange: (key: string, value: any) => void;
  onResetToDefault: () => void;
  onGenerateNewUrl: () => void;
  onCopyUrl: () => void;
  copiedUrl: boolean;
}

const SurveyUrlSection: React.FC<SurveyUrlSectionProps> = ({
  settings,
  onSettingsChange,
  onResetToDefault,
  onGenerateNewUrl,
  onCopyUrl,
  copiedUrl,
}) => {
  const fullUrl = settings.useCustomDomain
    ? `https://${settings.customDomain}/${settings.customUrl}`
    : `https://yoursurveyapp.com/s/${settings.customUrl}`;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary-brand/5 rounded-lg p-6 space-y-4 border border-primary/10">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          <Link className="w-5 h-5 text-primary" />
          Survey URL
        </h5>
        <Button
          onClick={onResetToDefault}
          variant="outline"
          className="text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset All
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between space-x-2">
          <Label className="text-sm">Use Custom Domain</Label>
          <Switch
            checked={settings.useCustomDomain}
            onCheckedChange={(checked) =>
              onSettingsChange("useCustomDomain", checked)
            }
          />
        </div>

        {settings.useCustomDomain && (
          <div className="space-y-2">
            <Label className="text-xs">Custom Domain</Label>
            <Input
              placeholder="surveys.yourcompany.com"
              value={settings.customDomain}
              onChange={(e) => onSettingsChange("customDomain", e.target.value)}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-xs">URL Slug</Label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center bg-muted rounded-md px-3 py-2 text-sm">
              <span className="text-muted-foreground">
                {settings.useCustomDomain
                  ? `https://${
                      settings.customDomain || "surveys.yourcompany.com"
                    }/`
                  : "https://yoursurveyapp.com/s/"}
              </span>
              <Input
                className="border-0 shadow-none p-0 bg-transparent font-medium"
                value={settings.customUrl}
                onChange={(e) => onSettingsChange("customUrl", e.target.value)}
              />
            </div>
            <Button onClick={onGenerateNewUrl} variant="outline">
              <Zap className="w-3 h-3" />
            </Button>
            <Button onClick={onCopyUrl} variant="outline">
              {copiedUrl ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white/60 p-3 rounded-lg border border-muted text-sm">
        <div className="font-medium text-foreground mb-1">Preview URL:</div>
        <div className="text-muted-foreground break-all">{fullUrl}</div>
      </div>
    </div>
  );
};

export default SurveyUrlSection;
