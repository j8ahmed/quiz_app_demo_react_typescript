import React from 'react'

// enum QuizState { LOADING, COMPLETE, NOT_STARTED, QUESTION_ANSWERED }
type Question = {
    id: number,
    question: string,
    options: string[],
    correctAnswer: string
}

type Props = Question & {
    questionState: boolean,
    selectAnswer: (ans: string) => void
}

const QuestionSet = ({id, question, options, questionState, selectAnswer}: Props, context?: object) => {
    return (
        <div>
            <h2>Question {id+1}</h2>
            <h3 dangerouslySetInnerHTML={{__html: question}}></h3>
            <ul>
                {options.map((option, i) => {
                    return(
                        <li key={i}>
                            <button 
                             disabled={questionState}
                             dangerouslySetInnerHTML={{__html: option}}
                             onClick={() => selectAnswer(option)}
                             ></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default QuestionSet
