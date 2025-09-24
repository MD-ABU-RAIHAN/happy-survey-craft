import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  Layers
} from 'lucide-react';
import QuestionBuilder from '@/components/QuestionBuilder';
import SurveyPreview from '@/components/SurveyPreview';

interface SurveyQuestion {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'nps' | 'email' | 'phone';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
  placeholder?: string;
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
    size: 'small' | 'medium' | 'large';
    position: 'left' | 'center' | 'right';
    minimized: boolean;
  };

  // Side Logo
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: 'small' | 'medium' | 'large';
    position: 'left' | 'right';
    minimized: boolean;
  };

  // Button Customization
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
    minimized: boolean;
    shadow: boolean;
  };

  // Section Colors
  section: {
    primaryTextColor: string;
    secondaryTextColor: string;
    headingColor: string;
    linkColor: string;
  };

  // Background Options
  background: {
    type: 'solid' | 'gradient' | 'image';
    solidColor: string;
    gradientStart: string;
    gradientEnd: string;
    gradientDirection: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
    imageUrl: string;
    imageFile: File | null;
    imagePosition: 'center' | 'top' | 'bottom' | 'left' | 'right';
    imageSize: 'cover' | 'contain' | 'auto';
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
    style: 'linear' | 'circular' | 'steps';
    position: 'top' | 'bottom' | 'floating';
    showPercentage: boolean;
  };

  // Animation Settings
  animations: {
    enabled: boolean;
    transitionSpeed: 'slow' | 'normal' | 'fast';
    slideDirection: 'fade' | 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down';
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

const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState('Customer Feedback Survey');
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'full'>('desktop');
  
  // Distribution Settings
  const [enabledDistributions, setEnabledDistributions] = useState<string[]>(['branded-survey']);
  const [collapsedDistributions, setCollapsedDistributions] = useState<string[]>(['post-purchase', 'exit-intent', 'email-campaign', 'onsite-popup']);
  const [distributionSettings, setDistributionSettings] = useState({
    'branded-survey': { triggerDelay: '3', displayDuration: '30', targetAudience: 'all-customers' },
    'post-purchase': { triggerDelay: '3', displayDuration: '30', targetAudience: 'all-customers' },
    'exit-intent': { triggerDelay: '5', displayDuration: '15', targetAudience: 'all-customers' },
    'email-campaign': { triggerDelay: '0', displayDuration: '0', targetAudience: 'all-customers' },
    'onsite-popup': { triggerDelay: '10', displayDuration: '20', targetAudience: 'all-customers' }
  });
  
  // Discount Settings
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('10');
  const [discountPrefix, setDiscountPrefix] = useState('SURVEY');
  const [discountExpiry, setDiscountExpiry] = useState('30');

  // Branded Survey Settings
  const [brandedSurveySettings, setBrandedSurveySettings] = useState<BrandedSurveySettings>({
    customUrl: `survey-${Math.random().toString(36).substring(2, 8)}`,
    useCustomDomain: false,
    customDomain: '',
    headerLogo: {
      enabled: false,
      url: '',
      file: null,
      size: 'medium',
      position: 'left',
      minimized: false,
    },
    sideLogo: {
      enabled: false,
      url: '',
      file: null,
      size: 'small',
      position: 'right',
      minimized: false,
    },
    button: {
      textColor: '#ffffff',
      backgroundColor: '#3b82f6',
      backgroundHoverColor: '#2563eb',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 'medium',
      minimized: false,
      shadow: true,
    },
    section: {
      primaryTextColor: '#1f2937',
      secondaryTextColor: '#6b7280',
      headingColor: '#111827',
      linkColor: '#3b82f6',
    },
    background: {
      type: 'solid',
      solidColor: '#ffffff',
      gradientStart: '#f8fafc',
      gradientEnd: '#e2e8f0',
      gradientDirection: 'to-br',
      imageUrl: '',
      imageFile: null,
      imagePosition: 'center',
      imageSize: 'cover',
      overlay: false,
      overlayColor: '#000000',
      overlayOpacity: 0.3,
    },
    typography: {
      fontFamily: 'Inter',
      headingFont: 'Inter',
      bodyFont: 'Inter',
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
      color: '#3b82f6',
      backgroundColor: '#e5e7eb',
      style: 'linear',
      position: 'top',
      showPercentage: true,
    },
    animations: {
      enabled: true,
      transitionSpeed: 'normal',
      slideDirection: 'fade',
    },
    trustSignals: {
      showSSL: true,
      showPrivacyBadge: true,
      showDataProtection: false,
      customBadgeText: 'Your data is secure',
    },
    thankYouPage: {
      enabled: true,
      title: 'Thank you!',
      message: 'We appreciate your feedback and will use it to improve our services.',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      showSocialShare: false,
      redirectUrl: '',
      autoRedirect: false,
      redirectDelay: 3,
    },
    customCss: {
      enabled: false,
      css: '/* Custom CSS */\n',
    },
  });

  // Brand Presets
  const brandPresets = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design',
      icon: Layout,
      settings: {
        button: {
          textColor: '#ffffff',
          backgroundColor: '#6366f1',
          backgroundHoverColor: '#4f46e5',
          borderRadius: 8,
        },
        section: {
          primaryTextColor: '#111827',
          secondaryTextColor: '#6b7280',
          headingColor: '#1f2937',
          linkColor: '#6366f1',
        },
        background: {
          type: 'gradient' as const,
          gradientStart: '#ffffff',
          gradientEnd: '#f8fafc',
          gradientDirection: 'to-br' as const,
        },
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design',
      icon: Minimize,
      settings: {
        button: {
          textColor: '#374151',
          backgroundColor: '#ffffff',
          backgroundHoverColor: '#f9fafb',
          borderRadius: 4,
        },
        section: {
          primaryTextColor: '#111827',
          secondaryTextColor: '#4b5563',
          headingColor: '#000000',
          linkColor: '#374151',
        },
        background: {
          type: 'solid' as const,
          solidColor: '#ffffff',
        },
      }
    },
    {
      id: 'vibrant',
      name: 'Vibrant',
      description: 'Bold and energetic colors',
      icon: Palette,
      settings: {
        button: {
          textColor: '#ffffff',
          backgroundColor: '#ec4899',
          backgroundHoverColor: '#db2777',
          borderRadius: 12,
        },
        section: {
          primaryTextColor: '#1f2937',
          secondaryTextColor: '#6b7280',
          headingColor: '#ec4899',
          linkColor: '#ec4899',
        },
        background: {
          type: 'gradient' as const,
          gradientStart: '#fdf2f8',
          gradientEnd: '#fce7f3',
          gradientDirection: 'to-br' as const,
        },
      }
    }
  ];

  const [copiedUrl, setCopiedUrl] = useState(false);

  // Distribution types configuration
  const distributionTypes = [
    {
      id: 'branded-survey',
      name: 'Branded Survey',
      description: 'Customized survey with your brand colors and logo',
      icon: Monitor,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      id: 'post-purchase',
      name: 'Post-Purchase Survey',
      description: 'Collect feedback immediately after purchase completion',
      icon: ShoppingCart,
      color: 'text-secondary-brand',
      bgColor: 'bg-secondary-brand/10',
      borderColor: 'border-secondary-brand/20'
    },
    {
      id: 'exit-intent',
      name: 'Exit-Intent Survey',
      description: 'Capture feedback when visitors are about to leave',
      icon: MousePointer,
      color: 'text-survey-purple',
      bgColor: 'bg-survey-purple/10',
      borderColor: 'border-survey-purple/20'
    },
    {
      id: 'email-campaign',
      name: 'Email Campaign',
      description: 'Send survey links via email to your customer base',
      icon: Mail,
      color: 'text-survey-success',
      bgColor: 'bg-survey-success/10',
      borderColor: 'border-survey-success/20'
    },
    {
      id: 'onsite-popup',
      name: 'On-Site Popup',
      description: 'Display survey as popup on your website',
      icon: Globe,
      color: 'text-survey-warning',
      bgColor: 'bg-survey-warning/10',
      borderColor: 'border-survey-warning/20'
    }
  ];

  // Distribution helper functions
  const toggleDistribution = (distributionId: string) => {
    setEnabledDistributions(prev => {
      const isCurrentlyEnabled = prev.includes(distributionId);
      if (isCurrentlyEnabled) {
        return prev.filter(id => id !== distributionId);
      } else {
        // When enabling a distribution, automatically expand it
        setCollapsedDistributions(collapsed => collapsed.filter(id => id !== distributionId));
        return [...prev, distributionId];
      }
    });
  };

  const toggleCollapsed = (distributionId: string) => {
    setCollapsedDistributions(prev =>
      prev.includes(distributionId)
        ? prev.filter(id => id !== distributionId)
        : [...prev, distributionId]
    );
  };

  const updateDistributionSetting = (distributionId: string, key: string, value: string) => {
    setDistributionSettings(prev => ({
      ...prev,
      [distributionId]: {
        ...prev[distributionId as keyof typeof prev],
        [key]: value
      }
    }));
  };

  // Branded Survey Helper Functions
  const updateBrandedSetting = (path: string, value: any) => {
    setBrandedSurveySettings(prev => {
      const keys = path.split('.');
      const result = { ...prev };
      let current: any = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return result;
    });
  };

  const generateNewUrl = () => {
    const newUrl = `survey-${Math.random().toString(36).substring(2, 8)}`;
    updateBrandedSetting('customUrl', newUrl);
  };

  const copyUrlToClipboard = () => {
    const fullUrl = brandedSurveySettings.useCustomDomain
      ? `https://${brandedSurveySettings.customDomain}/${brandedSurveySettings.customUrl}`
      : `https://yoursurveyapp.com/s/${brandedSurveySettings.customUrl}`;

    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleFileUpload = (type: 'header' | 'side' | 'background', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (type === 'background') {
        updateBrandedSetting('background.imageFile', file);
        updateBrandedSetting('background.imageUrl', url);
      } else {
        updateBrandedSetting(`${type}Logo.file`, file);
        updateBrandedSetting(`${type}Logo.url`, url);
      }
    };
    reader.readAsDataURL(file);
  };

  const applyBrandPreset = (presetId: string) => {
    const preset = brandPresets.find(p => p.id === presetId);
    if (!preset) return;

    setBrandedSurveySettings(prev => ({
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
      customDomain: '',
      headerLogo: {
        enabled: false,
        url: '',
        file: null,
        size: 'medium',
        position: 'left',
        minimized: false,
      },
      sideLogo: {
        enabled: false,
        url: '',
        file: null,
        size: 'small',
        position: 'right',
        minimized: false,
      },
      button: {
        textColor: '#ffffff',
        backgroundColor: '#3b82f6',
        backgroundHoverColor: '#2563eb',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 'medium',
        minimized: false,
        shadow: true,
      },
      section: {
        primaryTextColor: '#1f2937',
        secondaryTextColor: '#6b7280',
        headingColor: '#111827',
        linkColor: '#3b82f6',
      },
      background: {
        type: 'solid',
        solidColor: '#ffffff',
        gradientStart: '#f8fafc',
        gradientEnd: '#e2e8f0',
        gradientDirection: 'to-br',
        imageUrl: '',
        imageFile: null,
        imagePosition: 'center',
        imageSize: 'cover',
        overlay: false,
        overlayColor: '#000000',
        overlayOpacity: 0.3,
      },
      typography: {
        fontFamily: 'Inter',
        headingFont: 'Inter',
        bodyFont: 'Inter',
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
        color: '#3b82f6',
        backgroundColor: '#e5e7eb',
        style: 'linear',
        position: 'top',
        showPercentage: true,
      },
      animations: {
        enabled: true,
        transitionSpeed: 'normal',
        slideDirection: 'fade',
      },
      trustSignals: {
        showSSL: true,
        showPrivacyBadge: true,
        showDataProtection: false,
        customBadgeText: 'Your data is secure',
      },
      thankYouPage: {
        enabled: true,
        title: 'Thank you!',
        message: 'We appreciate your feedback and will use it to improve our services.',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        showSocialShare: false,
        redirectUrl: '',
        autoRedirect: false,
        redirectDelay: 3,
      },
      customCss: {
        enabled: false,
        css: '/* Custom CSS */\n',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-survey-success-light to-survey-info-light">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary-brand rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">MS</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">MS Survey App</h1>
                  <p className="text-xs text-muted-foreground">Customer Survey Builder</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  value={surveyTitle} 
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  className="font-semibold border-none shadow-none text-lg bg-transparent min-w-0 w-auto"
                />
                <Edit3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <Badge variant="secondary" className="bg-survey-warning-light text-survey-warning border-survey-warning/20">
                Draft
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary-brand hover:from-primary-hover hover:to-secondary-brand text-white shadow-lg">
                <Save className="w-4 h-4 mr-2" />
                Save Survey
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-white to-survey-success-light/20">
                <CardTitle className="text-xl">Create Survey</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Design and configure your customer survey with advanced targeting and incentives
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="builder" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 m-6 mb-0">
                    <TabsTrigger 
                      value="builder" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Survey Builder
                    </TabsTrigger>
                    <TabsTrigger value="distribution">
                      <MapPin className="w-4 h-4 mr-2" />
                      Distribution
                    </TabsTrigger>
                    <TabsTrigger value="discount">
                      <Gift className="w-4 h-4 mr-2" />
                      Incentives
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="builder" className="p-6 pt-4">
                    <QuestionBuilder 
                      questions={questions} 
                      onQuestionsChange={setQuestions}
                    />
                  </TabsContent>

                  <TabsContent value="distribution" className="p-6 pt-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Distribution Settings</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Select and configure multiple distribution channels for your survey
                      </p>
                    </div>

                    <div className="space-y-4">
                      {distributionTypes.map((distribution) => {
                        const IconComponent = distribution.icon;
                        const isEnabled = enabledDistributions.includes(distribution.id);
                        const isCollapsed = collapsedDistributions.includes(distribution.id);
                        const settings = distributionSettings[distribution.id as keyof typeof distributionSettings];

                        return (
                          <Collapsible
                            key={distribution.id}
                            open={!isCollapsed}
                            onOpenChange={() => toggleCollapsed(distribution.id)}
                          >
                            <Card
                              className={`transition-all duration-300 border-2 ${
                                isEnabled
                                  ? `${distribution.borderColor} ${distribution.bgColor} shadow-lg`
                                  : 'border-muted hover:border-muted-foreground/20'
                              }`}
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <CollapsibleTrigger className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                                      {isCollapsed ? (
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </CollapsibleTrigger>
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      isEnabled ? distribution.bgColor : 'bg-muted'
                                    }`}>
                                      <IconComponent className={`w-5 h-5 ${
                                        isEnabled ? distribution.color : 'text-muted-foreground'
                                      }`} />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        {distribution.name}
                                        {isEnabled && (
                                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                            Active
                                          </Badge>
                                        )}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {distribution.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Switch
                                      checked={isEnabled}
                                      onCheckedChange={() => toggleDistribution(distribution.id)}
                                    />
                                  </div>
                                </div>
                              </CardHeader>

                              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                                <CardContent className="pt-0 space-y-6">
                                  {isEnabled ? (
                                    distribution.id === 'branded-survey' ? (
                                      // Branded Survey Settings
                                      <div className="space-y-8">
                                        {/* Auto-generated URL Section */}
                                        <div className="bg-gradient-to-r from-primary/5 to-secondary-brand/5 rounded-lg p-6 space-y-4 border border-primary/10">
                                          <div className="flex items-center justify-between">
                                            <h5 className="font-semibold flex items-center gap-2">
                                              <Link className="w-5 h-5 text-primary" />
                                              Survey URL
                                            </h5>
                                            <Button
                                              onClick={resetToDefault}
                                              variant="outline"
                                              size="sm"
                                              className="text-xs"
                                            >
                                              <RotateCcw className="w-3 h-3 mr-1" />
                                              Reset All
                                            </Button>
                                          </div>

                                          <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                              <Switch
                                                checked={brandedSurveySettings.useCustomDomain}
                                                onCheckedChange={(checked) => updateBrandedSetting('useCustomDomain', checked)}
                                              />
                                              <Label className="text-sm">Use Custom Domain</Label>
                                            </div>

                                            {brandedSurveySettings.useCustomDomain && (
                                              <div className="space-y-2">
                                                <Label className="text-xs">Custom Domain</Label>
                                                <Input
                                                  placeholder="surveys.yourcompany.com"
                                                  value={brandedSurveySettings.customDomain}
                                                  onChange={(e) => updateBrandedSetting('customDomain', e.target.value)}
                                                />
                                              </div>
                                            )}

                                            <div className="space-y-2">
                                              <Label className="text-xs">URL Slug</Label>
                                              <div className="flex items-center space-x-2">
                                                <div className="flex-1 flex items-center bg-muted rounded-md px-3 py-2 text-sm">
                                                  <span className="text-muted-foreground">
                                                    {brandedSurveySettings.useCustomDomain
                                                      ? `https://${brandedSurveySettings.customDomain || 'surveys.yourcompany.com'}/`
                                                      : 'https://yoursurveyapp.com/s/'
                                                    }
                                                  </span>
                                                  <Input
                                                    className="border-0 shadow-none p-0 bg-transparent font-medium"
                                                    value={brandedSurveySettings.customUrl}
                                                    onChange={(e) => updateBrandedSetting('customUrl', e.target.value)}
                                                  />
                                                </div>
                                                <Button onClick={generateNewUrl} variant="outline" size="sm">
                                                  <Zap className="w-3 h-3" />
                                                </Button>
                                                <Button onClick={copyUrlToClipboard} variant="outline" size="sm">
                                                  {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Brand Presets */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
                                          <h5 className="font-semibold flex items-center gap-2">
                                            <Brush className="w-5 h-5 text-survey-purple" />
                                            Brand Presets
                                          </h5>
                                          <div className="grid grid-cols-3 gap-3">
                                            {brandPresets.map((preset) => {
                                              const IconComponent = preset.icon;
                                              return (
                                                <Button
                                                  key={preset.id}
                                                  onClick={() => applyBrandPreset(preset.id)}
                                                  variant="outline"
                                                  className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5"
                                                >
                                                  <IconComponent className="w-5 h-5 text-primary" />
                                                  <span className="font-medium text-xs">{preset.name}</span>
                                                  <span className="text-xs text-muted-foreground text-center">
                                                    {preset.description}
                                                  </span>
                                                </Button>
                                              );
                                            })}
                                          </div>
                                        </div>

                                        {/* Logos Section */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-6 border border-muted">
                                          <h5 className="font-semibold flex items-center gap-2">
                                            <Image className="w-5 h-5 text-survey-success" />
                                            Logo Settings
                                          </h5>

                                          <div className="grid grid-cols-2 gap-6">
                                            {/* Header Logo */}
                                            <div className="space-y-4">
                                              <div className="flex items-center justify-between">
                                                <Label className="font-medium">Header Logo</Label>
                                                <div className="flex items-center space-x-2">
                                                  <Switch
                                                    checked={brandedSurveySettings.headerLogo.enabled}
                                                    onCheckedChange={(checked) => updateBrandedSetting('headerLogo.enabled', checked)}
                                                  />
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateBrandedSetting('headerLogo.minimized', !brandedSurveySettings.headerLogo.minimized)}
                                                  >
                                                    {brandedSurveySettings.headerLogo.minimized ? <Maximize className="w-3 h-3" /> : <Minimize className="w-3 h-3" />}
                                                  </Button>
                                                </div>
                                              </div>

                                              {brandedSurveySettings.headerLogo.enabled && !brandedSurveySettings.headerLogo.minimized && (
                                                <div className="space-y-3">
                                                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
                                                    {brandedSurveySettings.headerLogo.url ? (
                                                      <img
                                                        src={brandedSurveySettings.headerLogo.url}
                                                        alt="Header logo"
                                                        className="max-h-12 mx-auto"
                                                      />
                                                    ) : (
                                                      <div className="flex flex-col items-center gap-2">
                                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">Upload Logo</span>
                                                      </div>
                                                    )}
                                                    <input
                                                      type="file"
                                                      accept="image/*"
                                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                      onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleFileUpload('header', file);
                                                      }}
                                                    />
                                                  </div>

                                                  <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Size</Label>
                                                      <Select
                                                        value={brandedSurveySettings.headerLogo.size}
                                                        onValueChange={(value: 'small' | 'medium' | 'large') => updateBrandedSetting('headerLogo.size', value)}
                                                      >
                                                        <SelectTrigger size="sm">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          <SelectItem value="small">Small</SelectItem>
                                                          <SelectItem value="medium">Medium</SelectItem>
                                                          <SelectItem value="large">Large</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Position</Label>
                                                      <Select
                                                        value={brandedSurveySettings.headerLogo.position}
                                                        onValueChange={(value: 'left' | 'center' | 'right') => updateBrandedSetting('headerLogo.position', value)}
                                                      >
                                                        <SelectTrigger size="sm">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          <SelectItem value="left">Left</SelectItem>
                                                          <SelectItem value="center">Center</SelectItem>
                                                          <SelectItem value="right">Right</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>

                                            {/* Side Logo */}
                                            <div className="space-y-4">
                                              <div className="flex items-center justify-between">
                                                <Label className="font-medium">Side Logo</Label>
                                                <div className="flex items-center space-x-2">
                                                  <Switch
                                                    checked={brandedSurveySettings.sideLogo.enabled}
                                                    onCheckedChange={(checked) => updateBrandedSetting('sideLogo.enabled', checked)}
                                                  />
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateBrandedSetting('sideLogo.minimized', !brandedSurveySettings.sideLogo.minimized)}
                                                  >
                                                    {brandedSurveySettings.sideLogo.minimized ? <Maximize className="w-3 h-3" /> : <Minimize className="w-3 h-3" />}
                                                  </Button>
                                                </div>
                                              </div>

                                              {brandedSurveySettings.sideLogo.enabled && !brandedSurveySettings.sideLogo.minimized && (
                                                <div className="space-y-3">
                                                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
                                                    {brandedSurveySettings.sideLogo.url ? (
                                                      <img
                                                        src={brandedSurveySettings.sideLogo.url}
                                                        alt="Side logo"
                                                        className="max-h-8 mx-auto"
                                                      />
                                                    ) : (
                                                      <div className="flex flex-col items-center gap-2">
                                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">Upload Logo</span>
                                                      </div>
                                                    )}
                                                    <input
                                                      type="file"
                                                      accept="image/*"
                                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                      onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleFileUpload('side', file);
                                                      }}
                                                    />
                                                  </div>

                                                  <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Size</Label>
                                                      <Select
                                                        value={brandedSurveySettings.sideLogo.size}
                                                        onValueChange={(value: 'small' | 'medium' | 'large') => updateBrandedSetting('sideLogo.size', value)}
                                                      >
                                                        <SelectTrigger size="sm">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          <SelectItem value="small">Small</SelectItem>
                                                          <SelectItem value="medium">Medium</SelectItem>
                                                          <SelectItem value="large">Large</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Position</Label>
                                                      <Select
                                                        value={brandedSurveySettings.sideLogo.position}
                                                        onValueChange={(value: 'left' | 'right') => updateBrandedSetting('sideLogo.position', value)}
                                                      >
                                                        <SelectTrigger size="sm">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          <SelectItem value="left">Left</SelectItem>
                                                          <SelectItem value="right">Right</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Button Customization */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
                                          <div className="flex items-center justify-between">
                                            <h5 className="font-semibold flex items-center gap-2">
                                              <MousePointer className="w-5 h-5 text-survey-info" />
                                              Button Customization
                                            </h5>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => updateBrandedSetting('button.minimized', !brandedSurveySettings.button.minimized)}
                                            >
                                              {brandedSurveySettings.button.minimized ? <Maximize className="w-3 h-3" /> : <Minimize className="w-3 h-3" />}
                                            </Button>
                                          </div>

                                          {!brandedSurveySettings.button.minimized && (
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-3">
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Text Color</Label>
                                                  <Input
                                                    type="color"
                                                    value={brandedSurveySettings.button.textColor}
                                                    onChange={(e) => updateBrandedSetting('button.textColor', e.target.value)}
                                                    className="h-10"
                                                  />
                                                </div>
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Background Color</Label>
                                                  <Input
                                                    type="color"
                                                    value={brandedSurveySettings.button.backgroundColor}
                                                    onChange={(e) => updateBrandedSetting('button.backgroundColor', e.target.value)}
                                                    className="h-10"
                                                  />
                                                </div>
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Hover Color</Label>
                                                  <Input
                                                    type="color"
                                                    value={brandedSurveySettings.button.backgroundHoverColor}
                                                    onChange={(e) => updateBrandedSetting('button.backgroundHoverColor', e.target.value)}
                                                    className="h-10"
                                                  />
                                                </div>
                                              </div>

                                              <div className="space-y-3">
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Border Radius</Label>
                                                  <Input
                                                    type="number"
                                                    min="0"
                                                    max="20"
                                                    value={brandedSurveySettings.button.borderRadius}
                                                    onChange={(e) => updateBrandedSetting('button.borderRadius', parseInt(e.target.value))}
                                                  />
                                                </div>
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Font Size</Label>
                                                  <Input
                                                    type="number"
                                                    min="10"
                                                    max="20"
                                                    value={brandedSurveySettings.button.fontSize}
                                                    onChange={(e) => updateBrandedSetting('button.fontSize', parseInt(e.target.value))}
                                                  />
                                                </div>
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Font Weight</Label>
                                                  <Select
                                                    value={brandedSurveySettings.button.fontWeight}
                                                    onValueChange={(value) => updateBrandedSetting('button.fontWeight', value)}
                                                  >
                                                    <SelectTrigger size="sm">
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      <SelectItem value="normal">Normal</SelectItem>
                                                      <SelectItem value="medium">Medium</SelectItem>
                                                      <SelectItem value="semibold">Semibold</SelectItem>
                                                      <SelectItem value="bold">Bold</SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          <div className="border border-muted rounded-lg p-4">
                                            <Label className="text-xs text-muted-foreground mb-2 block">Button Preview</Label>
                                            <Button
                                              style={{
                                                color: brandedSurveySettings.button.textColor,
                                                backgroundColor: brandedSurveySettings.button.backgroundColor,
                                                borderRadius: `${brandedSurveySettings.button.borderRadius}px`,
                                                fontSize: `${brandedSurveySettings.button.fontSize}px`,
                                                fontWeight: brandedSurveySettings.button.fontWeight,
                                                boxShadow: brandedSurveySettings.button.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                              }}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = brandedSurveySettings.button.backgroundHoverColor;
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = brandedSurveySettings.button.backgroundColor;
                                              }}
                                            >
                                              Next Question
                                            </Button>
                                          </div>
                                        </div>

                                        {/* Section Colors */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
                                          <h5 className="font-semibold flex items-center gap-2">
                                            <Palette className="w-5 h-5 text-survey-warning" />
                                            Section Colors
                                          </h5>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label className="text-xs">Primary Text Color</Label>
                                              <Input
                                                type="color"
                                                value={brandedSurveySettings.section.primaryTextColor}
                                                onChange={(e) => updateBrandedSetting('section.primaryTextColor', e.target.value)}
                                                className="h-10"
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-xs">Secondary Text Color</Label>
                                              <Input
                                                type="color"
                                                value={brandedSurveySettings.section.secondaryTextColor}
                                                onChange={(e) => updateBrandedSetting('section.secondaryTextColor', e.target.value)}
                                                className="h-10"
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-xs">Heading Color</Label>
                                              <Input
                                                type="color"
                                                value={brandedSurveySettings.section.headingColor}
                                                onChange={(e) => updateBrandedSetting('section.headingColor', e.target.value)}
                                                className="h-10"
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-xs">Link Color</Label>
                                              <Input
                                                type="color"
                                                value={brandedSurveySettings.section.linkColor}
                                                onChange={(e) => updateBrandedSetting('section.linkColor', e.target.value)}
                                                className="h-10"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        {/* Background Options */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-6 border border-muted">
                                          <h5 className="font-semibold flex items-center gap-2">
                                            <Camera className="w-5 h-5 text-survey-purple" />
                                            Background
                                          </h5>

                                          <div className="space-y-4">
                                            <div className="flex space-x-4">
                                              <Button
                                                variant={brandedSurveySettings.background.type === 'solid' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateBrandedSetting('background.type', 'solid')}
                                              >
                                                Solid
                                              </Button>
                                              <Button
                                                variant={brandedSurveySettings.background.type === 'gradient' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateBrandedSetting('background.type', 'gradient')}
                                              >
                                                Gradient
                                              </Button>
                                              <Button
                                                variant={brandedSurveySettings.background.type === 'image' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => updateBrandedSetting('background.type', 'image')}
                                              >
                                                Image
                                              </Button>
                                            </div>

                                            {brandedSurveySettings.background.type === 'solid' && (
                                              <div className="space-y-1">
                                                <Label className="text-xs">Background Color</Label>
                                                <Input
                                                  type="color"
                                                  value={brandedSurveySettings.background.solidColor}
                                                  onChange={(e) => updateBrandedSetting('background.solidColor', e.target.value)}
                                                  className="h-10"
                                                />
                                              </div>
                                            )}

                                            {brandedSurveySettings.background.type === 'gradient' && (
                                              <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                  <div className="space-y-1">
                                                    <Label className="text-xs">Start Color</Label>
                                                    <Input
                                                      type="color"
                                                      value={brandedSurveySettings.background.gradientStart}
                                                      onChange={(e) => updateBrandedSetting('background.gradientStart', e.target.value)}
                                                      className="h-10"
                                                    />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <Label className="text-xs">End Color</Label>
                                                    <Input
                                                      type="color"
                                                      value={brandedSurveySettings.background.gradientEnd}
                                                      onChange={(e) => updateBrandedSetting('background.gradientEnd', e.target.value)}
                                                      className="h-10"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="space-y-1">
                                                  <Label className="text-xs">Direction</Label>
                                                  <Select
                                                    value={brandedSurveySettings.background.gradientDirection}
                                                    onValueChange={(value) => updateBrandedSetting('background.gradientDirection', value)}
                                                  >
                                                    <SelectTrigger size="sm">
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      <SelectItem value="to-r">Left to Right</SelectItem>
                                                      <SelectItem value="to-l">Right to Left</SelectItem>
                                                      <SelectItem value="to-t">Bottom to Top</SelectItem>
                                                      <SelectItem value="to-b">Top to Bottom</SelectItem>
                                                      <SelectItem value="to-br">Top Left to Bottom Right</SelectItem>
                                                      <SelectItem value="to-bl">Top Right to Bottom Left</SelectItem>
                                                      <SelectItem value="to-tr">Bottom Left to Top Right</SelectItem>
                                                      <SelectItem value="to-tl">Bottom Right to Top Left</SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                              </div>
                                            )}

                                            {brandedSurveySettings.background.type === 'image' && (
                                              <div className="space-y-3">
                                                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
                                                  {brandedSurveySettings.background.imageUrl ? (
                                                    <div className="relative">
                                                      <img
                                                        src={brandedSurveySettings.background.imageUrl}
                                                        alt="Background"
                                                        className="max-h-24 mx-auto rounded"
                                                      />
                                                      <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute top-1 right-1"
                                                        onClick={() => {
                                                          updateBrandedSetting('background.imageUrl', '');
                                                          updateBrandedSetting('background.imageFile', null);
                                                        }}
                                                      >
                                                        ×
                                                      </Button>
                                                    </div>
                                                  ) : (
                                                    <div className="flex flex-col items-center gap-2">
                                                      <Upload className="w-6 h-6 text-muted-foreground" />
                                                      <span className="text-xs text-muted-foreground">Upload Background Image</span>
                                                    </div>
                                                  )}
                                                  <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={(e) => {
                                                      const file = e.target.files?.[0];
                                                      if (file) handleFileUpload('background', file);
                                                    }}
                                                  />
                                                </div>

                                                {brandedSurveySettings.background.imageUrl && (
                                                  <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Position</Label>
                                                      <Select
                                                        value={brandedSurveySettings.background.imagePosition}
                                                        onValueChange={(value) => updateBrandedSetting('background.imagePosition', value)}
                                                      >
                                                        <SelectTrigger size="sm">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          <SelectItem value="center">Center</SelectItem>
                                                          <SelectItem value="top">Top</SelectItem>
                                                          <SelectItem value="bottom">Bottom</SelectItem>
                                                          <SelectItem value="left">Left</SelectItem>
                                                          <SelectItem value="right">Right</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Size</Label>
                                                      <Select
                                                        value={brandedSurveySettings.background.imageSize}
                                                        onValueChange={(value) => updateBrandedSetting('background.imageSize', value)}
                                                      >
                                                        <SelectTrigger size="sm">
                                                          <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                          <SelectItem value="cover">Cover</SelectItem>
                                                          <SelectItem value="contain">Contain</SelectItem>
                                                          <SelectItem value="auto">Auto</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                    </div>
                                                  </div>
                                                )}

                                                <div className="flex items-center space-x-2">
                                                  <Switch
                                                    checked={brandedSurveySettings.background.overlay}
                                                    onCheckedChange={(checked) => updateBrandedSetting('background.overlay', checked)}
                                                  />
                                                  <Label className="text-sm">Add overlay</Label>
                                                </div>

                                                {brandedSurveySettings.background.overlay && (
                                                  <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Overlay Color</Label>
                                                      <Input
                                                        type="color"
                                                        value={brandedSurveySettings.background.overlayColor}
                                                        onChange={(e) => updateBrandedSetting('background.overlayColor', e.target.value)}
                                                        className="h-8"
                                                      />
                                                    </div>
                                                    <div className="space-y-1">
                                                      <Label className="text-xs">Overlay Opacity</Label>
                                                      <Input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.1"
                                                        value={brandedSurveySettings.background.overlayOpacity}
                                                        onChange={(e) => updateBrandedSetting('background.overlayOpacity', parseFloat(e.target.value))}
                                                        className="h-8"
                                                      />
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* Typography */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
                                          <h5 className="font-semibold flex items-center gap-2">
                                            <Type className="w-5 h-5 text-survey-info" />
                                            Typography
                                          </h5>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label className="text-xs">Font Family</Label>
                                              <Select
                                                value={brandedSurveySettings.typography.fontFamily}
                                                onValueChange={(value) => updateBrandedSetting('typography.fontFamily', value)}
                                              >
                                                <SelectTrigger size="sm">
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="Inter">Inter</SelectItem>
                                                  <SelectItem value="Arial">Arial</SelectItem>
                                                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                                                  <SelectItem value="Georgia">Georgia</SelectItem>
                                                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                                  <SelectItem value="Roboto">Roboto</SelectItem>
                                                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-xs">Line Height</Label>
                                              <Input
                                                type="number"
                                                min="1"
                                                max="3"
                                                step="0.1"
                                                value={brandedSurveySettings.typography.lineHeight}
                                                onChange={(e) => updateBrandedSetting('typography.lineHeight', parseFloat(e.target.value))}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        {/* Custom CSS */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
                                          <div className="flex items-center justify-between">
                                            <h5 className="font-semibold flex items-center gap-2">
                                              <Code className="w-5 h-5 text-survey-success" />
                                              Custom CSS
                                            </h5>
                                            <Switch
                                              checked={brandedSurveySettings.customCss.enabled}
                                              onCheckedChange={(checked) => updateBrandedSetting('customCss.enabled', checked)}
                                            />
                                          </div>

                                          {brandedSurveySettings.customCss.enabled && (
                                            <div className="space-y-2">
                                              <Label className="text-xs">CSS Code</Label>
                                              <Textarea
                                                placeholder="/* Your custom CSS here */&#10;.survey-container {&#10;  /* Custom styles */&#10;}"
                                                value={brandedSurveySettings.customCss.css}
                                                onChange={(e) => updateBrandedSetting('customCss.css', e.target.value)}
                                                className="font-mono text-sm min-h-[120px]"
                                              />
                                            </div>
                                          )}
                                        </div>

                                        {/* Advanced Features */}
                                        <div className="bg-white/60 rounded-lg p-6 space-y-6 border border-muted">
                                          <h5 className="font-semibold flex items-center gap-2">
                                            <Layers className="w-5 h-5 text-secondary-brand" />
                                            Advanced Features
                                          </h5>

                                          <div className="grid grid-cols-1 gap-6">
                                            {/* Progress Bar */}
                                            <div className="space-y-3">
                                              <div className="flex items-center justify-between">
                                                <Label className="font-medium">Progress Bar</Label>
                                                <Switch
                                                  checked={brandedSurveySettings.progressBar.enabled}
                                                  onCheckedChange={(checked) => updateBrandedSetting('progressBar.enabled', checked)}
                                                />
                                              </div>
                                              {brandedSurveySettings.progressBar.enabled && (
                                                <div className="grid grid-cols-2 gap-3">
                                                  <div className="space-y-1">
                                                    <Label className="text-xs">Color</Label>
                                                    <Input
                                                      type="color"
                                                      value={brandedSurveySettings.progressBar.color}
                                                      onChange={(e) => updateBrandedSetting('progressBar.color', e.target.value)}
                                                      className="h-8"
                                                    />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <Label className="text-xs">Position</Label>
                                                    <Select
                                                      value={brandedSurveySettings.progressBar.position}
                                                      onValueChange={(value) => updateBrandedSetting('progressBar.position', value)}
                                                    >
                                                      <SelectTrigger size="sm">
                                                        <SelectValue />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                        <SelectItem value="top">Top</SelectItem>
                                                        <SelectItem value="bottom">Bottom</SelectItem>
                                                        <SelectItem value="floating">Floating</SelectItem>
                                                      </SelectContent>
                                                    </Select>
                                                  </div>
                                                </div>
                                              )}
                                            </div>

                                            {/* Trust Signals */}
                                            <div className="space-y-3">
                                              <Label className="font-medium">Trust & Privacy</Label>
                                              <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                  <Switch
                                                    checked={brandedSurveySettings.trustSignals.showSSL}
                                                    onCheckedChange={(checked) => updateBrandedSetting('trustSignals.showSSL', checked)}
                                                  />
                                                  <Label className="text-sm">Show SSL Badge</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                  <Switch
                                                    checked={brandedSurveySettings.trustSignals.showPrivacyBadge}
                                                    onCheckedChange={(checked) => updateBrandedSetting('trustSignals.showPrivacyBadge', checked)}
                                                  />
                                                  <Label className="text-sm">Show Privacy Badge</Label>
                                                </div>
                                              </div>
                                            </div>

                                            {/* Thank You Page */}
                                            <div className="space-y-3">
                                              <div className="flex items-center justify-between">
                                                <Label className="font-medium">Custom Thank You Page</Label>
                                                <Switch
                                                  checked={brandedSurveySettings.thankYouPage.enabled}
                                                  onCheckedChange={(checked) => updateBrandedSetting('thankYouPage.enabled', checked)}
                                                />
                                              </div>
                                              {brandedSurveySettings.thankYouPage.enabled && (
                                                <div className="grid grid-cols-1 gap-3">
                                                  <div className="space-y-1">
                                                    <Label className="text-xs">Title</Label>
                                                    <Input
                                                      placeholder="Thank you!"
                                                      value={brandedSurveySettings.thankYouPage.title}
                                                      onChange={(e) => updateBrandedSetting('thankYouPage.title', e.target.value)}
                                                      size="sm"
                                                    />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <Label className="text-xs">Message</Label>
                                                    <Textarea
                                                      placeholder="We appreciate your feedback..."
                                                      value={brandedSurveySettings.thankYouPage.message}
                                                      onChange={(e) => updateBrandedSetting('thankYouPage.message', e.target.value)}
                                                      className="min-h-[60px] text-sm"
                                                    />
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      // Default Distribution Settings
                                      <>
                                        <div className="bg-white/50 rounded-lg p-4 space-y-4">
                                          <h5 className="font-medium text-sm flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-survey-warning" />
                                            Timing & Display Settings
                                          </h5>

                                          <div className="grid grid-cols-2 gap-4">
                                            {distribution.id !== 'email-campaign' && (
                                              <>
                                                <div className="space-y-2">
                                                  <Label className="text-xs">Trigger Delay (seconds)</Label>
                                                  <Input
                                                    type="number"
                                                    size="sm"
                                                    value={settings.triggerDelay}
                                                    onChange={(e) => updateDistributionSetting(distribution.id, 'triggerDelay', e.target.value)}
                                                    min="0"
                                                  />
                                                </div>
                                                <div className="space-y-2">
                                                  <Label className="text-xs">Display Duration (seconds)</Label>
                                                  <Input
                                                    type="number"
                                                    size="sm"
                                                    value={settings.displayDuration}
                                                    onChange={(e) => updateDistributionSetting(distribution.id, 'displayDuration', e.target.value)}
                                                    min="5"
                                                  />
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>

                                        <div className="bg-white/50 rounded-lg p-4 space-y-4">
                                          <h5 className="font-medium text-sm flex items-center gap-2">
                                            <Users className="w-4 h-4 text-secondary-brand" />
                                            Target Audience
                                          </h5>

                                          <div className="space-y-4">
                                            <div className="space-y-2">
                                              <Label className="text-xs">Customer Segment</Label>
                                              <Select
                                                value={settings.targetAudience}
                                                onValueChange={(value) => updateDistributionSetting(distribution.id, 'targetAudience', value)}
                                              >
                                                <SelectTrigger size="sm">
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="all-customers">All Customers</SelectItem>
                                                  <SelectItem value="new-customers">New Customers</SelectItem>
                                                  <SelectItem value="returning-customers">Returning Customers</SelectItem>
                                                  <SelectItem value="vip-customers">VIP Customers</SelectItem>
                                                  <SelectItem value="specific-products">Specific Product Buyers</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <Label className="text-xs">Min. Order Value</Label>
                                                <Input type="number" placeholder="0.00" size="sm" />
                                              </div>
                                              <div className="space-y-2">
                                                <Label className="text-xs">Geographic Location</Label>
                                                <Select defaultValue="all">
                                                  <SelectTrigger size="sm">
                                                    <SelectValue />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="all">All Locations</SelectItem>
                                                    <SelectItem value="us">United States</SelectItem>
                                                    <SelectItem value="ca">Canada</SelectItem>
                                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                                    <SelectItem value="eu">European Union</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  ) : (
                                    <div className="bg-muted/30 rounded-lg p-6 text-center">
                                      <div className="flex flex-col items-center gap-3">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${distribution.bgColor}`}>
                                          <IconComponent className={`w-6 h-6 ${distribution.color}`} />
                                        </div>
                                        <div>
                                          <h6 className="font-medium text-sm">{distribution.name} Settings</h6>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            Enable this distribution type to configure its settings
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </CollapsibleContent>
                            </Card>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="discount" className="p-6 pt-4 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Incentive Settings</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Reward customers for completing your survey to increase response rates
                      </p>
                    </div>

                    <Card className={`border-2 transition-all ${isDiscountEnabled ? 'border-primary bg-survey-success-light/30' : 'border-dashed border-muted'}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDiscountEnabled ? 'bg-primary' : 'bg-muted'}`}>
                              <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDiscountEnabled ? 'translate-x-6' : 'translate-x-0.5'} top-0.5`} />
                            </div>
                            <div>
                              <h4 className="font-semibold flex items-center gap-2">
                                <Gift className="w-4 h-4 text-survey-purple" />
                                Discount Incentives
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {isDiscountEnabled 
                                  ? 'Customers will receive a discount code after survey completion'
                                  : 'Enable discount rewards to boost survey completion rates'
                                }
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
                                <Select value={discountType} onValueChange={(value: 'percentage' | 'fixed') => setDiscountType(value)}>
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
                                  placeholder={discountType === 'percentage' ? '10' : '5.00'}
                                  type="number"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Code Prefix</Label>
                                <Input
                                  value={discountPrefix}
                                  onChange={(e) => setDiscountPrefix(e.target.value)}
                                  placeholder="SURVEY"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Expiry (days)</Label>
                                <Input
                                  value={discountExpiry}
                                  onChange={(e) => setDiscountExpiry(e.target.value)}
                                  type="number"
                                  placeholder="30"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg p-4 border">
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-survey-success" />
                              Preview Incentive
                            </h5>
                            <div className="bg-survey-success-light rounded-lg p-3 text-center">
                              <p className="text-survey-success font-medium">
                                🎉 Get {discountType === 'percentage' ? `${discountValue}%` : `$${discountValue}`} off your next order!
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Use code: {discountPrefix}XXXX (expires in {discountExpiry} days)
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
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
                distributionType={enabledDistributions[0] || 'post-purchase'}
                discountEnabled={isDiscountEnabled}
                discountType={discountType}
                discountValue={discountValue}
                brandedSurveySettings={brandedSurveySettings}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;