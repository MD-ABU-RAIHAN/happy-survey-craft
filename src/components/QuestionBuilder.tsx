import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  ChevronDown, 
  ChevronRight, 
  Trash2, 
  Copy,
  Plus,
  Type,
  CheckSquare,
  Star,
  BarChart3,
  Mail,
  Phone
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

interface QuestionBuilderProps {
  questions: SurveyQuestion[];
  onQuestionsChange: (questions: SurveyQuestion[]) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  questions,
  onQuestionsChange
}) => {

  const questionTypeIcons = {
    'multiple-choice': CheckSquare,
    'text': Type,
    'rating': Star,
    'nps': BarChart3,
    'email': Mail,
    'phone': Phone
  };

  const questionTypeLabels = {
    'multiple-choice': 'Multiple Choice',
    'text': 'Text Response',
    'rating': 'Rating Scale',
    'nps': 'NPS Score',
    'email': 'Email Address',
    'phone': 'Phone Number'
  };

  const addQuestion = (type: SurveyQuestion['type']) => {
    const newQuestion: SurveyQuestion = {
      id: `question-${Date.now()}`,
      type,
      title: 'New Question',
      required: false,
      options: type === 'multiple-choice' ? ['Option 1', 'Option 2'] : undefined,
      isCollapsed: false,
      placeholder: type === 'text' ? 'Enter your answer...' : undefined
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    onQuestionsChange(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
  };

  const duplicateQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      const duplicated = { 
        ...question, 
        id: `question-${Date.now()}`, 
        title: `${question.title} (Copy)` 
      };
      const index = questions.findIndex(q => q.id === id);
      const newQuestions = [...questions];
      newQuestions.splice(index + 1, 0, duplicated);
      onQuestionsChange(newQuestions);
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

    onQuestionsChange(items);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Survey Questions</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add and configure your survey questions with drag & drop
          </p>
        </div>
        
        <Select onValueChange={(value) => addQuestion(value as SurveyQuestion['type'])}>
          <SelectTrigger className="w-auto bg-primary hover:bg-primary-hover text-primary-foreground border-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </SelectTrigger>
          <SelectContent>
            {Object.entries(questionTypeLabels).map(([value, label]) => {
              const Icon = questionTypeIcons[value as keyof typeof questionTypeIcons];
              return (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {questions.length === 0 ? (
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Plus className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Start building your survey by adding your first question. Choose from multiple choice, text, ratings, and more.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={() => addQuestion('multiple-choice')}
                variant="outline"
                size="sm"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Multiple Choice
              </Button>
              <Button
                onClick={() => addQuestion('text')}
                variant="outline"
                size="sm"
              >
                <Type className="w-4 h-4 mr-2" />
                Text Response
              </Button>
              <Button
                onClick={() => addQuestion('rating')}
                variant="outline"
                size="sm"
              >
                <Star className="w-4 h-4 mr-2" />
                Rating Scale
              </Button>
              <Button
                onClick={() => addQuestion('nps')}
                variant="outline"
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                NPS Score
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {questions.map((question, index) => {
                  const QuestionIcon = questionTypeIcons[question.type];
                  
                  return (
                    <Draggable key={question.id} draggableId={question.id} index={index}>
                      {(provided, snapshot) => (
                        <Card 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`transition-all duration-200 ${
                            snapshot.isDragging ? 'shadow-xl rotate-1' : 'shadow-sm'
                          }`}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div 
                                  {...provided.dragHandleProps}
                                  className="cursor-move p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleCollapse(question.id)}
                                  className="p-1 h-auto hover:bg-muted"
                                >
                                  {question.isCollapsed ? (
                                    <ChevronRight className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </Button>
                                
                                <div className="flex items-center gap-3">
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-survey-info-light text-survey-info border-survey-info/20"
                                  >
                                    <QuestionIcon className="w-3 h-3 mr-1" />
                                    {questionTypeLabels[question.type]}
                                  </Badge>
                                  
                                  {question.isCollapsed && (
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{question.title}</span>
                                      {question.required && (
                                        <span className="text-xs text-muted-foreground">Required</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => duplicateQuestion(question.id)}
                                  className="h-8 w-8 p-0 hover:bg-muted"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteQuestion(question.id)}
                                  className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          
                          {!question.isCollapsed && (
                            <CardContent className="space-y-6">
                              <div className="grid gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Question Title</Label>
                                  <Input
                                    value={question.title}
                                    onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                                    placeholder="Enter your question"
                                    className="font-medium"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Description (Optional)</Label>
                                  <Textarea
                                    value={question.description || ''}
                                    onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                                    placeholder="Add additional context or instructions"
                                    rows={2}
                                    className="resize-none"
                                  />
                                </div>

                                {(question.type === 'text' || question.type === 'email' || question.type === 'phone') && (
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Placeholder Text</Label>
                                    <Input
                                      value={question.placeholder || ''}
                                      onChange={(e) => updateQuestion(question.id, { placeholder: e.target.value })}
                                      placeholder="Enter placeholder text..."
                                    />
                                  </div>
                                )}

                                {question.type === 'multiple-choice' && question.options && (
                                  <div className="space-y-3">
                                    <Label className="text-sm font-medium">Answer Options</Label>
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
                                                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                                                      snapshot.isDragging ? 'bg-survey-info-light' : 'hover:bg-muted/50'
                                                    }`}
                                                  >
                                                    <div 
                                                      {...provided.dragHandleProps}
                                                      className="cursor-move p-1 hover:bg-muted rounded"
                                                    >
                                                      <GripVertical className="w-3 h-3 text-muted-foreground" />
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
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
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
                                      className="w-full"
                                    >
                                      <Plus className="w-4 h-4 mr-2" />
                                      Add Option
                                    </Button>
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t">
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={question.required}
                                      onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                                    />
                                    <Label className="text-sm">Required Question</Label>
                                  </div>
                                  
                                  <Badge variant={question.required ? "default" : "secondary"}>
                                    {question.required ? 'Required' : 'Optional'}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default QuestionBuilder;