import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Upload } from "lucide-react";
import FileUpload from "./FileUpload";

interface LogoSetting {
  enabled: boolean;
  url: string;
  width: number;
  height: number;
  position?: "left" | "right" | "center";
  size?: "small" | "medium" | "large";
}

interface LogoSettingsProps {
  headerLogo: LogoSetting;
  sideLogo: LogoSetting;
  onSettingsChange: (key: string, value: string | number | boolean) => void;
  className?: string;
  distributionType?: string;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({
  headerLogo,
  sideLogo,
  onSettingsChange,
  className = "",
  distributionType = "",
}) => {
  // Provide default values if props are undefined
  const safeHeaderLogo = headerLogo || {
    enabled: false,
    url: "",
    width: 100,
    height: 50,
    position: "center" as const,
    size: "medium" as const,
  };

  const safeSideLogo = sideLogo || {
    enabled: false,
    url: "",
    width: 100,
    height: 50,
    position: "left" as const,
    size: "medium" as const,
  };
  return (
    <div
      className={`bg-white/60 rounded-lg p-6 space-y-6 border border-muted ${className}`}
    >
      <h5 className="font-semibold flex items-center gap-2">
        <Image className="w-5 h-5 text-survey-purple" />
        Logo Settings
      </h5>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="header"
            className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
          >
            Header Logo
          </TabsTrigger>
          <TabsTrigger
            value="side"
            className="data-[state=active]:!bg-white data-[state=active]:!text-gray-900 data-[state=active]:!shadow-md data-[state=active]:!border-gray-200"
          >
            Side Logo
          </TabsTrigger>
        </TabsList>

        {/* Header Logo Tab */}
        <TabsContent value="header" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Header Logo Settings</Label>
            <SlimSwitch
              checked={safeHeaderLogo.enabled}
              onCheckedChange={(checked) =>
                onSettingsChange("headerLogo.enabled", checked)
              }
            />
          </div>

          {safeHeaderLogo.enabled && (
            <div className="space-y-3">
              <FileUpload
                label="Header Logo"
                value={safeHeaderLogo.url}
                onChange={(value) => onSettingsChange("headerLogo.url", value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    value={safeHeaderLogo.width}
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
                    value={safeHeaderLogo.height}
                    onChange={(e) =>
                      onSettingsChange(
                        "headerLogo.height",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* Position and Size options for certain distribution types */}
              {(distributionType === "email-campaign" ||
                distributionType === "post-purchase") && (
                <div className="grid grid-cols-2 gap-3">
                  {safeHeaderLogo.position !== undefined && (
                    <div className="space-y-1">
                      <Label className="text-xs">Position</Label>
                      <select
                        value={safeHeaderLogo.position}
                        onChange={(e) =>
                          onSettingsChange(
                            "headerLogo.position",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  )}
                  {safeHeaderLogo.size !== undefined && (
                    <div className="space-y-1">
                      <Label className="text-xs">Size</Label>
                      <select
                        value={safeHeaderLogo.size}
                        onChange={(e) =>
                          onSettingsChange("headerLogo.size", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!safeHeaderLogo.enabled && (
            <p className="text-sm text-muted-foreground">
              Enable to add a header logo to your survey
            </p>
          )}
        </TabsContent>

        {/* Side Logo Tab */}
        <TabsContent value="side" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Side Logo Settings</Label>
            <SlimSwitch
              checked={safeSideLogo.enabled}
              onCheckedChange={(checked) =>
                onSettingsChange("sideLogo.enabled", checked)
              }
            />
          </div>

          {safeSideLogo.enabled && (
            <div className="space-y-3">
              <FileUpload
                label="Side Logo"
                value={safeSideLogo.url}
                onChange={(value) => onSettingsChange("sideLogo.url", value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    value={safeSideLogo.width}
                    onChange={(e) =>
                      onSettingsChange(
                        "sideLogo.width",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Height (px)</Label>
                  <Input
                    type="number"
                    value={safeSideLogo.height}
                    onChange={(e) =>
                      onSettingsChange(
                        "sideLogo.height",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* Position and Size options for certain distribution types */}
              {(distributionType === "post-purchase" ||
                distributionType === "exit-intent") && (
                <div className="grid grid-cols-2 gap-3">
                  {safeSideLogo.position !== undefined && (
                    <div className="space-y-1">
                      <Label className="text-xs">Position</Label>
                      <select
                        value={safeSideLogo.position}
                        onChange={(e) =>
                          onSettingsChange("sideLogo.position", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  )}
                  {safeSideLogo.size !== undefined && (
                    <div className="space-y-1">
                      <Label className="text-xs">Size</Label>
                      <select
                        value={safeSideLogo.size}
                        onChange={(e) =>
                          onSettingsChange("sideLogo.size", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!safeSideLogo.enabled && (
            <p className="text-sm text-muted-foreground">
              Enable to add a side logo to your survey
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogoSettings;
