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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SlimSwitch } from "@/components/ui/slim-switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Palette, ChevronDown, ChevronUp, Code } from "lucide-react";

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

interface SimplifiedCustomizationProps {
  buttonSettings: ButtonSettings;
  sectionSettings: SectionCustomizationSettings;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
}

const SimplifiedCustomization: React.FC<SimplifiedCustomizationProps> = ({
  buttonSettings,
  sectionSettings,
  onSettingsChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Card>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CardHeader>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Customization
                  </CardTitle>
                  <CardDescription>
                    Customize your dedicated survey page appearance
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
              {/* Color Pickers Row */}
              <div className="grid grid-cols-3 gap-4">
                {/* Primary Color */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Primary Color</Label>
                  <Input
                    type="color"
                    value={buttonSettings.backgroundColor}
                    onChange={(e) =>
                      onSettingsChange("button.backgroundColor", e.target.value)
                    }
                    className="w-full h-10 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    This color will be used for buttons and accent elements
                  </p>
                </div>

                {/* Text Color */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Text Color</Label>
                  <Input
                    type="color"
                    value={sectionSettings.primaryText}
                    onChange={(e) =>
                      onSettingsChange("section.primaryText", e.target.value)
                    }
                    className="w-full h-10 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Main text color for questions and content
                  </p>
                </div>

                {/* Background Color */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Background Color
                  </Label>
                  <Input
                    type="color"
                    value={sectionSettings.backgroundColor}
                    onChange={(e) =>
                      onSettingsChange(
                        "section.backgroundColor",
                        e.target.value
                      )
                    }
                    className="w-full h-10 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Background color for the survey page
                  </p>
                </div>
              </div>

              {/* Border Radius */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Border Radius</Label>
                  <span className="text-sm font-medium text-primary">
                    {buttonSettings.borderRadius}px
                  </span>
                </div>
                <Input
                  type="range"
                  min="0"
                  max="24"
                  step="2"
                  value={buttonSettings.borderRadius}
                  onChange={(e) =>
                    onSettingsChange(
                      "button.borderRadius",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Square (0px)</span>
                  <span>Rounded (24px)</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Controls the roundness of buttons and input fields
                </p>
              </div>
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
                Add custom CSS rules for advanced styling (use .survey-section
                as the base selector)
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

export default SimplifiedCustomization;
