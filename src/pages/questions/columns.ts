export const questionFormFields = [
  {
    field: "content",
    type: "text",
    label: "Content",
    maxLength: 50000,
  },
  {
    field: "questionImage",
    type: "file",
    label: "Question Image",
  },
  {
    field: "answerImage",
    type: "file",
    label: "Answer Image",
  },
  {
    field: "options",
    options: [
      { option1: "option1" },
      { option2: "option2" },
      { option1: "option1" },
      { option2: "option2" },
    ],
    type: "text-array",
    label: "Options",
    maxOptions: 4,
  },
  {
    field: "answerIndex",
    type: "number",
    label: "Answer Index",
    min: 1,
    max: 4,
  },
  {
    field: "explanation",
    type: "text",
    label: "Explanation",
    maxLength: 50000,
  },
  {
    field: "exam",
    type: "select",
    label: "Exam",
  },
  {
    field: "questionCategory",
    type: "select",
    label: "Question Category",
  },
];

