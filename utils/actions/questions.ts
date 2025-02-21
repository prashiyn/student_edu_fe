'use server';

import { Question, QuestionAnswer } from '@/types/question';

const dummyQuestions: Question[] = [
  {
    id: '1',
    questionNumber: 1,
    content: `# Reading and Writing
    
The following text is excerpted from a passage about the history of coffee cultivation.

*Coffee cultivation first began in Ethiopia, where the coffee plant originated. The earliest substantiated evidence of coffee drinking appears in Yemen in the middle of the 15th century in Sufi monasteries. By the 16th century, it had reached the rest of the Middle East, South India, Persia, Turkey, Horn of Africa, and northern Africa.*

Which choice best describes the main purpose of this paragraph?`,
    choices: [
      { id: 'a', content: 'To trace the geographic spread of coffee consumption from its origins' },
      { id: 'b', content: 'To explain the religious significance of coffee in ancient cultures' },
      { id: 'c', content: 'To compare different methods of coffee cultivation across regions' },
      { id: 'd', content: 'To argue for the superiority of Ethiopian coffee production' }
    ],
    metadata: {
      subject: 'Reading and Writing',
      domain: 'Reading Comprehension',
      skill: 'Main Idea and Purpose'
    },
    totalQuestions: 5
  },
  {
    id: '2',
    questionNumber: 2,
    content: `# Math (Calculator)
    
A company's profit, P(x), in thousands of dollars, can be modeled by the quadratic function:

\`\`\`math
P(x) = -2x^2 + 24x - 50
\`\`\`

where x is the number of units produced and sold, in thousands. What is the maximum profit the company can achieve?`,
    choices: [
      { id: 'a', content: '$22,000' },
      { id: 'b', content: '$72,000' },
      { id: 'c', content: '$50,000' },
      { id: 'd', content: '$24,000' }
    ],
    metadata: {
      subject: 'Math',
      domain: 'Algebra',
      skill: 'Quadratic Functions'
    },
    totalQuestions: 5
  },
  {
    id: '3',
    questionNumber: 3,
    content: `# Reading and Writing

Select the word or phrase that best completes the sentence.

Despite her _______ nature, Sarah managed to deliver a compelling presentation to the board of directors.

`,
    choices: [
      { id: 'a', content: 'reticent' },
      { id: 'b', content: 'gregarious' },
      { id: 'c', content: 'diplomatic' },
      { id: 'd', content: 'methodical' }
    ],
    metadata: {
      subject: 'Reading and Writing',
      domain: 'Writing',
      skill: 'Vocabulary in Context'
    },
    totalQuestions: 5
  },
  {
    id: '4',
    questionNumber: 4,
    content: `# Math (No Calculator)

If \`\\sin \\theta = \\frac{4}{5}\` and \`\\theta\` is in the first quadrant, what is the value of \`\\cos \\theta\`?

\`\`\`math
\\sin^2 \\theta + \\cos^2 \\theta = 1
\`\`\`
`,
    choices: [
      { id: 'a', content: '\`\\frac{3}{5}\`' },
      { id: 'b', content: '\`\\frac{4}{5}\`' },
      { id: 'c', content: '\`\\frac{5}{4}\`' },
      { id: 'd', content: '\`\\frac{5}{3}\`' }
    ],
    metadata: {
      subject: 'Math',
      domain: 'Trigonometry',
      skill: 'Right Triangle Trigonometry'
    },
    totalQuestions: 5
  },
  {
    id: '5',
    questionNumber: 5,
    content: `# Reading and Writing

The following graph shows monthly coffee sales at a local café over one year.

\`\`\`mermaid
---
config:
    xyChart:
        width: 900
        height: 600
    themeVariables:
        xyChart:
            titleColor: "#ff0000"
---
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

\`\`\`

Based on the data shown in the graph, which statement is best supported?`,
    choices: [
      { id: 'a', content: 'Coffee sales peak during summer months' },
      { id: 'b', content: 'The café loses money in winter' },
      { id: 'c', content: 'Customer preferences change seasonally' },
      { id: 'd', content: 'The café should close during winter' }
    ],
    metadata: {
      subject: 'Reading and Writing',
      domain: 'Data Analysis',
      skill: 'Graph Interpretation'
    },
    totalQuestions: 5
  }
];

const dummyAnswers: Record<string, QuestionAnswer> = {
  '1': {
    id: '1',
    correctChoiceId: 'a',
    explanation: `# Explanation
The correct answer is A: To trace the geographic spread of coffee consumption from its origins.

The paragraph clearly:
1. Identifies Ethiopia as the origin point
2. Mentions Yemen as the first documented location of coffee drinking
3. Lists the subsequent regions where coffee spread
4. Provides a chronological progression (15th century → 16th century)

This structure directly supports the purpose of tracing coffee's geographic spread from its origins.`
  },
  '2': {
    id: '2',
    correctChoiceId: 'a',
    explanation: `# Explanation
The correct answer is A: $22,000

To find the maximum profit:
1. The profit function is a quadratic function (opens downward)
2. Maximum occurs at the axis of symmetry: x = -b/(2a)
3. x = -24/(-4) = 6
4. Maximum profit = P(6)
   = -2(6)² + 24(6) - 50
   = -72 + 144 - 50
   = 22

Therefore, the maximum profit is $22,000.`
  },
  '3': {
    id: '3',
    correctChoiceId: 'a',
    explanation: `# Explanation
The correct answer is A: reticent

The sentence implies a contrast between Sarah's nature and her successful presentation. 
- Reticent means shy or reserved
- This creates the appropriate contrast with "compelling presentation"
- The word "Despite" signals this contrasting relationship

Other choices:
- Gregarious (outgoing) would not create the needed contrast
- Diplomatic and methodical don't create meaningful contrast with giving a compelling presentation`
  },
  '4': {
    id: '4',
    correctChoiceId: 'a',
    explanation: `# Explanation
The correct answer is A: \`\\frac{3}{5}\`

Given: \`\\sin \\theta = \\frac{4}{5}\` and \`\\sin^2 \\theta + \\cos^2 \\theta = 1\`

1. Substitute \`\\sin \\theta = \\frac{4}{5}\` into the Pythagorean identity:
   \`(\\frac{4}{5})^2 + \\cos^2 \\theta = 1\`

2. Solve for \`\\cos^2 \\theta\`:
   \`\\frac{16}{25} + \\cos^2 \\theta = 1\`
   \`\\cos^2 \\theta = 1 - \\frac{16}{25} = \\frac{9}{25}\`

3. Since θ is in first quadrant, \`\\cos \\theta\` is positive:
   \`\\cos \\theta = \\frac{3}{5}\``
  },
  '5': {
    id: '5',
    correctChoiceId: 'a',
    explanation: `# Explanation
The correct answer is A: Coffee sales peak during summer months

The graph shows:
1. Highest sales in July (4,500 cups)
2. Second highest in August (4,200 cups)
3. Third highest in June (4,000 cups)

This clearly demonstrates a peak during summer months.

Other choices:
- B is unsupported (no profit data shown)
- C requires assumptions about customer behavior
- D is an extreme conclusion not supported by data`
  }
};

export async function getQuestion(questionNumber: number): Promise<Question | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyQuestions.find(q => q.questionNumber === questionNumber) || null;
}

export async function getAnswer(questionId: string): Promise<QuestionAnswer | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyAnswers[questionId] || null;
} 