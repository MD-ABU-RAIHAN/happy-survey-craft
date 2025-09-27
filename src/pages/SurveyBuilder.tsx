import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/quill-custom.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Settings,
  Edit3,
  Eye,
  Save,
  Clock,
  Target,
  MapPin,
  Users,
  Globe,
  Smartphone,
  Tag,
  Percent,
  DollarSign,
  Gift,
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Mail,
  MousePointer,
  ShoppingCart,
  Monitor,
  Upload,
  Image,
  Palette,
  Type,
  Layout,
  Code,
  RotateCcw,
  Link,
  Copy,
  Check,
  Minimize,
  Maximize,
  Sliders,
  Brush,
  Camera,
  Layers,
} from "lucide-react";
import QuestionBuilder from "@/components/QuestionBuilder";
import SurveyPreview from "@/components/SurveyPreview";
import SimpleHeader from "@/components/SimpleHeader";
import DistributionTabRefactored from "@/components/survey-builder/DistributionTabRefactored";
import IncentivesTabRefactored from "@/components/survey-builder/IncentivesTabRefactored";

interface SurveyQuestion {
  id: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "dropdown"
    | "binary-choice"
    | "text"
    | "rating"
    | "satisfaction"
    | "nps"
    | "email"
    | "phone"
    | "date"
    | "short-answer";
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
  placeholder?: string;
  // New properties for specific question types
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
  satisfactionScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
    showNumbers: boolean;
  };
  maxLength?: number; // For short answer
}

interface PostPurchaseSettings {
  // User Targeting
  userTargeting: {
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
  };

  // Post-purchase Page Integration
  postPurchasePage: {
    shopifyCheckout: boolean;
    installationSteps: {
      orderStatusPage: string;
      thankYouPage: string;
    };
    displayLocation: "thank-you" | "order-status" | "both";
  };

  // Side Logo
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };

  // Display Settings
  display: {
    delay: number; // seconds after purchase
    duration: number; // seconds to show
    position:
      | "center"
      | "bottom-right"
      | "bottom-left"
      | "top-right"
      | "top-left";
    animation:
      | "fade"
      | "slide-up"
      | "slide-down"
      | "slide-right"
      | "slide-left";
  };

  // Button Customization
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };

  // Section Customization
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface BrandedSurveySettings {
  // Auto-generated page link
  customUrl: string;
  useCustomDomain: boolean;
  customDomain: string;

  // Header Logo
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "center" | "right";
    minimized: boolean;
  };

  // Side Logo
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };

  // Button Customization
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: "normal" | "medium" | "semibold" | "bold";
    minimized: boolean;
    shadow: boolean;
  };

  // Section Colors and Customization
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };

  // Background Options
  background: {
    type: "solid" | "gradient" | "image";
    solidColor: string;
    gradientStart: string;
    gradientEnd: string;
    gradientDirection:
      | "to-r"
      | "to-l"
      | "to-t"
      | "to-b"
      | "to-br"
      | "to-bl"
      | "to-tr"
      | "to-tl";
    imageUrl: string;
    imageFile: File | null;
    imagePosition: "center" | "top" | "bottom" | "left" | "right";
    imageSize: "cover" | "contain" | "auto";
    overlay: boolean;
    overlayColor: string;
    overlayOpacity: number;
  };

  // Typography
  typography: {
    fontFamily: string;
    headingFont: string;
    bodyFont: string;
    fontSize: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    lineHeight: number;
    letterSpacing: number;
  };

  // Progress Bar
  progressBar: {
    enabled: boolean;
    color: string;
    backgroundColor: string;
    style: "linear" | "circular" | "steps";
    position: "top" | "bottom" | "floating";
    showPercentage: boolean;
  };

  // Animation Settings
  animations: {
    enabled: boolean;
    transitionSpeed: "slow" | "normal" | "fast";
    slideDirection:
      | "fade"
      | "slide-right"
      | "slide-left"
      | "slide-up"
      | "slide-down";
  };

  // Trust Signals
  trustSignals: {
    showSSL: boolean;
    showPrivacyBadge: boolean;
    showDataProtection: boolean;
    customBadgeText: string;
  };

  // Thank You Page
  thankYouPage: {
    enabled: boolean;
    title: string;
    message: string;
    backgroundColor: string;
    textColor: string;
    showSocialShare: boolean;
    redirectUrl: string;
    autoRedirect: boolean;
    redirectDelay: number;
  };

  // Custom CSS
  customCss: {
    enabled: boolean;
    css: string;
  };
}

