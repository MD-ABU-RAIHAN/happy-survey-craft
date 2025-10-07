import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Percent,
  DollarSign,
  Truck,
  Code,
  User,
  Sparkles,
  Settings,
  AlertCircle,
} from "lucide-react";
import QuillEditor from "../distribution/shared/QuillEditor";
import "react-quill/dist/quill.snow.css";

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
  // New customization props
  rewardTitle: string;
  setRewardTitle: (title: string) => void;
  discountMessage: string;
  setDiscountMessage: (message: string) => void;
  actionMessage: string;
  setActionMessage: (message: string) => void;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  // Email configuration props
  emailSubject: string;
  setEmailSubject: (subject: string) => void;
  emailBody: string;
  setEmailBody: (body: string) => void;
  fromEmail: string;
  setFromEmail: (email: string) => void;
  // Banner configuration props
  showDiscountBanner?: boolean;
  setShowDiscountBanner?: (show: boolean) => void;
  discountBannerMessage?: string;
  setDiscountBannerMessage?: (message: string) => void;
}

type DiscountSource = "merchant" | "app";
type AppDiscountType = "percentage" | "fixed" | "free_shipping";
type DeliveryMethod = "email" | "thank_you_page";

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
  rewardTitle,
  setRewardTitle,
  discountMessage,
  setDiscountMessage,
  actionMessage,
  setActionMessage,
  deliveryMethod,
  setDeliveryMethod,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
  fromEmail,
  setFromEmail,
  // Banner props
  showDiscountBanner,
  setShowDiscountBanner,
  discountBannerMessage,
  setDiscountBannerMessage,
}) => {
  // Local state for discount configuration
  const [discountSource, setDiscountSource] = useState<DiscountSource>("app");
  const [appDiscountType, setAppDiscountType] =
    useState<AppDiscountType>("percentage");
  const [merchantCouponCode, setMerchantCouponCode] = useState("");

  // Common settings
  const [limitOnePerCustomer, setLimitOnePerCustomer] = useState(true);
  const [hasUsageLimit, setHasUsageLimit] = useState(false);
  const [usageLimit, setUsageLimit] = useState("100");

  // Generate default discount message based on type
  const generateDiscountMessage = (type: AppDiscountType, value: string) => {
    switch (type) {
      case "percentage":
        return `Enjoy ${value}% off your next purchase!`;
      case "fixed":
        return `Enjoy $${value} off your next purchase!`;
      case "free_shipping":
        return "Enjoy free shipping on your next order!";
      default:
        return "Enjoy your discount!";
    }
  };

  // Update discount message when app discount type or value changes
  useEffect(() => {
    if (discountSource === "app") {
      setDiscountMessage(
        generateDiscountMessage(appDiscountType, discountValue)
      );
    }
  }, [appDiscountType, discountValue, discountSource, setDiscountMessage]);

  // Update discount code when app discount type changes
  useEffect(() => {
    if (discountSource === "app") {
      const generateAppCode = () => {
        const prefixes = {
          percentage: "SAVE",
          fixed: "OFF",
          free_shipping: "SHIP",
        };
        const prefix = prefixes[appDiscountType];
        const timestamp = Date.now().toString().slice(-4);
        const randomNum = Math.floor(Math.random() * 100)
          .toString()
          .padStart(2, "0");
        return `${prefix}${timestamp}${randomNum}`;
      };
      setDiscountCode(generateAppCode());
    }
  }, [discountSource, appDiscountType, setDiscountCode]);

  // Sync legacy props with new app discount type
  useEffect(() => {
    if (discountSource === "app" && appDiscountType !== "free_shipping") {
      setDiscountType(appDiscountType);
    }
  }, [appDiscountType, discountSource, setDiscountType]);

  return (
    <div className="space-y-6">
      {/* Discount Source Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Discount Source
          </CardTitle>
          <CardDescription>
            Choose how discount codes will be created and managed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={discountSource}
            onValueChange={(value: DiscountSource) => setDiscountSource(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="merchant" id="merchant" />
              <div className="flex-1">
                <Label
                  htmlFor="merchant"
                  className="flex items-center gap-2 font-medium cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  Merchant Generated
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Use existing discount codes from your Shopify admin dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="app" id="app" />
              <div className="flex-1">
                <Label
                  htmlFor="app"
                  className="flex items-center gap-2 font-medium cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  App Generated
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Let our app automatically create and manage discount codes
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Merchant Generated Configuration */}
      {discountSource === "merchant" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5" />
              Existing Discount Code
            </CardTitle>
            <CardDescription>
              Enter a discount code that already exists in your Shopify admin
              dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchant-code">Shopify Discount Code</Label>
              <Input
                id="merchant-code"
                value={merchantCouponCode}
                onChange={(e) => {
                  setMerchantCouponCode(e.target.value);
                  setDiscountCode(e.target.value);
                }}
                placeholder="Enter existing coupon code (e.g., SUMMER2024)"
                className="font-mono"
              />
              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Important:</p>
                  <p>
                    Make sure this discount code exists in your Shopify admin →
                    Discounts section. The app will validate this code before
                    using it.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* App Generated Configuration */}
      {discountSource === "app" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              App Generated Discount
            </CardTitle>
            <CardDescription>
              Configure the discount that will be automatically created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select
                value={appDiscountType}
                onValueChange={(value: AppDiscountType) =>
                  setAppDiscountType(value)
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
                  <SelectItem value="free_shipping">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Free Shipping
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discount Value (only for percentage and fixed amount) */}
            {appDiscountType !== "free_shipping" && (
              <div className="space-y-2">
                <Label>Discount Value</Label>
                <Input
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={appDiscountType === "percentage" ? "10" : "5.00"}
                  type="number"
                />
              </div>
            )}

            {/* Auto-generated code display (read-only) */}
            <div className="space-y-2">
              <Label>Generated Discount Code</Label>
              <Input
                value={discountCode}
                readOnly
                className="font-mono bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                This code is automatically generated and cannot be edited
              </p>
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

            {/* Usage Controls for App Generated */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Once Per Customer</p>
                  <p className="text-sm text-muted-foreground">
                    Each customer can use this discount only once
                  </p>
                </div>
                <SlimSwitch
                  checked={limitOnePerCustomer}
                  onCheckedChange={setLimitOnePerCustomer}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Total Usage Limit (Optional)</p>
                  </div>
                  <SlimSwitch
                    checked={hasUsageLimit}
                    onCheckedChange={setHasUsageLimit}
                  />
                </div>

                {hasUsageLimit && (
                  <div className="space-y-2">
                    <Input
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(e.target.value)}
                      placeholder="Unlimited"
                      type="number"
                    />
                    <p className="text-xs text-muted-foreground">
                      Discount will be automatically disabled after this many
                      uses
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Delivery Method
          </CardTitle>
          <CardDescription>
            Choose how customers will receive their discount codes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={deliveryMethod}
            onValueChange={(value: DeliveryMethod) => setDeliveryMethod(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="email" id="email-delivery" />
              <div className="flex-1">
                <Label
                  htmlFor="email-delivery"
                  className="flex items-center gap-2 font-medium cursor-pointer"
                >
                  📧 Email
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Send discount code to customer's email address
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="thank_you_page" id="thank-you-delivery" />
              <div className="flex-1">
                <Label
                  htmlFor="thank-you-delivery"
                  className="flex items-center gap-2 font-medium cursor-pointer"
                >
                  🎉 Thank You Page
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Display discount code on the survey completion page
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Discount Banner Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🎯 Survey Discount Banner
          </CardTitle>
          <CardDescription>
            Show participants there's a discount available before they start the
            survey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Discount Banner</p>
              <p className="text-sm text-muted-foreground">
                Display incentive message to motivate survey completion
              </p>
            </div>
            <SlimSwitch
              checked={showDiscountBanner || false}
              onCheckedChange={(checked) => setShowDiscountBanner?.(checked)}
            />
          </div>

          {showDiscountBanner && (
            <div className="space-y-4 pt-4 border-t border-muted/50">
              <div className="space-y-2">
                <Label>Banner Message</Label>
                <Input
                  value={discountBannerMessage || ""}
                  onChange={(e) => setDiscountBannerMessage?.(e.target.value)}
                  placeholder="Complete this quick survey and get cupon code for your next order!"
                />
                <p className="text-xs text-muted-foreground">
                  Use {"{{"} discount.value {"}"} for dynamic discount amount
                  (e.g., "10%" or "$5")
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Configuration - Only show when email delivery is selected */}
      {deliveryMethod === "email" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📧 Email Configuration
            </CardTitle>
            <CardDescription>
              Configure how the discount email will be sent and displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>From Email Address</Label>
              <Input
                type="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder="noreply@yourstore.com"
              />
              <p className="text-xs text-muted-foreground">
                The email address that will appear as the sender
              </p>
            </div>

            <div className="space-y-2">
              <Label>Email Subject</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Thank you for taking the survey for MS-Store-Dev-2! Here's your exclusive coupon reward"
              />
              <p className="text-xs text-muted-foreground">
                Subject line for the discount email
              </p>
            </div>

            <div className="space-y-2">
              <Label>Email Body</Label>
              <QuillEditor
                value={emailBody}
                onChange={(content: string) => setEmailBody(content)}
                placeholder="<h2>Congratulations! Here's your exclusive coupon reward</h2>

<p>Dear {{customer.name}},</p>

<p>Thank you for participating in our survey. Your feedback is valuable to us, and we appreciate you taking the time to share your thoughts.</p>

<p>As a token of our gratitude, we would like to offer you a reward that you can use on your next purchase.</p>

<div style='text-align: center; margin: 30px 0;'>
  <div style='background-color: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 20px; display: inline-block;'>
    <h3 style='margin: 0; font-size: 24px; font-weight: bold; color: #333;'>{{discount.code}}</h3>
  </div>
</div>

<p style='text-align: center; color: #e74c3c; font-size: 12px;'>⚠️ This email is auto-generated. Please don't reply to this email.</p>

<p style='text-align: center; color: #6c757d; font-size: 12px;'>If you don't want to receive these emails → <a href='#' style='color: #007bff;'>Unsubscribe</a></p>"
                className="bg-white"
              />
              <p className="text-xs text-muted-foreground">
                Main content of the discount email. You can use variables like{" "}
                {"{{customer.name}}"}, {"{{discount.code}}"},{" "}
                {"{{discount.message}}"}, {"{{discount.expiry}}"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discount Text Customization - Only show when thank you page delivery is selected */}
      {deliveryMethod === "thank_you_page" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Discount Text Customization
            </CardTitle>
            <CardDescription>
              Customize the text displayed to customers with their discount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Reward Title</Label>
              <Input
                value={rewardTitle}
                onChange={(e) => setRewardTitle(e.target.value)}
                placeholder="🎁 Here's your reward!"
              />
              <p className="text-xs text-muted-foreground">
                Main heading shown when displaying the discount
              </p>
            </div>

            <div className="space-y-2">
              <Label>Discount Message</Label>
              <Input
                value={discountMessage}
                onChange={(e) => setDiscountMessage(e.target.value)}
                placeholder="Enjoy 10% off your next purchase!"
              />
              <p className="text-xs text-muted-foreground">
                Main message describing the discount offer
              </p>
            </div>

            <div className="space-y-2">
              <Label>Action Message</Label>
              <Input
                value={actionMessage}
                onChange={(e) => setActionMessage(e.target.value)}
                placeholder="Save this code for your next purchase"
              />
              <p className="text-xs text-muted-foreground">
                Instructions for what customers should do with the code
              </p>
            </div>

            {/* Customer Message moved from Discount Description section */}
            <div className="space-y-2">
              <Label>Customer Message</Label>
              <Textarea
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
                placeholder="Thank you for your valuable feedback! Use this code for your next purchase."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Message that will be shown to customers with their discount code
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscountConfiguration;
