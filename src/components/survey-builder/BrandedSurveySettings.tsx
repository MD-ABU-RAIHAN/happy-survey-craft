import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Link,
  RotateCcw,
  Zap,
  Copy,
  Check,
  Upload,
  Image,
  Palette,
  Type,
  Layout,
  Code,
  Minimize,
  Maximize,
  Sliders,
  Brush,
} from "lucide-react";

interface BrandedSurveySettings {
  useCustomDomain: boolean;
  customDomain: string;
  customUrl: string;
  headerLogo: { enabled: boolean; url: string; width: number; height: number };
  sideLogo: { enabled: boolean; url: string; width: number; height: number };
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };
  section: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: number;
  };
  background: {
    type: "color" | "gradient" | "image";
    color: string;
    gradientFrom: string;
    gradientTo: string;
    gradientDirection: string;
    imageUrl: string;
    imageOpacity: number;
    imagePosition: string;
  };
  customCss: string;
  progressBar: {
    enabled: boolean;
    color: string;
    backgroundColor: string;
    borderRadius: number;
  };
  animation: {
    enabled: boolean;
    type: string;
    duration: number;
  };
}

interface BrandedSurveySettingsProps {
  settings: BrandedSurveySettings;
  onSettingsChange: (settings: BrandedSurveySettings) => void;
  onResetToDefault: () => void;
  onGenerateNewUrl: () => void;
  onCopyUrl: () => void;
  copiedUrl: boolean;
}

const BrandedSurveySettingsComponent: React.FC<BrandedSurveySettingsProps> = ({
  settings,
  onSettingsChange,
  onResetToDefault,
  onGenerateNewUrl,
  onCopyUrl,
  copiedUrl,
}) => {
  const updateSetting = (key: string, value: any) => {
    const keys = key.split(".");
    if (keys.length === 1) {
      onSettingsChange({ ...settings, [key]: value });
    } else if (keys.length === 2) {
      onSettingsChange({
        ...settings,
        [keys[0]]: {
          ...settings[keys[0] as keyof BrandedSurveySettings],
          [keys[1]]: value,
        },
      });
    }
  };

  const fullUrl = settings.useCustomDomain
    ? `https://${settings.customDomain}/${settings.customUrl}`
    : `https://yoursurveyapp.com/s/${settings.customUrl}`;

  return (
    <div className="space-y-8">
      {/* Auto-generated URL Section */}
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
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.useCustomDomain}
              onCheckedChange={(checked) =>
                updateSetting("useCustomDomain", checked)
              }
            />
            <Label className="text-sm">Use Custom Domain</Label>
          </div>

          {settings.useCustomDomain && (
            <div className="space-y-2">
              <Label className="text-xs">Custom Domain</Label>
              <Input
                placeholder="surveys.yourcompany.com"
                value={settings.customDomain}
                onChange={(e) => updateSetting("customDomain", e.target.value)}
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
                  onChange={(e) => updateSetting("customUrl", e.target.value)}
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

      {/* Logo Settings */}
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
              checked={settings.headerLogo.enabled}
              onCheckedChange={(checked) =>
                updateSetting("headerLogo.enabled", checked)
              }
            />
          </div>

          {settings.headerLogo.enabled && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Logo URL</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="https://example.com/logo.png"
                    value={settings.headerLogo.url}
                    onChange={(e) =>
                      updateSetting("headerLogo.url", e.target.value)
                    }
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    value={settings.headerLogo.width}
                    onChange={(e) =>
                      updateSetting(
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
                    value={settings.headerLogo.height}
                    onChange={(e) =>
                      updateSetting(
                        "headerLogo.height",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {settings.headerLogo.enabled && !settings.headerLogo.url && (
            <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Upload or enter URL for header logo
              </p>
            </div>
          )}
        </div>

        {/* Side Logo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Side Logo</Label>
            <Switch
              checked={settings.sideLogo.enabled}
              onCheckedChange={(checked) =>
                updateSetting("sideLogo.enabled", checked)
              }
            />
          </div>

          {settings.sideLogo.enabled && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Logo URL</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="https://example.com/logo.png"
                    value={settings.sideLogo.url}
                    onChange={(e) =>
                      updateSetting("sideLogo.url", e.target.value)
                    }
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    value={settings.sideLogo.width}
                    onChange={(e) =>
                      updateSetting("sideLogo.width", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Height (px)</Label>
                  <Input
                    type="number"
                    value={settings.sideLogo.height}
                    onChange={(e) =>
                      updateSetting("sideLogo.height", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {settings.sideLogo.enabled && !settings.sideLogo.url && (
            <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Upload or enter URL for side logo
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Button Customization */}
      <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold flex items-center gap-2">
            <Type className="w-5 h-5 text-survey-success" />
            Button Customization
          </h5>
          <Switch
            checked={settings.button.enabled}
            onCheckedChange={(checked) =>
              updateSetting("button.enabled", checked)
            }
          />
        </div>

        {settings.button.enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Background Color</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={settings.button.backgroundColor}
                    onChange={(e) =>
                      updateSetting("button.backgroundColor", e.target.value)
                    }
                    className="w-16"
                  />
                  <Input
                    value={settings.button.backgroundColor}
                    onChange={(e) =>
                      updateSetting("button.backgroundColor", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Text Color</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={settings.button.textColor}
                    onChange={(e) =>
                      updateSetting("button.textColor", e.target.value)
                    }
                    className="w-16"
                  />
                  <Input
                    value={settings.button.textColor}
                    onChange={(e) =>
                      updateSetting("button.textColor", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Hover Color</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={settings.button.backgroundHoverColor}
                    onChange={(e) =>
                      updateSetting(
                        "button.backgroundHoverColor",
                        e.target.value
                      )
                    }
                    className="w-16"
                  />
                  <Input
                    value={settings.button.backgroundHoverColor}
                    onChange={(e) =>
                      updateSetting(
                        "button.backgroundHoverColor",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Border Radius</Label>
                <Input
                  type="number"
                  value={settings.button.borderRadius}
                  onChange={(e) =>
                    updateSetting(
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
                  value={settings.button.fontSize}
                  onChange={(e) =>
                    updateSetting("button.fontSize", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Font Weight</Label>
                <Select
                  value={settings.button.fontWeight}
                  onValueChange={(value) =>
                    updateSetting("button.fontWeight", value)
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

        {!settings.button.enabled && (
          <p className="text-sm text-muted-foreground">
            Enable to customize button appearance
          </p>
        )}

        {/* Button Preview */}
        {settings.button.enabled && (
          <div className="space-y-2">
            <Label className="text-xs font-medium">Button Preview</Label>
            <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
              <button
                style={{
                  backgroundColor: settings.button.backgroundColor,
                  color: settings.button.textColor,
                  borderRadius: `${settings.button.borderRadius}px`,
                  fontSize: `${settings.button.fontSize}px`,
                  fontWeight: settings.button.fontWeight,
                  boxShadow: settings.button.shadow
                    ? "0 2px 4px rgba(0,0,0,0.1)"
                    : "none",
                }}
                className="px-6 py-2 transition-colors duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    settings.button.backgroundHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    settings.button.backgroundColor;
                }}
              >
                Submit Survey
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandedSurveySettingsComponent;
