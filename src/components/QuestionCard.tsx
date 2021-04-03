import React, { useEffect } from 'react'
import Controls from './Controls'
import QuestionSet from './QuestionSet'

const URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"

enum QuizState { LOADING, COMPLETE, NOT_STARTED, QUESTION_ANSWERED }
type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

const QuestionCard = () => {
    const [quizState, setQuizState] = React.useState({
        status: QuizState.NOT_STARTED
    })
    const [questionDeck, setQuestionDeck] = React.useState([] as Question[]) 
    const [question, setQuestion] = React.useState({
        id: 0,
        question: "",
        options: [""],
        correctAnswer: "",
    })

    const getQuiz = async () => {
        setQuizState( {status: QuizState.LOADING} )
        // Initialize Quiz with data from API.
        try{
            const data = await (await fetch(URL)).json()
            console.log(data)
            setQuestionDeck(data.results)

            const Q1: Question = data.results[0]
            setQuestion({
                id: 0,
                question: Q1.question,
                options: [...Q1.incorrect_answers, Q1.correct_answer],
                correctAnswer: Q1.correct_answer
            })
        }
        catch(e){
            console.log(e)
            throw e 
        }
    }

    useEffect(() => {
        getQuiz()
    }, [])

    const selectAnswer = (ans: string): void => {
        setQuizState({status: QuizState.QUESTION_ANSWERED})
    }

    const nextQuestion = () => {
        //reset the quizState
        setQuizState({status: QuizState.LOADING})
        setQuestion( q => {
            const id = q.id + 1
            const data = questionDeck[id]
            return {
                id: id,
                question: data.question,
                options: [...data.incorrect_answers, data.correct_answer],
                correctAnswer: data.correct_answer,
            }
        })
    }

    return (
        <div className="question-card">
            <QuestionSet 
                questionState={quizState.status === QuizState.QUESTION_ANSWERED} 
                selectAnswer={selectAnswer}
                {...question}/>
            <Controls 
                isAnswered={quizState.status === QuizState.QUESTION_ANSWERED} 
                nextExists={question.id + 2 <= questionDeck.length} 
                next={nextQuestion}/>
        </div>
    )
}

export default QuestionCard