interface ExitIntentSettings {
  // Show pop-up conditions
  showPopup: {
    emptyCart: boolean;
    hasProducts: boolean;
  };

  // Recurrence settings
  recurrence: "only-once" | "every-incomplete";

  // Side Logo
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };

  // Button customization
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };

  // Section customization
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface EmailCampaignSettings {
  // User Targeting
  userTargeting: {
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
  };

  // Email Configuration
  emailConfig: {
    delayAfter: number; // in days
    sendFrom: string;
    blockDuplicate: number; // in days
  };

  // Header Logo
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "center" | "right";
    minimized: boolean;
  };

  // Email Content
  content: {
    subject: string;
    body: string; // Rich text HTML
  };

  // Button customization
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };

  // Section customization
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface OnSitePopupSettings {
  // Page Targeting
  pageTargeting: {
    type: "all-pages" | "specific-pages" | "exclude-pages";
    specificPages: {
      homePage: boolean;
      productPages: {
        enabled: boolean;
        type: "all" | "specific";
        selectedProducts: string[];
      };
      blogPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
    };
    excludePages: {
      homePage: boolean;
      productPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
      blogPages: boolean;
    };
  };

  // Display Settings
  display: {
    position: "center" | "bottom-right" | "top-center";
  };

  // Side Logo
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };

  // Button customization
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };

  // Section customization
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

