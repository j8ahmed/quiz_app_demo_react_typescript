import React from 'react'
import { QuizStatus } from './QuestionCard'
// enum QuizState { LOADING, COMPLETE, NOT_STARTED, QUESTION_ANSWERED }
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
        console.log(userAnswer)
    })
    return (
        <div>
            <h2>Question {id+1}</h2>
            <h3 dangerouslySetInnerHTML={{__html: question}}></h3>
            <ul>
                {options.map((option, i) => {
                    const correct = option === correctAnswer && QuizStatus.QUESTION_ANSWERED === status
                    const wrong = option === userAnswer && QuizStatus.QUESTION_ANSWERED === status
                    return(
                        <li key={i} className={`${correct && "correct"} ${wrong && "wrong"}`}>
                            <button 
                             disabled={questionState}
                             dangerouslySetInnerHTML={{__html: option}}
                             onClick={() => ( setUserAnswer(option), selectAnswer(option) )} 
                             ></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default QuestionSet
