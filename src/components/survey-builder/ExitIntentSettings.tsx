import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SectionCard from "./shared/SectionCard";
import ColorPicker from "./shared/ColorPicker";
import UploadInput from "./shared/UploadInput";
import {
  MousePointer,
  Upload,
  Type,
  Palette,
} from "lucide-react";

interface ExitIntentSettings {
  showPopup: {
    emptyCart: boolean;
    hasProducts: boolean;
  };
  recurrence: "only-once" | "every-incomplete";
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    minimized: boolean;
  };
  section: {
    primaryTextColor: string;
    secondaryTextColor: string;
    accentColor: string;
    backgroundColor: string;
  };
}

interface ExitIntentSettingsProps {
  settings: ExitIntentSettings;
  onSettingsChange: (settings: ExitIntentSettings) => void;
}

const ExitIntentSettingsComponent: React.FC<ExitIntentSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const updateSetting = (key: string, value: any) => {
    const keys = key.split('.');
    let newSettings = { ...settings };

    if (keys.length === 2) {
      newSettings = {
        ...newSettings,
        [keys[0]]: { ...newSettings[keys[0] as keyof ExitIntentSettings], [keys[1]]: value }
      };
    } else if (keys.length === 1) {
      newSettings = { ...newSettings, [keys[0]]: value };
    }

    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-8">
      {/* Show Pop-up Section */}
      <SectionCard
        title="Show Pop-up"
        icon={<MousePointer className="w-5 h-5 text-secondary-brand" />}
        badge={<Badge variant="secondary" className="text-xs bg-secondary-brand/10 text-secondary-brand">Step 1</Badge>}
        className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 border-secondary-brand/10"
      >
        <div className="bg-survey-info-light/30 border border-survey-info/20 rounded-lg p-3 mb-4">
          <p className="text-xs text-survey-info flex items-start gap-2">
            <span className="text-survey-info font-bold text-sm">💡</span>
            <span>
              <strong>Tip:</strong> Exit intent detection works best on desktop devices.
              Configure when to show the survey based on user cart status.
            </span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show when cart is empty</Label>
            <Switch
              checked={settings.showPopup.emptyCart}
              onCheckedChange={(checked) =>
                updateSetting("showPopup.emptyCart", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show when cart has products</Label>
            <Switch
              checked={settings.showPopup.hasProducts}
              onCheckedChange={(checked) =>
                updateSetting("showPopup.hasProducts", checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Recurrence</Label>
            <Select
              value={settings.recurrence}
              onValueChange={(value) => updateSetting("recurrence", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="only-once">Only Once</SelectItem>
                <SelectItem value="every-incomplete">Every Incomplete Session</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      {/* Side Logo Settings */}
      <SectionCard title="Side Logo" icon={<Upload className="w-5 h-5 text-survey-purple" />}>
        <div className="flex items-center justify-between mb-4">
          <Label className="font-medium">Enable Side Logo</Label>
          <Switch
            checked={settings.sideLogo.enabled}
            onCheckedChange={(checked) => updateSetting("sideLogo.enabled", checked)}
          />
        </div>

        {settings.sideLogo.enabled && (
          <div className="space-y-4">
            <UploadInput
              label="Logo URL"
              value={settings.sideLogo.url}
              onChange={(value) => updateSetting("sideLogo.url", value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Size</Label>
                <Select
                  value={settings.sideLogo.size}
                  onValueChange={(value) => updateSetting("sideLogo.size", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Position</Label>
                <Select
                  value={settings.sideLogo.position}
                  onValueChange={(value) => updateSetting("sideLogo.position", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm">Minimized</Label>
              <Switch
                checked={settings.sideLogo.minimized}
                onCheckedChange={(checked) => updateSetting("sideLogo.minimized", checked)}
              />
            </div>
          </div>
        )}
      </SectionCard>

      {/* Button Customization */}
      <SectionCard title="Button Customization" icon={<Type className="w-5 h-5 text-survey-success" />}>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Text Color"
            value={settings.button.textColor}
            onChange={(value) => updateSetting("button.textColor", value)}
          />
          <ColorPicker
            label="Background Color"
            value={settings.button.backgroundColor}
            onChange={(value) => updateSetting("button.backgroundColor", value)}
          />
        </div>

        <ColorPicker
          label="Hover Color"
          value={settings.button.backgroundHoverColor}
          onChange={(value) => updateSetting("button.backgroundHoverColor", value)}
          className="mt-4"
        />

        <div className="flex items-center justify-between mt-4">
          <Label className="text-sm">Minimized</Label>
          <Switch
            checked={settings.button.minimized}
            onCheckedChange={(checked) => updateSetting("button.minimized", checked)}
          />
        </div>
      </SectionCard>

      {/* Section Styling */}
      <SectionCard title="Section Styling" icon={<Palette className="w-5 h-5 text-survey-info" />}>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Primary Text Color"
            value={settings.section.primaryTextColor}
            onChange={(value) => updateSetting("section.primaryTextColor", value)}
          />
          <ColorPicker
            label="Secondary Text Color"
            value={settings.section.secondaryTextColor}
            onChange={(value) => updateSetting("section.secondaryTextColor", value)}
          />
          <ColorPicker
            label="Accent Color"
            value={settings.section.accentColor}
            onChange={(value) => updateSetting("section.accentColor", value)}
          />
          <ColorPicker
            label="Background Color"
            value={settings.section.backgroundColor}
            onChange={(value) => updateSetting("section.backgroundColor", value)}
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default ExitIntentSettingsComponent;