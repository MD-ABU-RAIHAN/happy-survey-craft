import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker, FileUpload } from "../../../shared";
import { Palette, Type, Image, Code, Layers } from "lucide-react";

interface SectionCustomizationSettings {
  primaryText: string;
  secondaryText: string;
  accentColor: string;
  backgroundColor: string;
  backgroundType: "solid" | "gradient" | "image";
  gradientFrom: string;
  gradientTo: string;
  gradientDirection:
    | "to-r"
    | "to-br"
    | "to-b"
    | "to-bl"
    | "to-l"
    | "to-tl"
    | "to-t"
    | "to-tr";
  backgroundImage: string;
  backgroundImageOpacity: number;
  backgroundImagePosition:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "cover"
    | "contain";
  customCss: string;
  enableCustomCss: boolean;
}

interface SectionCustomizationProps {
  settings: SectionCustomizationSettings;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

const SectionCustomization: React.FC<SectionCustomizationProps> = ({
  settings,
  onSettingsChange,
}) => {
  const gradientDirectionOptions = [
    { value: "to-r", label: "Left to Right" },
    { value: "to-l", label: "Right to Left" },
    { value: "to-t", label: "Bottom to Top" },
    { value: "to-b", label: "Top to Bottom" },
    { value: "to-tr", label: "Bottom Left to Top Right" },
    { value: "to-tl", label: "Bottom Right to Top Left" },
    { value: "to-br", label: "Top Left to Bottom Right" },
    { value: "to-bl", label: "Top Right to Bottom Left" },
  ];

  const backgroundPositionOptions = [
    { value: "center", label: "Center" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "cover", label: "Cover" },
    { value: "contain", label: "Contain" },
  ];

  const renderBackgroundPreview = () => {
    if (settings.backgroundType === "solid") {
      return (
        <div
          className="w-full h-16 rounded-lg border"
          style={{ backgroundColor: settings.backgroundColor }}
        />
      );
    } else if (settings.backgroundType === "gradient") {
      const gradientStyle = {
        background: `linear-gradient(${settings.gradientDirection.replace(
          "to-",
          "to "
        )}, ${settings.gradientFrom}, ${settings.gradientTo})`,
      };
      return (
        <div className="w-full h-16 rounded-lg border" style={gradientStyle} />
      );
    } else if (
      settings.backgroundType === "image" &&
      settings.backgroundImage
    ) {
      const imageStyle = {
        backgroundImage: `linear-gradient(rgba(255,255,255,${
          1 - settings.backgroundImageOpacity / 100
        }), rgba(255,255,255,${
          1 - settings.backgroundImageOpacity / 100
        })), url(${settings.backgroundImage})`,
        backgroundSize:
          settings.backgroundImagePosition === "cover" ||
          settings.backgroundImagePosition === "contain"
            ? settings.backgroundImagePosition
            : "auto",
        backgroundPosition:
          settings.backgroundImagePosition === "cover" ||
          settings.backgroundImagePosition === "contain"
            ? "center"
            : settings.backgroundImagePosition,
        backgroundRepeat: "no-repeat",
      };
      return (
        <div className="w-full h-16 rounded-lg border" style={imageStyle} />
      );
    }
    return (
      <div className="w-full h-16 rounded-lg border bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Preview</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Section Customization
        </CardTitle>
        <CardDescription>
          Customize text colors, background, and appearance of your survey
          sections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Colors Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <Label className="font-medium">Text Colors</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ColorPicker
              label="Primary Text"
              value={settings.primaryText}
              onChange={(value) =>
                onSettingsChange("section.primaryText", value)
              }
            />
            <ColorPicker
              label="Secondary Text"
              value={settings.secondaryText}
              onChange={(value) =>
                onSettingsChange("section.secondaryText", value)
              }
            />
            <ColorPicker
              label="Accent Color"
              value={settings.accentColor}
              onChange={(value) =>
                onSettingsChange("section.accentColor", value)
              }
            />
          </div>
        </div>

        {/* Background Customization */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <Label className="font-medium">Background</Label>
          </div>

          {/* Background Type Selector */}
          <Tabs
            value={settings.backgroundType}
            onValueChange={(value) =>
              onSettingsChange("section.backgroundType", value)
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="solid"
                className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
              >
                Solid Color
              </TabsTrigger>
              <TabsTrigger
                value="gradient"
                className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
              >
                Gradient
              </TabsTrigger>
              <TabsTrigger
                value="image"
                className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
              >
                Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="solid" className="space-y-4">
              <ColorPicker
                label="Background Color"
                value={settings.backgroundColor}
                onChange={(value) =>
                  onSettingsChange("section.backgroundColor", value)
                }
              />
            </TabsContent>

            <TabsContent value="gradient" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Gradient Start"
                  value={settings.gradientFrom}
                  onChange={(value) =>
                    onSettingsChange("section.gradientFrom", value)
                  }
                />
                <ColorPicker
                  label="Gradient End"
                  value={settings.gradientTo}
                  onChange={(value) =>
                    onSettingsChange("section.gradientTo", value)
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Gradient Direction</Label>
                <Select
                  value={settings.gradientDirection}
                  onValueChange={(value) =>
                    onSettingsChange(
                      "section.gradientDirection",
                      value as typeof settings.gradientDirection
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientDirectionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <FileUpload
                label="Background Image"
                value={settings.backgroundImage}
                onChange={(value) =>
                  onSettingsChange("section.backgroundImage", value)
                }
                accept="image/*"
                maxSizeMB={5}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Image Opacity</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={settings.backgroundImageOpacity}
                      onChange={(e) =>
                        onSettingsChange(
                          "section.backgroundImageOpacity",
                          parseInt(e.target.value)
                        )
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12">
                      {settings.backgroundImageOpacity}%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Image Position</Label>
                  <Select
                    value={settings.backgroundImagePosition}
                    onValueChange={(value) =>
                      onSettingsChange(
                        "section.backgroundImagePosition",
                        value as typeof settings.backgroundImagePosition
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundPositionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Custom CSS Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <Label className="font-medium">Custom CSS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-xs">Enable</Label>
              <SlimSwitch
                checked={settings.enableCustomCss}
                onCheckedChange={(checked) =>
                  onSettingsChange("section.enableCustomCss", checked)
                }
              />
            </div>
          </div>

          {settings.enableCustomCss && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Add custom CSS rules for advanced styling (use .survey-section
                as the base selector)
              </Label>
              <Textarea
                placeholder={`.survey-section {
  /* Your custom styles here */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`}
                value={settings.customCss}
                onChange={(e) =>
                  onSettingsChange("section.customCss", e.target.value)
                }
                className="min-h-[120px] font-mono text-sm"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionCustomization;
