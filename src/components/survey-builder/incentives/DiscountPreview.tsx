import React from "react";
import { Label } from "@/components/ui/label";

interface DiscountPreviewProps {
  discountType: "percentage" | "fixed";
  discountValue: string;
  discountCode: string;
  discountExpiryDays: string;
  discountDescription: string;
}

const DiscountPreview: React.FC<DiscountPreviewProps> = ({
  discountType,
  discountValue,
  discountCode,
  discountExpiryDays,
  discountDescription,
}) => {
  return (
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
  );
};

export default DiscountPreview;