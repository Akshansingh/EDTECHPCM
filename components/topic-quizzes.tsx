import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { quizzes } from "@/types/quiz"
import { FileText } from "lucide-react"

interface TopicQuizzesProps {
  subject: "physics" | "chemistry" | "math"
  topic: string | null
  className?: string
}

export default function TopicQuizzes({ subject, topic, className = "" }: TopicQuizzesProps) {
  // Filter quizzes by subject and topic
  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.subject === subject &&
      (topic
        ? quiz.topic.toLowerCase().includes(topic.toLowerCase()) ||
          topic.toLowerCase().includes(quiz.topic.toLowerCase())
        : true),
  )

  // If no exact match, try to find quizzes with similar topics
  const relatedQuizzes =
    topic && filteredQuizzes.length === 0
      ? quizzes.filter(
          (quiz) =>
            quiz.subject === subject &&
            (quiz.topic.toLowerCase().includes(topic.toLowerCase().split(" ")[0]) ||
              topic
                .toLowerCase()
                .split(" ")
                .some((word) => word.length > 3 && quiz.topic.toLowerCase().includes(word))),
        )
      : []

  const quizzesToShow = filteredQuizzes.length > 0 ? filteredQuizzes : relatedQuizzes

  const subjectColors = {
    physics: {
      bg: "bg-blue-50 dark:bg-blue-950/50",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-300",
      badge: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
      hover: "hover:bg-blue-100/50 dark:hover:bg-blue-900/50",
    },
    chemistry: {
      bg: "bg-purple-50 dark:bg-purple-950/50",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-800 dark:text-purple-300",
      badge: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300",
      hover: "hover:bg-purple-100/50 dark:hover:bg-purple-900/50",
    },
    math: {
      bg: "bg-green-50 dark:bg-green-950/50",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-300",
      badge: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
      hover: "hover:bg-green-100/50 dark:hover:bg-green-900/50",
    },
  }

  const difficultyBadges = {
    beginner: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
    intermediate: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
    advanced: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
  }

  const style = subjectColors[subject]

  if (quizzesToShow.length === 0) {
    return (
      <div className={`rounded-lg p-6 ${style.bg} ${style.border} border ${className}`}>
        <div className="text-center">
          <FileText className={`h-12 w-12 mx-auto mb-4 ${style.text}`} />
          <h3 className={`text-lg font-medium mb-2 ${style.text}`}>No Quizzes Available</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We don't have quizzes for this topic yet. Please check back later or explore other topics.
          </p>
          <Link
            href="/quizzes"
            className={`inline-block px-4 py-2 rounded-md ${style.bg} ${style.border} border ${style.text} ${style.hover}`}
          >
            Browse All Quizzes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg p-6 ${style.bg} ${style.border} border ${className}`}>
      <h3 className={`text-xl font-bold mb-4 ${style.text}`}>
        {topic ? `Quizzes for ${topic}` : `${subject.charAt(0).toUpperCase() + subject.slice(1)} Quizzes`}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {quizzesToShow.map((quiz) => (
          <Link href={`/quizzes/${quiz.id}`} key={quiz.id}>
            <Card
              className={`transition-all duration-300 hover:shadow-md hover:scale-[1.01] ${style.bg} ${style.border} border`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className={`text-lg ${style.text}`}>{quiz.title}</CardTitle>
                  <Badge className={difficultyBadges[quiz.difficulty]}>{quiz.difficulty}</Badge>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2">
                  <Badge className={style.badge}>{quiz.topic}</Badge>
                  <Badge variant="outline">{quiz.chapter}</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.questions.length} questions</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
