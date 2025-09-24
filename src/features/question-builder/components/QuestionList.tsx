/**
 * Question List Component
 * Manages the list of questions with drag and drop
 */

import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { SurveyQuestion } from "@/types";
import { QuestionItem } from "./QuestionItem";

interface QuestionListProps {
  questions: SurveyQuestion[];
  onUpdateQuestion: (id: string, updates: Partial<SurveyQuestion>) => void;
  onDeleteQuestion: (id: string) => void;
  onDuplicateQuestion: (id: string) => void;
  onReorderQuestions: (startIndex: number, endIndex: number) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onUpdateQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onReorderQuestions,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorderQuestions(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <QuestionItem
                      question={question}
                      index={index}
                      isDragging={snapshot.isDragging}
                      dragHandleProps={provided.dragHandleProps}
                      onUpdate={(updates) =>
                        onUpdateQuestion(question.id, updates)
                      }
                      onDelete={() => onDeleteQuestion(question.id)}
                      onDuplicate={() => onDuplicateQuestion(question.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
