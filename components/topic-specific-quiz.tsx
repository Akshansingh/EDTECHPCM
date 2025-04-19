"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"

// Define the quiz question type
type QuizQuestion = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

// Props for the component
interface TopicSpecificQuizProps {
  subject: "physics" | "chemistry" | "math"
  topic: string
  onClose: () => void
}

// Sample quiz data for different topics
const quizData: Record<string, QuizQuestion[]> = {
  // Physics Topics
  "Newton's First Law of Motion": [
    {
      id: 1,
      text: "Which of the following best describes Newton's First Law of Motion?",
      options: [
        "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "The acceleration of an object is directly proportional to the net force acting on it",
      ],
      correctAnswer: 0,
      explanation:
        "Newton's First Law, also known as the Law of Inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
    },
    {
      id: 2,
      text: "A book is sitting on a table. Which forces are acting on the book?",
      options: [
        "Only gravity",
        "Only the normal force from the table",
        "Both gravity and the normal force from the table",
        "No forces are acting on the book",
      ],
      correctAnswer: 2,
      explanation:
        "The book has gravity pulling it downward and the normal force from the table pushing upward. These forces are balanced, keeping the book at rest.",
    },
    {
      id: 3,
      text: "Why do passengers in a car feel pushed back into their seats when the car accelerates forward?",
      options: [
        "Because of Newton's Third Law",
        "Because of Newton's First Law (inertia)",
        "Because of gravity",
        "Because of the car's engine power",
      ],
      correctAnswer: 1,
      explanation:
        "This is due to inertia (Newton's First Law). The body tends to remain at rest while the car moves forward, creating the feeling of being pushed back.",
    },
  ],
  Thermodynamics: [
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

  // Chemistry Topics
  "Nature of Matter": [
    {
      id: 1,
      text: "Which of the following is NOT a state of matter?",
      options: ["Solid", "Liquid", "Gas", "Energy"],
      correctAnswer: 3,
      explanation:
        "The three classical states of matter are solid, liquid, and gas. Energy is a form of power, not a state of matter. Modern physics also recognizes plasma as a fourth state of matter.",
    },
    {
      id: 2,
      text: "What is the primary difference between solids and liquids?",
      options: [
        "Solids have definite shape and volume, liquids have definite volume but not shape",
        "Solids are always crystalline, liquids are always amorphous",
        "Solids cannot flow, liquids can flow",
        "Solids have higher density than liquids",
      ],
      correctAnswer: 0,
      explanation:
        "Solids have definite shape and volume due to strong intermolecular forces that hold particles in fixed positions. Liquids have definite volume but take the shape of their container because particles can move past each other while remaining close together.",
    },
    {
      id: 3,
      text: "Which statement about gases is correct?",
      options: [
        "Gases have definite shape and volume",
        "Gases have definite volume but not shape",
        "Gases have neither definite shape nor definite volume",
        "Gases have definite shape but not definite volume",
      ],
      correctAnswer: 2,
      explanation:
        "Gases have neither definite shape nor definite volume. They expand to fill their container completely and can be compressed significantly because their particles are far apart and move freely.",
    },
  ],
  "Periodic Table": [
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
  ],

  // Math Topics
  Sets: [
    {
      id: 1,
      text: "What is the union of sets A = {1, 2, 3} and B = {3, 4, 5}?",
      options: ["{1, 2, 3, 4, 5}", "{1, 2, 3, 3, 4, 5}", "{3}", "{1, 2, 4, 5}"],
      correctAnswer: 0,
      explanation:
        "The union of sets A and B, denoted as A ∪ B, contains all elements that are in either A or B or both. So A ∪ B = {1, 2, 3, 4, 5}.",
    },
    {
      id: 2,
      text: "What is the intersection of sets A = {1, 2, 3} and B = {3, 4, 5}?",
      options: ["{1, 2, 3, 4, 5}", "{}", "{3}", "{1, 2, 4, 5}"],
      correctAnswer: 2,
      explanation:
        "The intersection of sets A and B, denoted as A ∩ B, contains all elements that are in both A and B. So A ∩ B = {3}.",
    },
    {
      id: 3,
      text: "If U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} is the universal set and A = {2, 4, 6, 8, 10}, what is the complement of A?",
      options: ["{1, 3, 5, 7, 9}", "{2, 4, 6, 8, 10}", "{}", "{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"],
      correctAnswer: 0,
      explanation:
        "The complement of set A, denoted as A', contains all elements in the universal set U that are not in A. So A' = {1, 3, 5, 7, 9}.",
    },
  ],
  Matrices: [
    {
      id: 1,
      text: "What is the order of the matrix [[1, 2, 3], [4, 5, 6]]?",
      options: ["2 × 3", "3 × 2", "2 × 2", "3 × 3"],
      correctAnswer: 0,
      explanation:
        "The order of a matrix is given as (number of rows) × (number of columns). This matrix has 2 rows and 3 columns, so its order is 2 × 3.",
    },
    {
      id: 2,
      text: "If A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]], what is A + B?",
      options: [
        "[[6, 8], [10, 12]]",
        "[[5, 12], [21, 32]]",
        "[[1, 2, 5, 6], [3, 4, 7, 8]]",
        "[[1, 5], [2, 6], [3, 7], [4, 8]]",
      ],
      correctAnswer: 0,
      explanation:
        "Matrix addition is performed element by element. A + B = [[1+5, 2+6], [3+7, 4+8]] = [[6, 8], [10, 12]].",
    },
    {
      id: 3,
      text: "What is the determinant of the matrix [[4, 2], [3, 1]]?",
      options: ["2", "-2", "5", "10"],
      correctAnswer: 1,
      explanation:
        "For a 2×2 matrix [[a, b], [c, d]], the determinant is ad - bc. So for [[4, 2], [3, 1]], the determinant is 4×1 - 2×3 = 4 - 6 = -2.",
    },
  ],
}

// Add more topics as needed
const allTopics = [
  // Physics
  "Newton's First Law of Motion",
  "Newton's Second Law of Motion",
  "Newton's Third Law of Motion",
  "Thermodynamics",
  "Electromagnetism",
  "Optics",
  "Quantum Mechanics",

  // Chemistry
  "Nature of Matter",
  "Periodic Table",
  "Chemical Bonding",
  "Acids and Bases",
  "Organic Chemistry",

  // Math
  "Sets",
  "Relations & Functions",
  "Trigonometric Functions",
  "Matrices",
  "Calculus",
  "Probability",
]

// Function to get similar topics if exact match not found
const getSimilarTopics = (topic: string): string[] => {
  return allTopics.filter(
    (t) => t.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(t.toLowerCase()),
  )
}

export default function TopicSpecificQuiz({ subject, topic, onClose }: TopicSpecificQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

  // Find the appropriate quiz questions for the topic
  useEffect(() => {
    // Try to find an exact match first
    if (quizData[topic]) {
      setQuizQuestions(quizData[topic])
    } else {
      // If no exact match, try to find similar topics
      const similarTopics = getSimilarTopics(topic)
      if (similarTopics.length > 0) {
        // Use the first similar topic that has quiz data
        for (const similarTopic of similarTopics) {
          if (quizData[similarTopic]) {
            setQuizQuestions(quizData[similarTopic])
            break
          }
        }
      }

      // If still no match, use default questions based on subject
      if (quizQuestions.length === 0) {
        // Default questions for each subject
        if (subject === "physics") {
          setQuizQuestions(quizData["Thermodynamics"])
        } else if (subject === "chemistry") {
          setQuizQuestions(quizData["Periodic Table"])
        } else {
          setQuizQuestions(quizData["Sets"])
        }
      }
    }

    // Initialize selected answers
    setSelectedAnswers(Array(quizQuestions.length || 3).fill(-1))
  }, [topic, subject, quizQuestions.length])

  // Handle selecting an answer
  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[questionIndex] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  // Handle navigating to the next question
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  // Handle navigating to the previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  // Calculate the score
  const calculateScore = () => {
    let score = 0
    for (let i = 0; i < quizQuestions.length; i++) {
      if (selectedAnswers[i] === quizQuestions[i].correctAnswer) {
        score++
      }
    }
    return score
  }

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(Array(quizQuestions.length).fill(-1))
    setShowResults(false)
    setShowExplanation(false)
  }

  // Get the appropriate styling based on subject
  const getSubjectStyles = () => {
    switch (subject) {
      case "physics":
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-300",
          buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
          buttonOutline:
            "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30",
          selectedBg: "bg-blue-100 dark:bg-blue-800/50 border-blue-500 dark:border-blue-400",
        }
      case "chemistry":
        return {
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
          borderColor: "border-purple-200 dark:border-purple-800",
          textColor: "text-purple-800 dark:text-purple-300",
          buttonBg: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600",
          buttonOutline:
            "border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30",
          selectedBg: "bg-purple-100 dark:bg-purple-800/50 border-purple-500 dark:border-purple-400",
        }
      case "math":
        return {
          bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
          borderColor: "border-indigo-200 dark:border-indigo-800",
          textColor: "text-indigo-800 dark:text-indigo-300",
          buttonBg: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600",
          buttonOutline:
            "border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
          selectedBg: "bg-indigo-100 dark:bg-indigo-800/50 border-indigo-500 dark:border-indigo-400",
        }
      default:
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-300",
          buttonBg: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
          buttonOutline:
            "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30",
          selectedBg: "bg-blue-100 dark:bg-blue-800/50 border-blue-500 dark:border-blue-400",
        }
    }
  }

  const styles = getSubjectStyles()

  if (quizQuestions.length === 0) {
    return (
      <Card className={`bg-white dark:bg-gray-800 ${styles.borderColor}`}>
        <CardHeader className={styles.bgColor}>
          <CardTitle className={styles.textColor}>Quiz for {topic}</CardTitle>
          <CardDescription>Loading quiz questions...</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Preparing your quiz...</p>
        </CardContent>
        <CardFooter>
          <Button onClick={onClose} className={styles.buttonOutline}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className={`bg-white dark:bg-gray-800 ${styles.borderColor}`}>
      {!showResults ? (
        <>
          <CardHeader className={styles.bgColor}>
            <CardTitle className={styles.textColor}>
              {topic} - Question {currentQuestion + 1} of {quizQuestions.length}
            </CardTitle>
            <CardDescription>Test your knowledge on this topic</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <p className="text-lg font-medium">{quizQuestions[currentQuestion]?.text}</p>
              <div className="grid grid-cols-1 gap-3">
                {quizQuestions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-3 rounded-lg text-left transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? `${styles.selectedBg} border-2`
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent"
                    }`}
                    onClick={() => selectAnswer(currentQuestion, index)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && quizQuestions[currentQuestion]?.explanation && (
                <div className={`${styles.bgColor} p-4 rounded-lg mt-4`}>
                  <h4 className={`font-medium ${styles.textColor} mb-2`}>Explanation:</h4>
                  <p className="text-gray-700 dark:text-gray-300">{quizQuestions[currentQuestion]?.explanation}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={styles.buttonOutline}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowExplanation(!showExplanation)}
                className={styles.buttonOutline}
                disabled={!quizQuestions[currentQuestion]?.explanation}
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </Button>
            </div>
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === -1}
              className={styles.buttonBg}
            >
              {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              {currentQuestion === quizQuestions.length - 1 ? null : <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader className={styles.bgColor}>
            <CardTitle className={styles.textColor}>Quiz Results</CardTitle>
            <CardDescription>
              You scored {calculateScore()} out of {quizQuestions.length} on {topic}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {quizQuestions.map((question, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    selectedAnswers[index] === question.correctAnswer
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium mb-2">{question.text}</p>
                      <div className="grid grid-cols-1 gap-2 mb-3">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`px-3 py-2 rounded-md text-sm ${
                              optIndex === question.correctAnswer
                                ? "bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 font-medium"
                                : selectedAnswers[index] === optIndex
                                  ? "bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-300"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className={`text-sm ${styles.bgColor} p-3 rounded-md ${styles.textColor}`}>
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <Button variant="outline" onClick={resetQuiz} className={styles.buttonOutline}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={onClose} className={styles.buttonBg}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topic
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
