import React from 'react'
import { question_remove_anim } from '../assets/animations'


type Props = {
    isAnswered: boolean,
    nextExists: boolean,
    next: () => void,
    end: () => void,
}

const Controls = ({ isAnswered, nextExists, next, end }:Props) => {

    const changeQuestion = () => {
        const tl = question_remove_anim()
        tl.add(() => {
            next()
        }, ">")
    }
    const endQuiz = () => {
        const tl = question_remove_anim()
        tl.add(() => {
            end()
        }, ">")
    }

    return (
        <>
            {isAnswered && nextExists && <button className="next-btn" onClick={changeQuestion}>Next Question</button>}
            {isAnswered && !nextExists && <button className="next-btn" onClick={endQuiz}>End Quiz</button>}
        </>
    )
}

export default Controls
