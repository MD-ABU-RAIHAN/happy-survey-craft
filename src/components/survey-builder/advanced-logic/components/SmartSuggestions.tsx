import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Lightbulb,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  Sparkles,
  Brain,
  Zap,
  X,
} from 'lucide-react';
import { SurveyQuestion, LogicSuggestion, Condition } from '@/types/logic';

interface SmartSuggestionsProps {
  questions: SurveyQuestion[];
  onApplySuggestion: (suggestion: LogicSuggestion) => void;
  onDismiss?: () => void;
  isVisible?: boolean;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  questions,
  onApplySuggestion,
  onDismiss,
  isVisible = true,
}) => {
  const [suggestions, setSuggestions] = useState<LogicSuggestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    generateSuggestions();
  }, [questions]);

  const generateSuggestions = () => {
    const generatedSuggestions: LogicSuggestion[] = [];

    // Analyze questions and generate contextual suggestions
    questions.forEach((question) => {
      // NPS-specific suggestions
      if (question.type === 'nps') {
        generatedSuggestions.push({
          id: `nps-detractor-${question.id}`,
          type: 'condition',
          title: 'NPS Detractor Follow-up',
          description: 'Ask detractors (0-6) for specific improvement feedback',
          confidence: 0.95,
          category: 'common_pattern',
          suggestedLogic: {
            type: 'single',
            clauses: [{
              subject: question.id,
              operator: 'lte',
              value: 6,
            }],
          },
          applicableQuestions: [question.id],
          expectedImprovement: {
            completionRate: 0.15,
            responseQuality: 0.25,
          },
        });

        generatedSuggestions.push({
          id: `nps-promoter-${question.id}`,
          type: 'condition',
          title: 'NPS Promoter Leverage',
          description: 'Ask promoters (9-10) for referrals or testimonials',
          confidence: 0.90,
          category: 'engagement',
          suggestedLogic: {
            type: 'single',
            clauses: [{
              subject: question.id,
              operator: 'gte',
              value: 9,
            }],
          },
          applicableQuestions: [question.id],
          expectedImprovement: {
            engagement: 0.30,
          },
        });
      }

      // Rating-specific suggestions
      if (question.type === 'rating') {
        generatedSuggestions.push({
          id: `rating-low-${question.id}`,
          type: 'condition',
          title: 'Low Rating Recovery',
          description: 'Follow up on low ratings (1-2) with improvement questions',
          confidence: 0.88,
          category: 'optimization',
          suggestedLogic: {
            type: 'single',
            clauses: [{
              subject: question.id,
              operator: 'lte',
              value: 2,
            }],
          },
          applicableQuestions: [question.id],
          expectedImprovement: {
            responseQuality: 0.20,
          },
        });
      }

      // Satisfaction-specific suggestions
      if (question.type === 'satisfaction') {
        generatedSuggestions.push({
          id: `satisfaction-negative-${question.id}`,
          type: 'condition',
          title: 'Negative Satisfaction Follow-up',
          description: 'Deep dive into dissatisfaction causes',
          confidence: 0.85,
          category: 'common_pattern',
          suggestedLogic: {
            type: 'single',
            clauses: [{
              subject: question.id,
              operator: 'in',
              value: ['Very Dissatisfied', 'Dissatisfied'],
            }],
          },
          applicableQuestions: [question.id],
        });
      }

      // Choice-based suggestions
      if (question.type === 'multiple-choice' || question.type === 'single-choice') {
        if (question.options && question.options.length > 3) {
          generatedSuggestions.push({
            id: `choice-branch-${question.id}`,
            type: 'flow',
            title: 'Choice-Based Branching',
            description: 'Create different paths for each major choice option',
            confidence: 0.80,
            category: 'personalization',
            suggestedLogic: {
              type: 'single',
              clauses: [{
                subject: question.id,
                operator: 'equals',
                value: question.options[0],
              }],
            },
            applicableQuestions: [question.id],
          });
        }
      }
    });

    // Advanced multi-question suggestions
    const ratingQuestions = questions.filter(q => q.type === 'rating' || q.type === 'satisfaction' || q.type === 'nps');
    if (ratingQuestions.length >= 2) {
      generatedSuggestions.push({
        id: 'multi-rating-average',
        type: 'condition',
        title: 'High Satisfaction Aggregate',
        description: 'Target users with consistently high ratings across multiple questions',
        confidence: 0.82,
        category: 'personalization',
        suggestedLogic: {
          type: 'aggregate',
          clauses: [{
            subject: 'aggregate.rating_average',
            operator: 'gte',
            value: 4,
            aggregation: 'average',
            questionIds: ratingQuestions.map(q => q.id),
          }],
        },
        applicableQuestions: ratingQuestions.map(q => q.id),
        expectedImprovement: {
          completionRate: 0.12,
          engagement: 0.18,
        },
      });
    }

    // Customer data suggestions
    generatedSuggestions.push({
      id: 'high-value-customer',
      type: 'condition',
      title: 'High-Value Customer Path',
      description: 'Create premium experience for high-LTV customers',
      confidence: 0.78,
      category: 'personalization',
      suggestedLogic: {
        type: 'single',
        clauses: [{
          subject: 'customer.ltv',
          operator: 'gt',
          value: 500,
        }],
      },
      applicableQuestions: [],
      expectedImprovement: {
        engagement: 0.25,
        responseQuality: 0.15,
      },
    });

    // Engagement-based suggestions
    generatedSuggestions.push({
      id: 'quick-completion',
      type: 'condition',
      title: 'Engagement-Based Routing',
      description: 'Shorter survey for users showing high engagement',
      confidence: 0.75,
      category: 'optimization',
      suggestedLogic: {
        type: 'single',
        clauses: [{
          subject: 'analytics.engagementScore',
          operator: 'gt',
          value: 0.8,
        }],
      },
      applicableQuestions: [],
      expectedImprovement: {
        completionRate: 0.20,
      },
    });

    setSuggestions(generatedSuggestions);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'common_pattern': return <Lightbulb className="w-4 h-4" />;
      case 'optimization': return <TrendingUp className="w-4 h-4" />;
      case 'personalization': return <Users className="w-4 h-4" />;
      case 'engagement': return <Target className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'common_pattern': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'optimization': return 'bg-green-50 text-green-700 border-green-200';
      case 'personalization': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'engagement': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredSuggestions = selectedCategory === 'all'
    ? suggestions
    : suggestions.filter(s => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Suggestions', count: suggestions.length },
    { id: 'common_pattern', label: 'Common Patterns', count: suggestions.filter(s => s.category === 'common_pattern').length },
    { id: 'optimization', label: 'Optimization', count: suggestions.filter(s => s.category === 'optimization').length },
    { id: 'personalization', label: 'Personalization', count: suggestions.filter(s => s.category === 'personalization').length },
    { id: 'engagement', label: 'Engagement', count: suggestions.filter(s => s.category === 'engagement').length },
  ];

  if (!isVisible || suggestions.length === 0) return null;

  return (
    <Card className="w-full border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Brain className="w-4 h-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Smart Logic Suggestions</CardTitle>
          </div>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations to improve your survey logic and completion rates
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.label}
              {category.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <Separator />

        {/* Suggestions List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onApplySuggestion(suggestion)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${getCategoryColor(suggestion.category)}`}>
                      {getCategoryIcon(suggestion.category)}
                    </div>
                    <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{ color: `hsl(${Math.round(suggestion.confidence * 120)}, 70%, 45%)` }}
                    >
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>

                  {suggestion.expectedImprovement && (
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      {suggestion.expectedImprovement.completionRate && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{Math.round(suggestion.expectedImprovement.completionRate * 100)}% completion
                        </span>
                      )}
                      {suggestion.expectedImprovement.engagement && (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          +{Math.round(suggestion.expectedImprovement.engagement * 100)}% engagement
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1" />
              </div>
            </div>
          ))}
        </div>

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No suggestions available for this category</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;