import "../index.css"
import { useState } from 'react'
import { randomize } from '../assets/utilities'
import { fetchQuiz } from '../API/trivia_api'
import Controls from './Controls'
import QuestionSet from './QuestionSet'
import QuestionTimer from './QuestionTimer'


export enum QuizStatus { LOADING, LOADED, COMPLETE, NOT_STARTED, QUESTION_ANSWERED, END_QUIZ }
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
            const data = await fetchQuiz()
            setQuestionDeck(data.results)
            const i = 0
            const Q1: Question = data.results[i]
            setQuestion({
                id: i,
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
        setStatus( QuizStatus.LOADING )
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

    const endQuiz = () => setStatus( QuizStatus.END_QUIZ )

    switch(status){
        case QuizStatus.NOT_STARTED:
            return (
                <div className="question-card">
                    <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
                </div>
            )

        case QuizStatus.LOADING:
            return (
                <div className="question-card">
                    <h3>Loading...</h3>
                </div>
            )
            
        case QuizStatus.END_QUIZ:
            return (
                <div className="question-card">
                    <h2>End of Quiz</h2>
                    <h3>{`Score:   ${score} / ${questionDeck.length}`}</h3>
                    <button onClick={restartQuiz} className="start-btn">Start Another</button>
                </div>
            )

        default:
            return (
                <div className="question-card">
                    <div className='question-header'>
                        <h3 className="score">
                            Score:
                            <span id='score-value'>{score}</span>
                        </h3>
                        <QuestionTimer 
                            id={question.id} 
                            selectAnswer={selectAnswer}
                            unanswered={status === QuizStatus.LOADED}
                        />
                    </div>
                    <QuestionSet 
                        status={status}
                        questionState={status === QuizStatus.QUESTION_ANSWERED} 
                        selectAnswer={selectAnswer}
                        {...question}/>
                    <Controls 
                        isAnswered={status === QuizStatus.QUESTION_ANSWERED} 
                        nextExists={question.id + 2 <= questionDeck.length} 
                        next={nextQuestion}
                        end={endQuiz}/>
                </div>
            )
    }    
}

export default QuestionCard