import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Percent,
  DollarSign,
} from "lucide-react";

interface DiscountConfigurationProps {
  discountType: "percentage" | "fixed";
  setDiscountType: (type: "percentage" | "fixed") => void;
  discountValue: string;
  setDiscountValue: (value: string) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountExpiryDays: string;
  setDiscountExpiryDays: (days: string) => void;
  discountDescription: string;
  setDiscountDescription: (description: string) => void;
}

const DiscountConfiguration: React.FC<DiscountConfigurationProps> = ({
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  discountCode,
  setDiscountCode,
  discountExpiryDays,
  setDiscountExpiryDays,
  discountDescription,
  setDiscountDescription,
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default DiscountConfiguration;