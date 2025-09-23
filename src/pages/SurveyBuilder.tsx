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
  TrendingUp
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
  const [distributionType, setDistributionType] = useState<'post-purchase' | 'onsite' | 'exit-intent' | 'email'>('post-purchase');
  const [triggerDelay, setTriggerDelay] = useState('3');
  const [displayDuration, setDisplayDuration] = useState('30');
  const [targetAudience, setTargetAudience] = useState('all-customers');
  
  // Discount Settings
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('10');
  const [discountPrefix, setDiscountPrefix] = useState('SURVEY');
  const [discountExpiry, setDiscountExpiry] = useState('30');

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
                        Configure when and where your survey appears to maximize response rates
                      </p>
                    </div>

                    <div className="grid gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Zap className="w-4 h-4 text-survey-warning" />
                            Survey Type & Placement
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Distribution Type</Label>
                            <Select value={distributionType} onValueChange={(value) => setDistributionType(value as any)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="post-purchase">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    Post-Purchase Survey
                                  </div>
                                </SelectItem>
                                <SelectItem value="onsite">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-secondary-brand rounded-full"></div>
                                    On-Site Popup
                                  </div>
                                </SelectItem>
                                <SelectItem value="exit-intent">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-survey-purple rounded-full"></div>
                                    Exit-Intent Survey
                                  </div>
                                </SelectItem>
                                <SelectItem value="email">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-survey-success rounded-full"></div>
                                    Email Campaign
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Trigger Delay (seconds)</Label>
                              <Input 
                                type="number" 
                                value={triggerDelay}
                                onChange={(e) => setTriggerDelay(e.target.value)}
                                min="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Display Duration (seconds)</Label>
                              <Input 
                                type="number" 
                                value={displayDuration}
                                onChange={(e) => setDisplayDuration(e.target.value)}
                                min="5"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Users className="w-4 h-4 text-secondary-brand" />
                            Target Audience
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Customer Segment</Label>
                            <Select value={targetAudience} onValueChange={setTargetAudience}>
                              <SelectTrigger>
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
                              <Label>Min. Order Value</Label>
                              <Input type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                              <Label>Geographic Location</Label>
                              <Select defaultValue="all">
                                <SelectTrigger>
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
                        </CardContent>
                      </Card>
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
                distributionType={distributionType}
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