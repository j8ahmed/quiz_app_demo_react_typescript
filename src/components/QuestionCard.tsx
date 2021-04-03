import React, { useEffect, useState } from 'react'
import Controls from './Controls'
import QuestionSet from './QuestionSet'
import "../index.css"
import { randomize } from '../assets/utilities'
const {log} = console
const URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"

export enum QuizStatus { LOADING, LOADED, COMPLETE, NOT_STARTED, QUESTION_ANSWERED }
type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

const QuestionCard = () => {
    const [score, setScore] = useState(0)
    const [status, setStatus] = useState<QuizStatus>(QuizStatus.NOT_STARTED)
    const [questionDeck, setQuestionDeck] = useState<Question[]>([]) 
    const [question, setQuestion] = useState({
        id: 0,
        question: "",
        options: [""],
        correctAnswer: "",
    })

    const getQuiz = async () => {
        // Initialize Quiz with data from API.
        try{
            const data = await (await fetch(URL)).json()
            setQuestionDeck(data.results)

            const Q1: Question = data.results[0]
            setQuestion({
                id: 0,
                question: Q1.question,
                options: [...Q1.incorrect_answers, Q1.correct_answer],
                correctAnswer: Q1.correct_answer
            })

            setStatus( QuizStatus.LOADED )
        }
        catch(e){
            console.log("Error in fetch API for Quiz data")
            throw e 
        }
    }

    const startQuiz = () => {
        setStatus( QuizStatus.LOADING )
        getQuiz()
    }

    const restartQuiz = () => {
        setScore(0)
        getQuiz()
    }

    const selectAnswer = (ans: string): void => {
        const correct = ans === question.correctAnswer
        setScore(curr => correct ? curr + 1 : curr)
        setStatus(QuizStatus.QUESTION_ANSWERED)
    }

    const nextQuestion = () => {
        //reset the quizStatus
        setStatus(QuizStatus.LOADING)
        setQuestion( q => {
            const id = q.id + 1
            const data = questionDeck[id]
            return {
                id: id,
                question: data.question,
                options: randomize([...data.incorrect_answers, data.correct_answer]),
                correctAnswer: data.correct_answer,
            }
        })
        setStatus(QuizStatus.LOADED)
    }

    useEffect(()=>{
        log("Rerendered")
    })

    if(status === QuizStatus.NOT_STARTED){
        return <button onClick={startQuiz} >Start Quiz</button>
    }

    if(status === QuizStatus.LOADING){
        return <h3>Loading...</h3>
    }
    
    if(status === QuizStatus.QUESTION_ANSWERED && question.id === questionDeck.length - 1){
        return (
            <div>
                <h2>End of Quiz</h2>
                <h3>{`Score: ${score} / ${questionDeck.length}`}</h3>
                <button onClick={restartQuiz}>Start Another</button>
            </div>
        )
    }

    return (
        <div className="question-card">
            <h3>{`Score: ${score} / ${questionDeck.length}`}</h3>
            <QuestionSet 
                status={status}
                questionState={status === QuizStatus.QUESTION_ANSWERED} 
                selectAnswer={selectAnswer}
                {...question}/>
            <Controls 
                isAnswered={status === QuizStatus.QUESTION_ANSWERED} 
                nextExists={question.id + 2 <= questionDeck.length} 
                next={nextQuestion}/>
        </div>
    )
}

export default QuestionCard