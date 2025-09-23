import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Monitor, 
  Smartphone, 
  Maximize, 
  Star, 
  X,
  ArrowRight
} from 'lucide-react';

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

interface SurveyPreviewProps {
  questions: SurveyQuestion[];
  previewDevice: 'desktop' | 'mobile' | 'full';
  setPreviewDevice: (device: 'desktop' | 'mobile' | 'full') => void;
  distributionType: 'post-purchase' | 'onsite' | 'exit-intent' | 'email';
  discountEnabled: boolean;
  discountType: 'percentage' | 'fixed';
  discountValue: string;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  questions,
  previewDevice,
  setPreviewDevice,
  distributionType,
  discountEnabled,
  discountType,
  discountValue
}) => {

  const getPreviewTitle = () => {
    switch (distributionType) {
      case 'post-purchase':
        return 'Thank you for your purchase!';
      case 'onsite':
        return 'Help us improve your experience';
      case 'exit-intent':
        return 'Wait! Before you go...';
      case 'email':
        return 'We value your feedback';
      default:
        return 'Customer Survey';
    }
  };

  const getPreviewSubtitle = () => {
    switch (distributionType) {
      case 'post-purchase':
        return 'Help us improve your experience with a quick survey';
      case 'onsite':
        return 'Take a moment to share your thoughts';
      case 'exit-intent':
        return 'Get 10% off your next order for 2 minutes of your time';
      case 'email':
        return 'Your feedback helps us serve you better';
      default:
        return 'Please answer a few quick questions';
    }
  };

  const getPreviewStyle = () => {
    switch (distributionType) {
      case 'post-purchase':
        return 'bg-primary text-primary-foreground';
      case 'onsite':
        return 'bg-secondary-brand text-white';
      case 'exit-intent':
        return 'bg-survey-purple text-white';
      case 'email':
        return 'bg-gradient-to-r from-survey-success to-primary text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const renderQuestionPreview = (question: SurveyQuestion, index: number) => {
    return (
      <div key={question.id} className="space-y-3 pb-4 border-b border-border last:border-b-0">
        <div className="flex items-start space-x-2">
          <span className="text-sm font-medium text-muted-foreground mt-1">
            {index + 1}.
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">{question.title}</p>
              {question.required && (
                <span className="text-destructive text-xs">*</span>
              )}
            </div>
            {question.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {question.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="ml-6 space-y-2">
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-muted-foreground rounded-sm"></div>
                  <span className="text-sm text-muted-foreground">{option}</span>
                </div>
              ))}
            </div>
          )}
          
          {question.type === 'text' && (
            <div className="space-y-2">
              <Input 
                placeholder={question.placeholder || "Your answer..."} 
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}

          {question.type === 'email' && (
            <div className="space-y-2">
              <Input 
                type="email"
                placeholder="your.email@example.com" 
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}

          {question.type === 'phone' && (
            <div className="space-y-2">
              <Input 
                type="tel"
                placeholder="+1 (555) 123-4567" 
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}
          
          {question.type === 'rating' && (
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="w-5 h-5 text-survey-warning cursor-pointer hover:fill-current" 
                />
              ))}
            </div>
          )}
          
          {question.type === 'nps' && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {[...Array(11)].map((_, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 border border-muted-foreground rounded text-xs flex items-center justify-center hover:bg-muted"
                    disabled
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <Badge variant="secondary" className="bg-survey-success-light text-survey-success border-survey-success/20">
              <div className="w-2 h-2 bg-survey-success rounded-full animate-pulse mr-1"></div>
              Live
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setPreviewDevice('desktop')}
            className="h-8 px-3"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setPreviewDevice('mobile')}
            className="h-8 px-3"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === 'full' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setPreviewDevice('full')}
            className="h-8 px-3"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground capitalize">
          {distributionType.replace('-', ' ')} Survey
        </div>
      </CardHeader>
      
      <CardContent>
        <div className={`${
          previewDevice === 'mobile' 
            ? 'w-full max-w-sm mx-auto' 
            : previewDevice === 'desktop' 
            ? 'w-full max-w-md mx-auto' 
            : 'w-full'
        } transition-all duration-300 shadow-lg rounded-lg overflow-hidden bg-white border`}>
          
          {/* Survey Header */}
          <div className={`${getPreviewStyle()} p-6 relative`}>
            {distributionType === 'exit-intent' && (
              <button className="absolute top-4 right-4 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{getPreviewTitle()}</h3>
              <p className="text-sm opacity-90">{getPreviewSubtitle()}</p>
            </div>
            
            {discountEnabled && distributionType === 'exit-intent' && (
              <div className="mt-4 bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>🎉</span>
                  <span>
                    Get {discountType === 'percentage' ? `${discountValue}%` : `$${discountValue}`} off 
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Survey Body */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">No questions added yet</p>
                <p className="text-sm text-muted-foreground">Add questions to see the preview</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => renderQuestionPreview(question, index))}
                
                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                    Submit Survey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  {discountEnabled && distributionType === 'post-purchase' && (
                    <div className="text-center">
                      <div className="bg-survey-success-light rounded-lg p-3">
                        <p className="text-sm text-survey-success font-medium">
                          🎉 Get {discountType === 'percentage' ? `${discountValue}%` : `$${discountValue}`} off your next order!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Discount code will be sent to your email
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Preview Info */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Preview shows how your survey will appear to customers
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;