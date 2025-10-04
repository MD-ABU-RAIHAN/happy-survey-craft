import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ColorPicker, FileUpload } from "../../../shared";
import {
  Palette,
  Type,
  Image,
  Code,
  Layers,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

interface IntegratedCustomizationProps {
  buttonSettings: ButtonSettings;
  sectionSettings: SectionCustomizationSettings;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

const IntegratedCustomization: React.FC<IntegratedCustomizationProps> = ({
  buttonSettings,
  sectionSettings,
  onSettingsChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

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

  return (
    <>
      <Card>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CardHeader>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Customization
                  </CardTitle>
                  <CardDescription>
                    Customize buttons, text colors, background, and appearance of
                    your survey
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CollapsibleTrigger>
          </CardHeader>

          <CollapsibleContent>
            <CardContent className="space-y-6">
            <Tabs defaultValue="button" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="button"
                  className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
                >
                  Button Customization
                </TabsTrigger>
                <TabsTrigger
                  value="section"
                  className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
                >
                  Section Customization
                </TabsTrigger>
              </TabsList>

              {/* Button Customization Tab */}
              <TabsContent value="button" className="space-y-4">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-survey-success" />
                  <Label className="font-medium">Button Settings</Label>
                </div>

                <div className="space-y-4">
                  {/* First row: Colors */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Background Color</Label>
                      <Input
                        type="color"
                        value={buttonSettings.backgroundColor}
                        onChange={(e) =>
                          onSettingsChange(
                            "button.backgroundColor",
                            e.target.value
                          )
                        }
                        className="w-16"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Text Color</Label>
                      <Input
                        type="color"
                        value={buttonSettings.textColor}
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
                        value={buttonSettings.backgroundHoverColor}
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

                  {/* Second row: Other settings */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Border Radius</Label>
                      <Input
                        type="number"
                        value={buttonSettings.borderRadius}
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
                        value={buttonSettings.fontSize}
                        onChange={(e) =>
                          onSettingsChange(
                            "button.fontSize",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Font Weight</Label>
                      <Select
                        value={buttonSettings.fontWeight}
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
              </TabsContent>

              {/* Section Customization Tab */}
              <TabsContent value="section" className="space-y-6">
                {/* Text Colors Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <Label className="font-medium">Text Colors</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ColorPicker
                      label="Primary Text"
                      value={sectionSettings.primaryText}
                      onChange={(value) =>
                        onSettingsChange("section.primaryText", value)
                      }
                    />
                    <ColorPicker
                      label="Secondary Text"
                      value={sectionSettings.secondaryText}
                      onChange={(value) =>
                        onSettingsChange("section.secondaryText", value)
                      }
                    />
                    <ColorPicker
                      label="Accent Color"
                      value={sectionSettings.accentColor}
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
                    value={sectionSettings.backgroundType}
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
                        value={sectionSettings.backgroundColor}
                        onChange={(value) =>
                          onSettingsChange("section.backgroundColor", value)
                        }
                      />
                    </TabsContent>

                    <TabsContent value="gradient" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ColorPicker
                          label="Gradient Start"
                          value={sectionSettings.gradientFrom}
                          onChange={(value) =>
                            onSettingsChange("section.gradientFrom", value)
                          }
                        />
                        <ColorPicker
                          label="Gradient End"
                          value={sectionSettings.gradientTo}
                          onChange={(value) =>
                            onSettingsChange("section.gradientTo", value)
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Gradient Direction</Label>
                        <Select
                          value={sectionSettings.gradientDirection}
                          onValueChange={(value) =>
                            onSettingsChange(
                              "section.gradientDirection",
                              value as typeof sectionSettings.gradientDirection
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gradientDirectionOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
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
                        value={sectionSettings.backgroundImage}
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
                              value={sectionSettings.backgroundImageOpacity}
                              onChange={(e) =>
                                onSettingsChange(
                                  "section.backgroundImageOpacity",
                                  parseInt(e.target.value)
                                )
                              }
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-12">
                              {sectionSettings.backgroundImageOpacity}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Image Position</Label>
                          <Select
                            value={sectionSettings.backgroundImagePosition}
                            onValueChange={(value) =>
                              onSettingsChange(
                                "section.backgroundImagePosition",
                                value as typeof sectionSettings.backgroundImagePosition
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {backgroundPositionOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>

      {/* Custom CSS Section - Separate Card */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <Label className="font-medium">Custom CSS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-xs">Enable</Label>
              <SlimSwitch
                checked={sectionSettings.enableCustomCss}
                onCheckedChange={(checked) =>
                  onSettingsChange("section.enableCustomCss", checked)
                }
              />
            </div>
          </div>

          {sectionSettings.enableCustomCss && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Add custom CSS rules for advanced styling (use
                .survey-section as the base selector)
              </Label>
              <Textarea
                placeholder={`.survey-section {
  /* Your custom styles here */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`}
                value={sectionSettings.customCss}
                onChange={(e) =>
                  onSettingsChange("section.customCss", e.target.value)
                }
                className="min-h-[120px] font-mono text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default IntegratedCustomization;
