import { FormArray, FormControl } from "@angular/forms";

export const QUESTION_TYPES = ['paragraph', 'checkbox-list'] as const;

export type QuestionType = typeof QUESTION_TYPES[number];

export interface FormQuestion {
  type: FormControl<QuestionType>;
  required: FormControl<boolean>;
  question: FormControl<string>;
  answers?: FormArray<FormControl<string>>;
  other?: FormControl<boolean>;
}

export interface Question {
  type: QuestionType;
  required: boolean;
  question: string;
  answers?: string[];
  other?: boolean;
}

export type FormAnswers = Array<
  string | {
    list: Record<string, boolean>;
    other?: string;
  }
>;
