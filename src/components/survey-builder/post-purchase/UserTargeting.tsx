import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Users } from "lucide-react";

interface UserTargetingSettings {
  type: "all-users" | "segment-users";
  userTag: {
    enabled: boolean;
    selectedTag: string;
  };
  customerType: "all" | "new" | "return";
  productPurchase: {
    enabled: boolean;
    selectedProducts: string[];
  };
}

interface UserTargetingProps {
  settings: UserTargetingSettings;
  onSettingsChange: (key: string, value: any) => void;
}

const UserTargeting: React.FC<UserTargetingProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 rounded-lg p-6 space-y-4 border border-secondary-brand/10">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-secondary-brand" />
          User Targeting
        </h5>
        <Badge
          variant="secondary"
          className="text-xs bg-secondary-brand/10 text-secondary-brand"
        >
          Step 1
        </Badge>
      </div>

      {/* Help Text */}
      <div className="bg-survey-info-light/30 border border-survey-info/20 rounded-lg p-3">
        <p className="text-xs text-survey-info flex items-start gap-2">
          <span className="text-survey-info font-bold text-sm">💡</span>
          <span>
            <strong>Tip:</strong> Start with "All Users" for maximum reach,
            then refine your targeting based on response data. Segment
            targeting can increase relevance but may reduce overall responses.
          </span>
        </p>
      </div>

      <div className="space-y-6">
        {/* Target Type Selection */}
        <div className="space-y-3">
          <Label className="font-medium">Target Audience</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="all-users"
                name="targetType"
                value="all-users"
                checked={settings.type === "all-users"}
                onChange={() => onSettingsChange("userTargeting.type", "all-users")}
                className="w-4 h-4 text-primary"
              />
              <Label htmlFor="all-users" className="text-sm cursor-pointer">
                All Users
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="segment-users"
                name="targetType"
                value="segment-users"
                checked={settings.type === "segment-users"}
                onChange={() => onSettingsChange("userTargeting.type", "segment-users")}
                className="w-4 h-4 text-primary"
              />
              <Label htmlFor="segment-users" className="text-sm cursor-pointer">
                A Segment of Users
              </Label>
            </div>
          </div>
        </div>

        {/* Segment Options */}
        {settings.type === "segment-users" && (
          <div className="space-y-4 ml-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.userTag.enabled}
                  onCheckedChange={(checked) =>
                    onSettingsChange("userTargeting.userTag.enabled", checked)
                  }
                />
                <Label className="text-sm">Filter by User Tag</Label>
              </div>
              {settings.userTag.enabled && (
                <Select
                  value={settings.userTag.selectedTag}
                  onValueChange={(value) =>
                    onSettingsChange("userTargeting.userTag.selectedTag", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP Customer</SelectItem>
                    <SelectItem value="premium">Premium User</SelectItem>
                    <SelectItem value="loyal">Loyal Customer</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm">Customer Type</Label>
              <Select
                value={settings.customerType}
                onValueChange={(value) =>
                  onSettingsChange("userTargeting.customerType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="new">New Customers</SelectItem>
                  <SelectItem value="return">Returning Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.productPurchase.enabled}
                  onCheckedChange={(checked) =>
                    onSettingsChange("userTargeting.productPurchase.enabled", checked)
                  }
                />
                <Label className="text-sm">Filter by Product Purchase</Label>
              </div>
              {settings.productPurchase.enabled && (
                <div className="space-y-2">
                  <Label className="text-xs">Select Products:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Product A", "Product B", "Product C", "Product D"].map(
                      (product) => (
                        <div key={product} className="flex items-center space-x-2">
                          <Checkbox
                            checked={settings.productPurchase.selectedProducts.includes(product)}
                            onCheckedChange={(checked) => {
                              const currentProducts = settings.productPurchase.selectedProducts;
                              const updatedProducts = checked
                                ? [...currentProducts, product]
                                : currentProducts.filter(p => p !== product);
                              onSettingsChange("userTargeting.productPurchase.selectedProducts", updatedProducts);
                            }}
                          />
                          <Label className="text-xs">{product}</Label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTargeting;