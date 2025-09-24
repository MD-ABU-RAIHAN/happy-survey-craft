/**
 * Incentive Settings Component
 * Handles survey incentive configuration
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Gift,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import { IncentiveSettings as IncentiveSettingsType } from "@/types";

interface IncentiveSettingsProps {
  settings: IncentiveSettingsType;
  onUpdate: (updates: Partial<IncentiveSettingsType>) => void;
}

export const IncentiveSettings: React.FC<IncentiveSettingsProps> = ({
  settings,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-survey-primary" />
            Survey Incentives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Incentives</Label>
              <p className="text-sm text-muted-foreground">
                Offer rewards to encourage survey participation
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => onUpdate({ enabled: checked })}
            />
          </div>

          {settings.enabled && (
            <div className="space-y-6 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Incentive Type</Label>
                  <Select
                    value={settings.type}
                    onValueChange={(value: "percentage" | "fixed") =>
                      onUpdate({ type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4" />
                          Percentage Discount
                        </div>
                      </SelectItem>
                      <SelectItem value="fixed">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Fixed Amount
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {settings.type === "percentage"
                      ? "Discount Percentage"
                      : "Fixed Amount"}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={settings.prefix}
                      onChange={(e) => onUpdate({ prefix: e.target.value })}
                      placeholder={settings.type === "percentage" ? "%" : "$"}
                      className="w-16"
                    />
                    <Input
                      value={settings.value}
                      onChange={(e) => onUpdate({ value: e.target.value })}
                      placeholder={
                        settings.type === "percentage" ? "10" : "5.00"
                      }
                      className="flex-1"
                      type="number"
                      min="0"
                      step={settings.type === "percentage" ? "1" : "0.01"}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={settings.expiry}
                  onChange={(e) => onUpdate({ expiry: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  When should this incentive expire?
                </p>
              </div>

              <div className="p-4 bg-survey-accent/10 border border-survey-accent/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-survey-primary mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium">Incentive Preview</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-sm">
                        {settings.type === "percentage"
                          ? `${settings.prefix}${settings.value}% Off`
                          : `${settings.prefix}${settings.value} Discount`}
                      </Badge>
                      {settings.expiry && (
                        <p className="text-sm text-muted-foreground">
                          Expires:{" "}
                          {new Date(settings.expiry).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {settings.enabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-survey-primary" />
                Distribution Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Distribution Method</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Participants</SelectItem>
                    <SelectItem value="random">Random Selection</SelectItem>
                    <SelectItem value="first">First N Participants</SelectItem>
                    <SelectItem value="completion">
                      On Survey Completion
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Maximum Redemptions</Label>
                <Input
                  type="number"
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
                <p className="text-sm text-muted-foreground">
                  Limit the total number of times this incentive can be used
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Additional Terms</Label>
                <Textarea
                  placeholder="Enter any additional terms and conditions for this incentive..."
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  These will be shown to participants along with the incentive
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
