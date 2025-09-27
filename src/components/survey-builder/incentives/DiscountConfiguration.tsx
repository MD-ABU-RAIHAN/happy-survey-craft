import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Target,
  TrendingUp,
  Users,
  Calendar,
  Gift,
  Zap,
  BarChart3,
  Clock,
  Star,
  Award,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  Sparkles,
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
  // Advanced merchant features state
  const [advancedSettings, setAdvancedSettings] = useState({
    // Smart Targeting
    smartTargeting: false,
    responseQuality: "any", // any, complete, detailed
    customerSegment: "all", // all, new, returning, vip

    // Dynamic Pricing
    dynamicPricing: false,
    responseTimeBonus: false,
    qualityScoreThreshold: "7",

    // Fraud Prevention
    fraudPrevention: true,
    onePerCustomer: true,
    emailVerification: false,

    // Auto-Optimization
    autoOptimization: false,
    abTestVariants: false,
    conversionTracking: true,

    // Advanced Expiry
    customExpiry: false,
    expiryType: "days", // days, date, usage
    maxUsage: "1000",

    // Personalization
    personalizedCodes: false,
    customMessage: false,
    brandedEmail: false,
  });

  const generateSmartCode = () => {
    const prefixes = ["SURVEY", "FEEDBACK", "THANK", "SAVE"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const random = Math.floor(Math.random() * 100);
    setDiscountCode(`${prefix}${discountValue}${random}`);
  };

  const responseQualityOptions = [
    { value: "any", label: "Any Response", desc: "All survey completions" },
    { value: "complete", label: "Complete Response", desc: "All questions answered" },
    { value: "detailed", label: "Detailed Response", desc: "High-quality, thoughtful responses" },
  ];

  const customerSegmentOptions = [
    { value: "all", label: "All Customers", desc: "No restrictions" },
    { value: "new", label: "New Customers", desc: "First-time survey respondents" },
    { value: "returning", label: "Returning Customers", desc: "Previous customers" },
    { value: "vip", label: "VIP Customers", desc: "High-value customers" },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Basic Setup
          </TabsTrigger>
          <TabsTrigger value="smart" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Smart Features
          </TabsTrigger>
        </TabsList>

        {/* Basic Configuration */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Discount Configuration
              </CardTitle>
              <CardDescription>
                Set up your basic discount parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label className="flex items-center gap-2">
                    Discount Code
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateSmartCode}
                      className="h-6 px-2 text-xs"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generate
                    </Button>
                  </Label>
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

              <div className="space-y-2">
                <Label>Discount Description</Label>
                <Textarea
                  value={discountDescription}
                  onChange={(e) => setDiscountDescription(e.target.value)}
                  placeholder="Thank you for your valuable feedback! Use this code for 10% off your next purchase."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Features */}
        <TabsContent value="smart" className="space-y-6">
          {/* Smart Targeting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Smart Targeting
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Exclusive
                </Badge>
              </CardTitle>
              <CardDescription>
                Advanced targeting based on response quality and customer behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Smart Targeting</p>
                  <p className="text-sm text-muted-foreground">
                    Reward higher quality responses with better discounts
                  </p>
                </div>
                <SlimSwitch
                  checked={advancedSettings.smartTargeting}
                  onCheckedChange={(checked) =>
                    setAdvancedSettings(prev => ({ ...prev, smartTargeting: checked }))
                  }
                />
              </div>

              {advancedSettings.smartTargeting && (
                <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                  <div className="space-y-2">
                    <Label>Response Quality Required</Label>
                    <Select
                      value={advancedSettings.responseQuality}
                      onValueChange={(value) =>
                        setAdvancedSettings(prev => ({ ...prev, responseQuality: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {responseQualityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Customer Segment</Label>
                    <Select
                      value={advancedSettings.customerSegment}
                      onValueChange={(value) =>
                        setAdvancedSettings(prev => ({ ...prev, customerSegment: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {customerSegmentOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>


          {/* Fraud Prevention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Fraud Prevention
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  Security
                </Badge>
              </CardTitle>
              <CardDescription>
                Protect against abuse and ensure genuine responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">One Discount Per Customer</p>
                  <p className="text-sm text-muted-foreground">
                    Prevent multiple discounts from same user
                  </p>
                </div>
                <SlimSwitch
                  checked={advancedSettings.onePerCustomer}
                  onCheckedChange={(checked) =>
                    setAdvancedSettings(prev => ({ ...prev, onePerCustomer: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Verification Required</p>
                  <p className="text-sm text-muted-foreground">
                    Verify email before sending discount code
                  </p>
                </div>
                <SlimSwitch
                  checked={advancedSettings.emailVerification}
                  onCheckedChange={(checked) =>
                    setAdvancedSettings(prev => ({ ...prev, emailVerification: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Maximum Total Usage</Label>
                <Input
                  value={advancedSettings.maxUsage}
                  onChange={(e) =>
                    setAdvancedSettings(prev => ({ ...prev, maxUsage: e.target.value }))
                  }
                  placeholder="1000"
                  type="number"
                />
                <p className="text-xs text-muted-foreground">
                  Automatically disable after this many uses
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default DiscountConfiguration;