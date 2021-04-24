import React from 'react'
import { QuizStatus } from './QuestionCard'
import { question_load_anim } from '../assets/animations'

type Question = {
    id: number,
    question: string,
    options: string[],
    correctAnswer: string
}

type Props = Question & {
    status: QuizStatus
    questionState: boolean,
    selectAnswer: (ans: string) => void
}

const QuestionSet = ({id, question, options, correctAnswer, status, questionState, selectAnswer}: Props, context?: object) => {
    const [userAnswer, setUserAnswer] = React.useState<string>()
    
    React.useEffect(()=> {
        question_load_anim()
    }, [id])

    return (
        <div className="question-set">
            <h2 id="question-number">Question {id+1}</h2>
            <h3 className="question" dangerouslySetInnerHTML={{__html: question}}></h3>
            <ol type="A" className="options">
                {options.map((option, i) => {
                    const correct = option === correctAnswer && QuizStatus.QUESTION_ANSWERED === status
                    const wrong = option === userAnswer && QuizStatus.QUESTION_ANSWERED === status
                    return(
                        <li key={i}>
                            <button 
                             className={`${correct ? "correct": ""} ${wrong ? "wrong" : ""}`}
                             disabled={questionState}
                             dangerouslySetInnerHTML={{__html: option}}
                             onClick={() => {setUserAnswer(option); selectAnswer(option)}} 
                             ></button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default QuestionSet