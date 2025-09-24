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
  Monitor
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

const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState('Customer Feedback Survey');
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'full'>('desktop');
  
  // Distribution Settings
  const [enabledDistributions, setEnabledDistributions] = useState<string[]>(['post-purchase']);
  const [collapsedDistributions, setCollapsedDistributions] = useState<string[]>([]);
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
    setEnabledDistributions(prev =>
      prev.includes(distributionId)
        ? prev.filter(id => id !== distributionId)
        : [...prev, distributionId]
    );
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;