/**
 * Distribution Settings Component
 * Handles survey distribution configuration
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link, Mail, Share2, QrCode, Copy } from "lucide-react";
import { DistributionSettings as DistributionSettingsType } from "@/types";
import { useSurvey } from "@/store/useSurvey";

interface DistributionSettingsProps {
  settings: DistributionSettingsType;
  onUpdate: (updates: Partial<DistributionSettingsType>) => void;
}

export const DistributionSettings: React.FC<DistributionSettingsProps> = ({
  settings,
  onUpdate,
}) => {
  const { survey } = useSurvey();

  const generateSurveyUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/survey/${survey?.id || "preview"}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-survey-primary" />
            Survey Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Survey URL</Label>
            <div className="flex items-center gap-2">
              <Input
                value={generateSurveyUrl()}
                readOnly
                className="flex-1 bg-muted"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateSurveyUrl())}
                className="flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Distribution Channels</h4>
            {["email", "social", "website", "qr"].map((channel) => (
              <div
                key={channel}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {channel === "email" && (
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  )}
                  {channel === "social" && (
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  )}
                  {channel === "website" && (
                    <Link className="w-4 h-4 text-muted-foreground" />
                  )}
                  {channel === "qr" && (
                    <QrCode className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div>
                    <Label className="capitalize">{channel} Distribution</Label>
                    <p className="text-sm text-muted-foreground">
                      {channel === "email" &&
                        "Send survey invitations via email"}
                      {channel === "social" && "Share survey on social media"}
                      {channel === "website" && "Embed survey on your website"}
                      {channel === "qr" && "Generate QR code for mobile access"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.enabled.includes(channel)}
                  onCheckedChange={(checked) => {
                    const newEnabled = checked
                      ? [...settings.enabled, channel]
                      : settings.enabled.filter((c) => c !== channel);
                    onUpdate({ enabled: newEnabled });
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channel Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.enabled.map((channel) => (
              <div key={channel} className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium capitalize">{channel} Settings</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Trigger Delay</Label>
                    <Input
                      value={settings.settings[channel]?.triggerDelay || ""}
                      onChange={(e) =>
                        onUpdate({
                          settings: {
                            ...settings.settings,
                            [channel]: {
                              ...settings.settings[channel],
                              triggerDelay: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="e.g., 5 minutes"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Display Duration</Label>
                    <Input
                      value={settings.settings[channel]?.displayDuration || ""}
                      onChange={(e) =>
                        onUpdate({
                          settings: {
                            ...settings.settings,
                            [channel]: {
                              ...settings.settings[channel],
                              displayDuration: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="e.g., Always visible"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Textarea
                    value={settings.settings[channel]?.targetAudience || ""}
                    onChange={(e) =>
                      onUpdate({
                        settings: {
                          ...settings.settings,
                          [channel]: {
                            ...settings.settings[channel],
                            targetAudience: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Describe your target audience..."
                    rows={2}
                  />
                </div>
              </div>
            ))}

            {settings.enabled.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Enable distribution channels to configure their settings
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
