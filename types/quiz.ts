export type QuizQuestion = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export type Quiz = {
  id: string
  title: string
  description: string
  subject: "physics" | "chemistry" | "math"
  topic: string
  chapter: string
  questions: QuizQuestion[]
  difficulty: "beginner" | "intermediate" | "advanced"
  timeLimit?: number // in minutes, optional
}

// Sample quizzes data
export const quizzes: Quiz[] = [
  {
    id: "physics-mechanics-newton-laws",
    title: "Newton's Laws of Motion",
    description: "Test your knowledge of Newton's three laws of motion",
    subject: "physics",
    topic: "Mechanics",
    chapter: "Newton's Laws",
    difficulty: "intermediate",
    questions: [
      {
        id: 1,
        text: "Which law of motion states that an object will remain at rest or in uniform motion unless acted upon by an external force?",
        options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
        correctAnswer: 1,
        explanation:
          "Newton's First Law, also known as the Law of Inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
      },
      {
        id: 2,
        text: "The equation F = ma represents which of Newton's laws?",
        options: ["First Law", "Second Law", "Third Law", "Conservation of Energy"],
        correctAnswer: 1,
        explanation:
          "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is represented by the equation F = ma.",
      },
      {
        id: 3,
        text: "Which law states that for every action, there is an equal and opposite reaction?",
        options: ["First Law", "Second Law", "Third Law", "Law of Conservation of Momentum"],
        correctAnswer: 2,
        explanation:
          "Newton's Third Law states that for every action, there is an equal and opposite reaction. This means that when one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.",
      },
      {
        id: 4,
        text: "A book is at rest on a table. According to Newton's laws, which forces are in equilibrium?",
        options: [
          "Gravity and normal force",
          "Friction and gravity",
          "Normal force and friction",
          "There are no forces in equilibrium",
        ],
        correctAnswer: 0,
        explanation:
          "The gravitational force pulling the book downward is balanced by the normal force exerted upward by the table, keeping the book at rest.",
      },
      {
        id: 5,
        text: "If you push a box across a floor with constant force and it moves with constant velocity, what can you conclude?",
        options: [
          "There is no friction",
          "The friction force equals your pushing force",
          "The box has no mass",
          "Newton's laws don't apply in this situation",
        ],
        correctAnswer: 1,
        explanation:
          "If the box moves with constant velocity, the net force must be zero (Newton's First Law). This means the friction force must be equal in magnitude and opposite in direction to your pushing force.",
      },
    ],
  },
  {
    id: "physics-thermodynamics-basics",
    title: "Thermodynamics Basics",
    description: "Test your understanding of basic thermodynamic principles",
    subject: "physics",
    topic: "Thermodynamics",
    chapter: "Basic Principles",
    difficulty: "intermediate",
    questions: [
      {
        id: 1,
        text: "Which law of thermodynamics states that energy can neither be created nor destroyed?",
        options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
        correctAnswer: 1,
        explanation:
          "The First Law of Thermodynamics, also known as the Law of Conservation of Energy, states that energy cannot be created or destroyed, only transformed from one form to another.",
      },
      {
        id: 2,
        text: "What is the SI unit of temperature?",
        options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
        correctAnswer: 2,
        explanation:
          "Kelvin (K) is the SI unit of temperature. Unlike Celsius and Fahrenheit, it's an absolute temperature scale, with 0 K being absolute zero.",
      },
      {
        id: 3,
        text: "Which of the following is NOT a state function?",
        options: ["Internal Energy", "Enthalpy", "Work", "Entropy"],
        correctAnswer: 2,
        explanation:
          "Work is a path function, not a state function. This means its value depends on the path taken between the initial and final states, not just on those states themselves.",
      },
      {
        id: 4,
        text: "The second law of thermodynamics introduces the concept of:",
        options: ["Energy", "Entropy", "Enthalpy", "Equilibrium"],
        correctAnswer: 1,
        explanation:
          "The Second Law of Thermodynamics introduces the concept of entropy, which is a measure of disorder or randomness in a system.",
      },
      {
        id: 5,
        text: "In an adiabatic process:",
        options: [
          "Temperature remains constant",
          "Pressure remains constant",
          "No heat is transferred",
          "Volume remains constant",
        ],
        correctAnswer: 2,
        explanation:
          "An adiabatic process is one in which no heat is transferred between the system and its surroundings.",
      },
    ],
  },
  {
    id: "chemistry-periodic-table",
    title: "The Periodic Table",
    description: "Test your knowledge of the periodic table and element properties",
    subject: "chemistry",
    topic: "Periodic Table",
    chapter: "Element Classification",
    difficulty: "beginner",
    questions: [
      {
        id: 1,
        text: "Who is credited with creating the modern periodic table?",
        options: ["Antoine Lavoisier", "John Dalton", "Dmitri Mendeleev", "Henry Moseley"],
        correctAnswer: 2,
        explanation:
          "Dmitri Mendeleev is credited with creating the first widely recognized periodic table in 1869, arranging elements by atomic weight and chemical properties.",
      },
      {
        id: 2,
        text: "What property is used to arrange elements in the modern periodic table?",
        options: ["Atomic mass", "Atomic number", "Electron configuration", "Chemical reactivity"],
        correctAnswer: 1,
        explanation:
          "The modern periodic table arranges elements by atomic number (number of protons), which increases as you move from left to right across the table.",
      },
      {
        id: 3,
        text: "Which group in the periodic table contains the noble gases?",
        options: ["Group 1", "Group 7", "Group 8", "Group 18"],
        correctAnswer: 3,
        explanation:
          "The noble gases are found in Group 18 (formerly Group 8A or Group 0) of the periodic table. They are characterized by their full valence electron shells and low reactivity.",
      },
      {
        id: 4,
        text: "Which of these is an alkali metal?",
        options: ["Calcium", "Aluminum", "Sodium", "Chlorine"],
        correctAnswer: 2,
        explanation:
          "Sodium (Na) is an alkali metal found in Group 1 of the periodic table. Alkali metals are highly reactive metals with one electron in their outer shell.",
      },
      {
        id: 5,
        text: "As you move from left to right across a period, what generally happens to the atomic radius?",
        options: ["Increases", "Decreases", "Remains the same", "Increases then decreases"],
        correctAnswer: 1,
        explanation:
          "Atomic radius generally decreases as you move from left to right across a period. This is because the increasing nuclear charge pulls the electrons more tightly toward the nucleus.",
      },
    ],
  },
  {
    id: "math-calculus-derivatives",
    title: "Derivatives in Calculus",
    description: "Test your understanding of derivatives and differentiation",
    subject: "math",
    topic: "Calculus",
    chapter: "Derivatives",
    difficulty: "advanced",
    questions: [
      {
        id: 1,
        text: "What is the derivative of f(x) = x²?",
        options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
        correctAnswer: 1,
        explanation:
          "Using the power rule for differentiation, if f(x) = x^n, then f'(x) = n·x^(n-1). For f(x) = x², n = 2, so f'(x) = 2·x^(2-1) = 2x.",
      },
      {
        id: 2,
        text: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"],
        correctAnswer: 0,
        explanation:
          "The derivative of sin(x) is cos(x). This is one of the fundamental derivative rules in trigonometry.",
      },
      {
        id: 3,
        text: "If f(x) = e^x, what is f'(x)?",
        options: ["e^x", "x·e^x", "e^(x-1)", "1"],
        correctAnswer: 0,
        explanation:
          "The exponential function e^x is unique because it is its own derivative: if f(x) = e^x, then f'(x) = e^x.",
      },
      {
        id: 4,
        text: "What is the derivative of ln(x)?",
        options: ["1/x", "ln(x)/x", "x·ln(x)", "1/ln(x)"],
        correctAnswer: 0,
        explanation: "The derivative of the natural logarithm function ln(x) is 1/x for x > 0.",
      },
      {
        id: 5,
        text: "Using the chain rule, what is the derivative of f(x) = sin(x²)?",
        options: ["cos(x²)", "2x·cos(x²)", "2sin(x)·cos(x)", "2x·sin(x)"],
        correctAnswer: 1,
        explanation:
          "Using the chain rule, if f(x) = sin(g(x)) where g(x) = x², then f'(x) = cos(g(x))·g'(x) = cos(x²)·2x = 2x·cos(x²).",
      },
    ],
  },
]
