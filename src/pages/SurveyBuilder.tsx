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
  Plus, 
  GripVertical, 
  ChevronDown, 
  ChevronRight, 
  Trash2, 
  Copy,
  Monitor,
  Smartphone,
  Maximize,
  Edit3,
  Settings
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface SurveyQuestion {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'nps';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
}

const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState('Untitled Survey');
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'full'>('desktop');
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('10');

  const addQuestion = (type: SurveyQuestion['type']) => {
    const newQuestion: SurveyQuestion = {
      id: `question-${Date.now()}`,
      type,
      title: 'New Question',
      required: false,
      options: type === 'multiple-choice' ? ['Option 1', 'Option 2'] : undefined,
      isCollapsed: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const duplicateQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      const duplicated = { ...question, id: `question-${Date.now()}`, title: `${question.title} (Copy)` };
      const index = questions.findIndex(q => q.id === id);
      const newQuestions = [...questions];
      newQuestions.splice(index + 1, 0, duplicated);
      setQuestions(newQuestions);
    }
  };

  const toggleCollapse = (id: string) => {
    updateQuestion(id, { isCollapsed: !questions.find(q => q.id === id)?.isCollapsed });
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      updateQuestion(questionId, { 
        options: [...question.options, `Option ${question.options.length + 1}`] 
      });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const onOptionDragEnd = (questionId: string, result: any) => {
    if (!result.destination) return;

    const question = questions.find(q => q.id === questionId);
    if (!question?.options) return;

    const items = Array.from(question.options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateQuestion(questionId, { options: items });
  };

  return (
    <div className="min-h-screen bg-survey-gray-light">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-survey-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MS</span>
                </div>
                <div>
                  <h1 className="text-sm font-medium">MS Survey App</h1>
                  <p className="text-xs text-muted-foreground">Customer Survey Builder</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  value={surveyTitle} 
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  className="font-medium border-none shadow-none text-lg bg-transparent"
                />
                <Edit3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Status
              </Button>
              <Button variant="outline" size="sm">Preview</Button>
              <Button className="bg-survey-blue hover:bg-primary-hover">Save Survey</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Survey</CardTitle>
                <p className="text-sm text-muted-foreground">Design and configure your customer survey</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="builder" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="builder" className="data-[state=active]:bg-survey-blue data-[state=active]:text-white">
                      Survey Builder
                    </TabsTrigger>
                    <TabsTrigger value="distribution">Distribution</TabsTrigger>
                    <TabsTrigger value="discount">Discount</TabsTrigger>
                  </TabsList>

                  <TabsContent value="builder" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">Survey Questions</h3>
                          <p className="text-sm text-muted-foreground">Add and configure your survey questions</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select onValueChange={(value) => addQuestion(value as SurveyQuestion['type'])}>
                            <SelectTrigger className="w-auto bg-survey-blue hover:bg-primary-hover text-white border-survey-blue">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Question
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                              <SelectItem value="text">Text Response</SelectItem>
                              <SelectItem value="rating">Rating Scale</SelectItem>
                              <SelectItem value="nps">NPS Score</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {questions.length === 0 ? (
                        <Card className="border-dashed border-2 border-survey-gray">
                          <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="w-16 h-16 bg-survey-gray-light rounded-full flex items-center justify-center mb-4">
                              <Plus className="w-8 h-8 text-survey-gray" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                            <p className="text-sm text-muted-foreground mb-4 text-center">
                              Start building your survey by adding your first question
                            </p>
                            <Button 
                              onClick={() => addQuestion('multiple-choice')}
                              className="bg-survey-blue hover:bg-primary-hover"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Your First Question
                            </Button>
                          </CardContent>
                        </Card>
                      ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable droppableId="questions">
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                {questions.map((question, index) => (
                                  <Draggable key={question.id} draggableId={question.id} index={index}>
                                    {(provided, snapshot) => (
                                      <Card 
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                      >
                                        <CardHeader className="pb-3">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                              <div 
                                                {...provided.dragHandleProps}
                                                className="cursor-move p-1 hover:bg-survey-gray-light rounded"
                                              >
                                                <GripVertical className="w-4 h-4 text-survey-gray" />
                                              </div>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleCollapse(question.id)}
                                                className="p-0 h-auto hover:bg-transparent"
                                              >
                                                {question.isCollapsed ? (
                                                  <ChevronRight className="w-4 h-4" />
                                                ) : (
                                                  <ChevronDown className="w-4 h-4" />
                                                )}
                                              </Button>
                                              <div className="flex flex-col">
                                                <Badge variant="secondary" className="text-xs w-fit mb-1">
                                                  {question.type.replace('-', ' ').toUpperCase()}
                                                </Badge>
                                                {question.isCollapsed && (
                                                  <span className="text-sm font-medium">{question.title}</span>
                                                )}
                                              </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => duplicateQuestion(question.id)}
                                              >
                                                <Copy className="w-4 h-4" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteQuestion(question.id)}
                                                className="text-destructive hover:text-destructive"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </CardHeader>
                                        
                                        {!question.isCollapsed && (
                                          <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                              <Label>Question Title</Label>
                                              <Input
                                                value={question.title}
                                                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                                                placeholder="Enter your question"
                                              />
                                            </div>
                                            
                                            <div className="space-y-2">
                                              <Label>Description (Optional)</Label>
                                              <Textarea
                                                value={question.description || ''}
                                                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                                placeholder="Add additional context for your question"
                                                rows={2}
                                              />
                                            </div>

                                            {question.type === 'multiple-choice' && question.options && (
                                              <div className="space-y-2">
                                                <Label>Answer Options</Label>
                                                <DragDropContext onDragEnd={(result) => onOptionDragEnd(question.id, result)}>
                                                  <Droppable droppableId={`options-${question.id}`}>
                                                    {(provided) => (
                                                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                                        {question.options?.map((option, optionIndex) => (
                                                          <Draggable 
                                                            key={`${question.id}-option-${optionIndex}`} 
                                                            draggableId={`${question.id}-option-${optionIndex}`} 
                                                            index={optionIndex}
                                                          >
                                                            {(provided, snapshot) => (
                                                              <div 
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className={`flex items-center space-x-2 ${snapshot.isDragging ? 'bg-survey-blue-light' : ''}`}
                                                              >
                                                                <div 
                                                                  {...provided.dragHandleProps}
                                                                  className="cursor-move p-1 hover:bg-survey-gray-light rounded"
                                                                >
                                                                  <GripVertical className="w-3 h-3 text-survey-gray" />
                                                                </div>
                                                                <Input
                                                                  value={option}
                                                                  onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                                                  placeholder={`Option ${optionIndex + 1}`}
                                                                  className="flex-1"
                                                                />
                                                                {question.options && question.options.length > 2 && (
                                                                  <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => removeOption(question.id, optionIndex)}
                                                                    className="text-destructive hover:text-destructive"
                                                                  >
                                                                    <Trash2 className="w-3 h-3" />
                                                                  </Button>
                                                                )}
                                                              </div>
                                                            )}
                                                          </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                      </div>
                                                    )}
                                                  </Droppable>
                                                </DragDropContext>
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => addOption(question.id)}
                                                  className="mt-2"
                                                >
                                                  <Plus className="w-3 h-3 mr-2" />
                                                  Add Option
                                                </Button>
                                              </div>
                                            )}

                                            <div className="flex items-center space-x-2">
                                              <Switch
                                                checked={question.required}
                                                onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                                              />
                                              <Label>Required Question</Label>
                                            </div>
                                          </CardContent>
                                        )}
                                      </Card>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="distribution" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Survey Distribution</CardTitle>
                        <p className="text-sm text-muted-foreground">Configure when and where your survey appears</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Distribution Type</Label>
                          <Select defaultValue="post-purchase">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="post-purchase">Post-Purchase</SelectItem>
                              <SelectItem value="onsite">On-Site Popup</SelectItem>
                              <SelectItem value="exit-intent">Exit Intent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Trigger Delay (seconds)</Label>
                          <Input type="number" defaultValue="3" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="discount" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Discount Incentive</CardTitle>
                        <p className="text-sm text-muted-foreground">Reward customers for completing your survey</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-survey-gray">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-6 rounded-full transition-colors ${isDiscountEnabled ? 'bg-survey-blue' : 'bg-survey-gray'} relative`}>
                              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isDiscountEnabled ? 'translate-x-6' : 'translate-x-0.5'} absolute top-0.5`} />
                            </div>
                            <div>
                              <p className="font-medium">Enable Discount Rewards</p>
                              <p className="text-sm text-muted-foreground">
                                {isDiscountEnabled ? 'Customers will receive a discount code after completing the survey' : 'No discount incentive'}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={isDiscountEnabled}
                            onCheckedChange={setIsDiscountEnabled}
                          />
                        </div>

                        {isDiscountEnabled && (
                          <div className="space-y-4 p-4 bg-survey-blue-light rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Discount Type</Label>
                                <Select value={discountType} onValueChange={(value: 'percentage' | 'fixed') => setDiscountType(value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Discount Value</Label>
                                <Input
                                  value={discountValue}
                                  onChange={(e) => setDiscountValue(e.target.value)}
                                  placeholder={discountType === 'percentage' ? '10' : '5.00'}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Discount Code Prefix</Label>
                              <Input placeholder="SURVEY" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        Live Preview
                        <div className="ml-2 w-2 h-2 bg-survey-success rounded-full animate-pulse"></div>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Post-Purchase Survey</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-muted p-1 rounded">
                    <Button
                      variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewDevice('desktop')}
                      className="h-7 px-2"
                    >
                      <Monitor className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewDevice('mobile')}
                      className="h-7 px-2"
                    >
                      <Smartphone className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={previewDevice === 'full' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewDevice('full')}
                      className="h-7 px-2"
                    >
                      <Maximize className="w-3 h-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`${
                    previewDevice === 'mobile' 
                      ? 'w-full max-w-sm mx-auto' 
                      : previewDevice === 'desktop' 
                      ? 'w-full' 
                      : 'w-full'
                  } transition-all duration-200`}>
                    <div className="bg-survey-blue text-white p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Thank you for your purchase!</h3>
                      <p className="text-sm opacity-90">Help us improve your experience</p>
                    </div>
                    
                    <div className="bg-white p-6 space-y-4 border border-t-0 rounded-b-lg">
                      {questions.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No questions added yet</p>
                          <p className="text-sm text-muted-foreground">Add questions to see the preview</p>
                        </div>
                      ) : (
                        questions.map((question, index) => (
                          <div key={question.id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{index + 1}.</span>
                              <p className="font-medium">{question.title}</p>
                              {question.required && <span className="text-destructive">*</span>}
                            </div>
                            {question.description && (
                              <p className="text-sm text-muted-foreground ml-6">{question.description}</p>
                            )}
                            
                            {question.type === 'multiple-choice' && question.options && (
                              <div className="ml-6 space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border border-survey-gray rounded"></div>
                                    <span className="text-sm">{option}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {question.type === 'text' && (
                              <div className="ml-6">
                                <div className="border border-survey-gray rounded p-2 bg-muted h-8"></div>
                              </div>
                            )}
                            
                            {question.type === 'rating' && (
                              <div className="ml-6 flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div key={star} className="w-6 h-6 border border-survey-gray rounded"></div>
                                ))}
                              </div>
                            )}
                            
                            {question.type === 'nps' && (
                              <div className="ml-6">
                                <div className="flex space-x-1">
                                  {[...Array(11)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 border border-survey-gray rounded text-xs flex items-center justify-center">
                                      {i}
                                    </div>
                                  ))}
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>Not likely</span>
                                  <span>Very likely</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                      
                      <div className="pt-4">
                        <Button className="w-full bg-survey-blue hover:bg-primary-hover">
                          Submit Survey
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;