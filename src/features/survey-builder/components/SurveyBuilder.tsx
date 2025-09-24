/**
 * Main Survey Builder Container
 * Orchestrates the survey building experience
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, MapPin, Gift } from "lucide-react";
import { useSurvey, useUI } from "@/store";

// Feature imports
import { QuestionBuilder } from "@/features/question-builder";
import { DistributionSettings } from "@/features/distribution";
import { IncentiveSettings } from "@/features/incentives";
import { SurveyPreview } from "@/features/survey-preview";
import { SurveyHeader } from "./SurveyHeader";

interface SurveyBuilderProps {
  initialSurveyId?: string;
}

export const SurveyBuilder: React.FC<SurveyBuilderProps> = ({
  initialSurveyId,
}) => {
  const {
    survey,
    questions,
    settings,
    updateSurvey,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    reorderQuestions,
    updateSettings,
  } = useSurvey();

  const { previewDevice, setPreviewDevice } = useUI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-survey-success-light to-survey-info-light">
      <SurveyHeader survey={survey} onUpdateSurvey={updateSurvey} />

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
                    <TabsTrigger value="incentives">
                      <Gift className="w-4 h-4 mr-2" />
                      Incentives
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="builder" className="p-6 pt-4">
                    <QuestionBuilder
                      questions={questions}
                      onAddQuestion={addQuestion}
                      onUpdateQuestion={updateQuestion}
                      onDeleteQuestion={deleteQuestion}
                      onDuplicateQuestion={duplicateQuestion}
                      onReorderQuestions={reorderQuestions}
                    />
                  </TabsContent>

                  <TabsContent value="distribution" className="p-6 pt-4">
                    <DistributionSettings
                      settings={settings.distribution}
                      onUpdate={(updates) =>
                        updateSettings("distribution", updates)
                      }
                    />
                  </TabsContent>

                  <TabsContent value="incentives" className="p-6 pt-4">
                    <IncentiveSettings
                      settings={settings.incentives}
                      onUpdate={(updates) =>
                        updateSettings("incentives", updates)
                      }
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
                survey={{
                  id: survey.id || "preview",
                  title: survey.title || "Untitled Survey",
                  questions: questions,
                  status: survey.status || "draft",
                  createdAt: survey.createdAt || new Date(),
                  updatedAt: survey.updatedAt || new Date(),
                  settings: settings,
                  ...survey,
                }}
                device={previewDevice === "full" ? "desktop" : previewDevice}
                onDeviceChange={(device) =>
                  setPreviewDevice(device === "tablet" ? "desktop" : device)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
