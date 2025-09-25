import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Gift,
  Percent,
  DollarSign,
} from "lucide-react";

interface IncentivesTabProps {
  isDiscountEnabled: boolean;
  setIsDiscountEnabled: (enabled: boolean) => void;
  discountType: "percentage" | "fixed";
  setDiscountType: (type: "percentage" | "fixed") => void;
  discountValue: string;
  setDiscountValue: (value: string) => void;
  discountDescription: string;
  setDiscountDescription: (description: string) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountExpiryDays: string;
  setDiscountExpiryDays: (days: string) => void;
}

const IncentivesTab: React.FC<IncentivesTabProps> = ({
  isDiscountEnabled,
  setIsDiscountEnabled,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  discountDescription,
  setDiscountDescription,
  discountCode,
  setDiscountCode,
  discountExpiryDays,
  setDiscountExpiryDays,
}) => {
  return (
    <div className="p-6 pt-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Incentive Settings</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Reward customers for completing your survey to increase response rates
        </p>
      </div>

      <Card
        className={`border-2 transition-all ${
          isDiscountEnabled
            ? "border-primary bg-survey-success-light/30"
            : "border-dashed border-muted"
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  <Gift className="w-4 h-4 text-survey-purple" />
                  Discount Incentives
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isDiscountEnabled
                    ? "Customers will receive a discount code after survey completion"
                    : "Enable discount rewards to boost survey completion rates"}
                </p>
              </div>
            </div>
            <Switch
              checked={isDiscountEnabled}
              onCheckedChange={setIsDiscountEnabled}
            />
          </div>
        </CardHeader>

        {isDiscountEnabled && (
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-survey-success-light to-survey-info-light p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select
                    value={discountType}
                    onValueChange={(value: "percentage" | "fixed") =>
                      setDiscountType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4" />
                          Percentage (%)
                        </div>
                      </SelectItem>
                      <SelectItem value="fixed">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Fixed Amount ($)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "percentage" ? "10" : "5.00"}
                    type="number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount Code</Label>
                  <Input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="SURVEY10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expires After (Days)</Label>
                  <Input
                    value={discountExpiryDays}
                    onChange={(e) => setDiscountExpiryDays(e.target.value)}
                    placeholder="30"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Discount Description</Label>
              <Input
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
                placeholder="Thank you! Use this code for 10% off your next purchase"
              />
            </div>

            {/* Discount Preview */}
            <div className="bg-white border border-muted rounded-lg p-4">
              <h5 className="font-semibold mb-3">Preview</h5>
              <div className="bg-gradient-to-r from-primary/10 to-secondary-brand/10 border border-primary/20 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎉</div>
                <h6 className="font-semibold text-lg mb-2">Survey Complete!</h6>
                <p className="text-sm text-muted-foreground mb-3">
                  {discountDescription ||
                    "Thank you! Use this code for your discount"}
                </p>
                <div className="bg-white border border-dashed border-primary rounded-lg p-3 inline-block">
                  <div className="text-xs text-muted-foreground mb-1">
                    Your Discount Code:
                  </div>
                  <div className="font-mono font-bold text-primary text-xl">
                    {discountCode || "SURVEY10"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {discountType === "percentage"
                      ? `${discountValue || "10"}% off`
                      : `$${discountValue || "5.00"} off`}
                    {" • "}
                    Expires in {discountExpiryDays || "30"} days
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default IncentivesTab;