const SurveyBuilder = () => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "mobile" | "full"
  >("desktop");

  // State for tracking which distribution to preview
  const [previewDistribution, setPreviewDistribution] = useState<
    | "branded-survey"
    | "post-purchase"
    | "exit-intent"
    | "email-campaign"
    | "onsite-popup"
  >("branded-survey");

  // Pagination state
  const [paginationEnabled, setPaginationEnabled] = useState(false);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);

  // Distribution Settings
  const [enabledDistributions, setEnabledDistributions] = useState<string[]>([
    "branded-survey",
  ]);
  const [expandedDistributionId, setExpandedDistributionId] = useState<
    string | null
  >(null);
  const [distributionSettings, setDistributionSettings] = useState({
    "branded-survey": {
      triggerDelay: "3",
      displayDuration: "30",
      targetAudience: "all-customers",
    },
    "post-purchase": {
      triggerDelay: "3",
      displayDuration: "30",
      targetAudience: "all-customers",
    },
    "exit-intent": {
      triggerDelay: "5",
      displayDuration: "15",
      targetAudience: "all-customers",
    },
    "email-campaign": {
      triggerDelay: "0",
      displayDuration: "0",
      targetAudience: "all-customers",
    },
    "onsite-popup": {
      triggerDelay: "10",
      displayDuration: "20",
      targetAudience: "all-customers",
    },
  });

  // Post-Purchase Settings
  const [postPurchaseSettings, setPostPurchaseSettings] =
    useState<PostPurchaseSettings>({
      userTargeting: {
        type: "all-users",
        userTag: {
          enabled: false,
          selectedTag: "",
        },
        customerType: "all",
        productPurchase: {
          enabled: false,
          selectedProducts: [],
        },
      },
      postPurchasePage: {
        shopifyCheckout: false,
        installationSteps: {
          orderStatusPage:
            "https://admin.shopify.com/settings/checkout/extensions/add-order-status",
          thankYouPage:
            "https://admin.shopify.com/settings/checkout/extensions/add-thank-you",
        },
        displayLocation: "thank-you",
      },
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "small",
        position: "right",
        minimized: false,
      },
      display: {
        delay: 3,
        duration: 30,
        position: "center",
        animation: "fade",
      },
      button: {
        enabled: true,
        backgroundColor: "#3b82f6",
        textColor: "#ffffff",
        borderRadius: 8,
        fontSize: 16,
        fontWeight: "medium",
        backgroundHoverColor: "#2563eb",
        shadow: true,
      },
      section: {
        primaryText: "We'd love your feedback!",
        secondaryText: "Help us improve your experience",
        accentColor: "#3b82f6",
        backgroundColor: "#ffffff",
        backgroundType: "solid",
        gradientFrom: "#3b82f6",
        gradientTo: "#8b5cf6",
        gradientDirection: "to-r",
        backgroundImage: "",
        backgroundImageOpacity: 100,
        backgroundImagePosition: "center",
        customCss: "",
        enableCustomCss: false,
      },
    });

  // Available user tags (typically from customer management system)
  const availableUserTags = [
    { value: "vip-customer", label: "VIP Customer" },
    { value: "first-time-buyer", label: "First-time Buyer" },
    { value: "loyalty-member", label: "Loyalty Member" },
    { value: "high-value", label: "High Value Customer" },
    { value: "mobile-user", label: "Mobile User" },
    { value: "email-subscriber", label: "Email Subscriber" },
  ];

  // Available products (typically from inventory system)
  const availableProducts = [
    { id: "prod-1", name: "Premium T-Shirt", category: "Apparel" },
    { id: "prod-2", name: "Wireless Headphones", category: "Electronics" },
    { id: "prod-3", name: "Coffee Mug Set", category: "Home & Kitchen" },
    { id: "prod-4", name: "Laptop Stand", category: "Office" },
    { id: "prod-5", name: "Yoga Mat", category: "Fitness" },
  ];

  // Discount Settings
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage"
  );
  const [discountValue, setDiscountValue] = useState("10");
  const [discountPrefix, setDiscountPrefix] = useState("SURVEY");
  const [discountExpiry, setDiscountExpiry] = useState("30");
  const [discountDescription, setDiscountDescription] = useState(
    "Thank you! Use this code for 10% off your next purchase"
  );

  // Product Selection Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [productSortBy, setProductSortBy] = useState<"name" | "category">(
    "name"
  );

  // Branded Survey Settings
  const [brandedSurveySettings, setBrandedSurveySettings] =
    useState<BrandedSurveySettings>({
      customUrl: `survey-${Math.random().toString(36).substring(2, 8)}`,
      useCustomDomain: false,
      customDomain: "",
      headerLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "left",
        minimized: true,
      },
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "small",
        position: "right",
        minimized: true,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        borderRadius: 6,
        fontSize: 14,
        fontWeight: "medium",
        minimized: true,
        shadow: true,
      },
      section: {
        primaryText: "#1f2937",
        secondaryText: "#6b7280",
        accentColor: "#3b82f6",
        backgroundColor: "#ffffff",
        backgroundType: "solid",
        gradientFrom: "#f8fafc",
        gradientTo: "#e2e8f0",
        gradientDirection: "to-br",
        backgroundImage: "",
        backgroundImageOpacity: 80,
        backgroundImagePosition: "center",
        customCss: "",
        enableCustomCss: false,
      },
      background: {
        type: "solid",
        solidColor: "#ffffff",
        gradientStart: "#f8fafc",
        gradientEnd: "#e2e8f0",
        gradientDirection: "to-br",
        imageUrl: "",
        imageFile: null,
        imagePosition: "center",
        imageSize: "cover",
        overlay: false,
        overlayColor: "#000000",
        overlayOpacity: 0.3,
      },
      typography: {
        fontFamily: "Inter",
        headingFont: "Inter",
        bodyFont: "Inter",
        fontSize: {
          small: 12,
          medium: 14,
          large: 16,
          xlarge: 24,
        },
        lineHeight: 1.5,
        letterSpacing: 0,
      },
      progressBar: {
        enabled: true,
        color: "#3b82f6",
        backgroundColor: "#e5e7eb",
        style: "linear",
        position: "top",
        showPercentage: true,
      },
      animations: {
        enabled: true,
        transitionSpeed: "normal",
        slideDirection: "fade",
      },
      trustSignals: {
        showSSL: true,
        showPrivacyBadge: true,
        showDataProtection: false,
        customBadgeText: "Your data is secure",
      },
      thankYouPage: {
        enabled: true,
        title: "Thank you!",
        message:
          "We appreciate your feedback and will use it to improve our services.",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        showSocialShare: false,
        redirectUrl: "",
        autoRedirect: false,
        redirectDelay: 3,
      },
      customCss: {
        enabled: false,
        css: "/* Custom CSS */\n",
      },
    });

  // Exit Intent Survey Settings
  const [exitIntentSettings, setExitIntentSettings] =
    useState<ExitIntentSettings>({
      showPopup: {
        emptyCart: true,
        hasProducts: true,
      },
      recurrence: "only-once",
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "right",
        minimized: true,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        minimized: true,
      },
      section: {
        primaryTextColor: "#1f2937",
        secondaryTextColor: "#6b7280",
        accentColor: "#3b82f6",
        backgroundColor: "#ffffff",
      },
    });

  // Email Campaign Settings
  const [emailCampaignSettings, setEmailCampaignSettings] =
    useState<EmailCampaignSettings>({
      userTargeting: {
        type: "all-users",
        userTag: {
          enabled: false,
          selectedTag: "",
        },
        customerType: "all",
        productPurchase: {
          enabled: false,
          selectedProducts: [],
        },
      },
      emailConfig: {
        delayAfter: 7, // 7 days default
        sendFrom: "",
        blockDuplicate: 30, // 30 days default
      },
      headerLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "center",
        minimized: true,
      },
      content: {
        subject: "We'd love your feedback!",
        body: `<p>Hi there!</p>
<p>We hope you're enjoying your recent purchase. Your feedback is incredibly valuable to us and helps improve our products and services.</p>
<p>Would you mind taking a few minutes to share your thoughts in our quick survey?</p>
<p>Thank you for your time!</p>
<p>Best regards,<br>Your Customer Success Team</p>`,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        minimized: true,
      },
      background: {
        type: "solid",
        solidColor: "#ffffff",
        gradientStart: "#f8fafc",
        gradientEnd: "#e2e8f0",
        gradientDirection: "to-br",
        imageUrl: "",
        imageFile: null,
        imagePosition: "center",
        imageSize: "cover",
        overlay: false,
        overlayColor: "#000000",
        overlayOpacity: 0.3,
      },
    });

  // On-Site Popup Settings
  const [onSitePopupSettings, setOnSitePopupSettings] =
    useState<OnSitePopupSettings>({
      pageTargeting: {
        type: "all-pages",
        specificPages: {
          homePage: false,
          productPages: {
            enabled: false,
            type: "all",
            selectedProducts: [],
          },
          blogPages: false,
          collectionPages: false,
          cartPage: false,
        },
        excludePages: {
          homePage: false,
          productPages: false,
          collectionPages: false,
          cartPage: false,
          blogPages: false,
        },
      },
      display: {
        position: "bottom-right",
      },
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "right",
        minimized: true,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        minimized: true,
      },
      section: {
        primaryTextColor: "#1f2937",
        secondaryTextColor: "#6b7280",
        accentColor: "#3b82f6",
        backgroundColor: "#ffffff",
        minimized: true,
      },
    });

  // Brand Presets
  const brandPresets = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design",
      icon: Layout,
      settings: {
        button: {
          textColor: "#ffffff",
          backgroundColor: "#6366f1",
          backgroundHoverColor: "#4f46e5",
          borderRadius: 8,
        },
        section: {
          primaryTextColor: "#111827",
          secondaryTextColor: "#6b7280",
          headingColor: "#1f2937",
          linkColor: "#6366f1",
        },
        background: {
          type: "gradient" as const,
          gradientStart: "#ffffff",
          gradientEnd: "#f8fafc",
          gradientDirection: "to-br" as const,
        },
      },
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant design",
      icon: Minimize,
      settings: {
        button: {
          textColor: "#374151",
          backgroundColor: "#ffffff",
          backgroundHoverColor: "#f9fafb",
          borderRadius: 4,
        },
        section: {
          primaryTextColor: "#111827",
          secondaryTextColor: "#4b5563",
          headingColor: "#000000",
          linkColor: "#374151",
        },
        background: {
          type: "solid" as const,
          solidColor: "#ffffff",
        },
      },
    },
    {
      id: "vibrant",
      name: "Vibrant",
      description: "Bold and energetic colors",
      icon: Palette,
      settings: {
        button: {
          textColor: "#ffffff",
          backgroundColor: "#ec4899",
          backgroundHoverColor: "#db2777",
          borderRadius: 12,
        },
        section: {
          primaryTextColor: "#1f2937",
          secondaryTextColor: "#6b7280",
          headingColor: "#ec4899",
          linkColor: "#ec4899",
        },
        background: {
          type: "gradient" as const,
          gradientStart: "#fdf2f8",
          gradientEnd: "#fce7f3",
          gradientDirection: "to-br" as const,
        },
      },
    },
  ];

  const [copiedUrl, setCopiedUrl] = useState(false);

  // Distribution types configuration
  const distributionTypes = [
    {
      id: "branded-survey",
      name: "Branded Survey",
      description: "Customized survey with your brand colors and logo",
      icon: Monitor,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      id: "post-purchase",
      name: "Post-Purchase Survey",
      description: "Collect feedback immediately after purchase completion",
      icon: ShoppingCart,
      color: "text-secondary-brand",
      bgColor: "bg-secondary-brand/10",
      borderColor: "border-secondary-brand/20",
    },
    {
      id: "exit-intent",
      name: "Exit-Intent Survey",
      description: "Capture feedback when visitors are about to leave",
      icon: MousePointer,
      color: "text-survey-purple",
      bgColor: "bg-survey-purple/10",
      borderColor: "border-survey-purple/20",
    },
    {
      id: "email-campaign",
      name: "Email Campaign",
      description: "Send survey links via email to your customer base",
      icon: Mail,
      color: "text-survey-success",
      bgColor: "bg-survey-success/10",
      borderColor: "border-survey-success/20",
    },
    {
      id: "onsite-popup",
      name: "On-Site Popup",
      description: "Display survey as popup on your website",
      icon: Globe,
      color: "text-survey-warning",
      bgColor: "bg-survey-warning/10",
      borderColor: "border-survey-warning/20",
    },
  ];

  // Distribution helper functions
  const toggleDistribution = (distributionId: string) => {
    setEnabledDistributions((prev) => {
      const isCurrentlyEnabled = prev.includes(distributionId);
      if (isCurrentlyEnabled) {
        return prev.filter((id) => id !== distributionId);
      } else {
        // When enabling a distribution, automatically expand it and set it as preview
        setExpandedDistributionId(distributionId);
        setPreviewDistribution(distributionId as typeof previewDistribution);
        return [...prev, distributionId];
      }
    });
  };

  const toggleCollapsed = (distributionId: string) => {
    setExpandedDistributionId((prev) => {
      const newExpandedId = prev === distributionId ? null : distributionId;

      // Update preview distribution when expanding a distribution
      if (newExpandedId) {
        setPreviewDistribution(newExpandedId as typeof previewDistribution);
      }

      return newExpandedId;
    });
  };

  const updateDistributionSetting = (
    distributionId: string,
    key: string,
    value: string
  ) => {
    setDistributionSettings((prev) => ({
      ...prev,
      [distributionId]: {
        ...prev[distributionId as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  // Branded Survey Helper Functions
  const updateBrandedSetting = (path: string, value: unknown) => {
    setBrandedSurveySettings((prev) => {
      const keys = path.split(".");
      const result = { ...prev };
      let current: Record<string, unknown> = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return result as BrandedSurveySettings;
    });
  };

  // Post-Purchase Helper Functions
  const updatePostPurchaseSetting = (path: string, value: unknown) => {
    setPostPurchaseSettings((prev) => {
      const keys = path.split(".");
      const result = { ...prev };
      let current: Record<string, unknown> = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return result as PostPurchaseSettings;
    });
  };

  const handlePostPurchaseFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      updatePostPurchaseSetting("sideLogo.file", file);
      updatePostPurchaseSetting("sideLogo.url", url);
    };
    reader.readAsDataURL(file);
  };

  // Exit Intent Helper Functions
  const updateExitIntentSetting = (path: string, value: unknown) => {
    setExitIntentSettings((prev) => {
      const keys = path.split(".");
      const result = { ...prev };
      let current: Record<string, unknown> = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return result as ExitIntentSettings;
    });
  };

  const handleExitIntentFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      updateExitIntentSetting("sideLogo.file", file);
      updateExitIntentSetting("sideLogo.url", url);
    };
    reader.readAsDataURL(file);
  };

  const resetExitIntentToDefault = () => {
    setExitIntentSettings({
      showPopup: {
        emptyCart: true,
        hasProducts: true,
      },
      recurrence: "only-once",
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "right",
        minimized: true,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        minimized: true,
      },
      section: {
        primaryTextColor: "#1f2937",
        secondaryTextColor: "#6b7280",
        accentColor: "#3b82f6",
        backgroundColor: "#ffffff",
      },
    });
  };

  // Email Campaign Helper Functions
  const updateEmailCampaignSetting = (path: string, value: unknown) => {
    setEmailCampaignSettings((prev) => {
      const keys = path.split(".");
      const result = { ...prev };
      let current: Record<string, unknown> = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return result as EmailCampaignSettings;
    });
  };

  const handleEmailCampaignFileUpload = (
    type: "header" | "background",
    file: File
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (type === "background") {
        updateEmailCampaignSetting("background.imageFile", file);
        updateEmailCampaignSetting("background.imageUrl", url);
      } else {
        updateEmailCampaignSetting("headerLogo.file", file);
        updateEmailCampaignSetting("headerLogo.url", url);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetEmailCampaignToDefault = () => {
    setEmailCampaignSettings({
      userTargeting: {
        type: "all-users",
        userTag: {
          enabled: false,
          selectedTag: "",
        },
        customerType: "all",
        productPurchase: {
          enabled: false,
          selectedProducts: [],
        },
      },
      emailConfig: {
        delayAfter: 7,
        sendFrom: "",
        blockDuplicate: 30,
      },
      headerLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "center",
        minimized: true,
      },
      content: {
        subject: "We'd love your feedback!",
        body: `<p>Hi there!</p>
<p>We hope you're enjoying your recent purchase. Your feedback is incredibly valuable to us and helps improve our products and services.</p>
<p>Would you mind taking a few minutes to share your thoughts in our quick survey?</p>
<p>Thank you for your time!</p>
<p>Best regards,<br>Your Customer Success Team</p>`,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        minimized: true,
      },
      background: {
        type: "solid",
        solidColor: "#ffffff",
        gradientStart: "#f8fafc",
        gradientEnd: "#e2e8f0",
        gradientDirection: "to-br",
        imageUrl: "",
        imageFile: null,
        imagePosition: "center",
        imageSize: "cover",
        overlay: false,
        overlayColor: "#000000",
        overlayOpacity: 0.3,
      },
    });
  };

  // On-Site Popup Helper Functions
  const updateOnSitePopupSetting = (path: string, value: unknown) => {
    setOnSitePopupSettings((prev) => {
      const keys = path.split(".");
      const result = { ...prev };
      let current: Record<string, unknown> = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return result as OnSitePopupSettings;
    });
  };

  const handleOnSitePopupFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      updateOnSitePopupSetting("sideLogo.file", file);
      updateOnSitePopupSetting("sideLogo.url", url);
    };
    reader.readAsDataURL(file);
  };

  const resetOnSitePopupToDefault = () => {
    setOnSitePopupSettings({
      pageTargeting: {
        type: "all-pages",
        specificPages: {
          homePage: false,
          productPages: {
            enabled: false,
            type: "all",
            selectedProducts: [],
          },
          blogPages: false,
          collectionPages: false,
          cartPage: false,
        },
        excludePages: {
          homePage: false,
          productPages: false,
          collectionPages: false,
          cartPage: false,
          blogPages: false,
        },
      },
      display: {
        position: "bottom-right",
      },
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "right",
        minimized: true,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        minimized: true,
      },
      section: {
        primaryTextColor: "#1f2937",
        secondaryTextColor: "#6b7280",
        accentColor: "#3b82f6",
        backgroundColor: "#ffffff",
        minimized: true,
      },
    });
  };

  const generateNewUrl = () => {
    const newUrl = `survey-${Math.random().toString(36).substring(2, 8)}`;
    updateBrandedSetting("customUrl", newUrl);
  };

  const copyUrlToClipboard = () => {
    const fullUrl = brandedSurveySettings.useCustomDomain
      ? `https://${brandedSurveySettings.customDomain}/${brandedSurveySettings.customUrl}`
      : `https://yoursurveyapp.com/s/${brandedSurveySettings.customUrl}`;

    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleFileUpload = (
    type: "header" | "side" | "background",
    file: File
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (type === "background") {
        updateBrandedSetting("background.imageFile", file);
        updateBrandedSetting("background.imageUrl", url);
      } else {
        updateBrandedSetting(`${type}Logo.file`, file);
        updateBrandedSetting(`${type}Logo.url`, url);
      }
    };
    reader.readAsDataURL(file);
  };

  const applyBrandPreset = (presetId: string) => {
    const preset = brandPresets.find((p) => p.id === presetId);
    if (!preset) return;

    setBrandedSurveySettings((prev) => ({
      ...prev,
      button: { ...prev.button, ...preset.settings.button },
      section: { ...prev.section, ...preset.settings.section },
      background: { ...prev.background, ...preset.settings.background },
    }));
  };

  const resetToDefault = () => {
    setBrandedSurveySettings({
      customUrl: `survey-${Math.random().toString(36).substring(2, 8)}`,
      useCustomDomain: false,
      customDomain: "",
      headerLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "medium",
        position: "left",
        minimized: false,
      },
      sideLogo: {
        enabled: false,
        url: "",
        file: null,
        size: "small",
        position: "right",
        minimized: false,
      },
      button: {
        textColor: "#ffffff",
        backgroundColor: "#3b82f6",
        backgroundHoverColor: "#2563eb",
        borderRadius: 6,
        fontSize: 14,
        fontWeight: "medium",
        minimized: false,
        shadow: true,
      },
      section: {
        primaryTextColor: "#1f2937",
        secondaryTextColor: "#6b7280",
        headingColor: "#111827",
        linkColor: "#3b82f6",
      },
      background: {
        type: "solid",
        solidColor: "#ffffff",
        gradientStart: "#f8fafc",
        gradientEnd: "#e2e8f0",
        gradientDirection: "to-br",
        imageUrl: "",
        imageFile: null,
        imagePosition: "center",
        imageSize: "cover",
        overlay: false,
        overlayColor: "#000000",
        overlayOpacity: 0.3,
      },
      typography: {
        fontFamily: "Inter",
        headingFont: "Inter",
        bodyFont: "Inter",
        fontSize: {
          small: 12,
          medium: 14,
          large: 16,
          xlarge: 24,
        },
        lineHeight: 1.5,
        letterSpacing: 0,
      },
      progressBar: {
        enabled: true,
        color: "#3b82f6",
        backgroundColor: "#e5e7eb",
        style: "linear",
        position: "top",
        showPercentage: true,
      },
      animations: {
        enabled: true,
        transitionSpeed: "normal",
        slideDirection: "fade",
      },
      trustSignals: {
        showSSL: true,
        showPrivacyBadge: true,
        showDataProtection: false,
        customBadgeText: "Your data is secure",
      },
      thankYouPage: {
        enabled: true,
        title: "Thank you!",
        message:
          "We appreciate your feedback and will use it to improve our services.",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        showSocialShare: false,
        redirectUrl: "",
        autoRedirect: false,
        redirectDelay: 3,
      },
      customCss: {
        enabled: false,
        css: "/* Custom CSS */\n",
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-white to-survey-success-light/20">
                <CardTitle className="text-xl">Create Survey</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Design and configure your customer survey with advanced
                  targeting and incentives
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="builder" className="w-full">
                  <TabsList className="grid grid-cols-3 m-6 mb-0">
                    <TabsTrigger
                      value="builder"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 ease-in-out hover:bg-muted/50"
                    >
                      <Target className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-105" />
                      Survey Builder
                    </TabsTrigger>
                    <TabsTrigger
                      value="distribution"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 ease-in-out hover:bg-muted/50"
                    >
                      <MapPin className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-105" />
                      Distribution
                    </TabsTrigger>
                    <TabsTrigger
                      value="discount"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 ease-in-out hover:bg-muted/50"
                    >
                      <Gift className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-105" />
                      Incentives
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="builder"
                    className="p-6 pt-4 animate-in fade-in-0 duration-300"
                  >
                    <QuestionBuilder
                      questions={questions}
                      onQuestionsChange={setQuestions}
                    />
                  </TabsContent>

                  <TabsContent
                    value="distribution"
                    className="animate-in fade-in-0 duration-300"
                  >
                    <DistributionTabRefactored
                      distributionTypes={distributionTypes}
                      enabledDistributions={enabledDistributions}
                      expandedDistributionId={expandedDistributionId}
                      distributionSettings={distributionSettings}
                      brandedSurveySettings={brandedSurveySettings}
                      postPurchaseSettings={postPurchaseSettings}
                      exitIntentSettings={exitIntentSettings}
                      emailCampaignSettings={emailCampaignSettings}
                      onSitePopupSettings={onSitePopupSettings}
                      onToggleDistribution={toggleDistribution}
                      onToggleCollapsed={toggleCollapsed}
                      onUpdateDistributionSetting={updateDistributionSetting}
                      onBrandedSurveySettingsChange={setBrandedSurveySettings}
                      onPostPurchaseSettingsChange={setPostPurchaseSettings}
                      onExitIntentSettingsChange={setExitIntentSettings}
                      onEmailCampaignSettingsChange={setEmailCampaignSettings}
                      onOnSitePopupSettingsChange={setOnSitePopupSettings}
                      onResetToDefault={resetToDefault}
                      onGenerateNewUrl={generateNewUrl}
                      onCopyUrl={copyUrlToClipboard}
                      copiedUrl={copiedUrl}
                    />
                  </TabsContent>

                  <TabsContent
                    value="discount"
                    className="animate-in fade-in-0 duration-300"
                  >
                    <IncentivesTabRefactored
                      isDiscountEnabled={isDiscountEnabled}
                      setIsDiscountEnabled={setIsDiscountEnabled}
                      discountType={discountType}
                      setDiscountType={setDiscountType}
                      discountValue={discountValue}
                      setDiscountValue={setDiscountValue}
                      discountDescription={discountDescription}
                      setDiscountDescription={setDiscountDescription}
                      discountCode={discountPrefix}
                      setDiscountCode={setDiscountPrefix}
                      discountExpiryDays={discountExpiry}
                      setDiscountExpiryDays={setDiscountExpiry}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview - 40% */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <SurveyPreview
                questions={questions}
                previewDevice={previewDevice}
                setPreviewDevice={setPreviewDevice}
                distributionType={
                  previewDistribution === "onsite-popup"
                    ? "onsite"
                    : previewDistribution
                }
                previewDistribution={previewDistribution}
                setPreviewDistribution={setPreviewDistribution}
                distributionTypes={distributionTypes}
                discountEnabled={isDiscountEnabled}
                discountType={discountType}
                discountValue={discountValue}
                brandedSurveySettings={brandedSurveySettings}
                postPurchaseSettings={postPurchaseSettings}
                exitIntentSettings={exitIntentSettings}
                emailCampaignSettings={emailCampaignSettings}
                paginationEnabled={paginationEnabled}
                questionsPerPage={questionsPerPage}
                onPaginationChange={setPaginationEnabled}
                onQuestionsPerPageChange={setQuestionsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;
