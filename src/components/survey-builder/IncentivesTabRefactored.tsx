import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Gift } from "lucide-react";
import DiscountConfiguration from "./incentives/DiscountConfiguration";
import DiscountPreview from "./incentives/DiscountPreview";

interface IncentivesTabRefactoredProps {
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

const IncentivesTabRefactored: React.FC<IncentivesTabRefactoredProps> = ({
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
            <DiscountConfiguration
              discountType={discountType}
              setDiscountType={setDiscountType}
              discountValue={discountValue}
              setDiscountValue={setDiscountValue}
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              discountExpiryDays={discountExpiryDays}
              setDiscountExpiryDays={setDiscountExpiryDays}
              discountDescription={discountDescription}
              setDiscountDescription={setDiscountDescription}
            />

            <DiscountPreview
              discountType={discountType}
              discountValue={discountValue}
              discountCode={discountCode}
              discountExpiryDays={discountExpiryDays}
              discountDescription={discountDescription}
            />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default IncentivesTabRefactored;