import React from 'react'
import { question_remove_anim } from '../assets/animations'


type Props = {
    isAnswered: boolean,
    nextExists: boolean,
    next: () => void,
    end: () => void,
}

const Controls = ({ isAnswered, nextExists, next, end }:Props) => {
    const text = isAnswered && nextExists ? "Next Question" : "End Quiz" 
    const change = () => {
        const tl = question_remove_anim()
        tl.add(() => {
            if(isAnswered && nextExists) next()
            else end()
        }, ">")
    }

    return (
        <>
            <button 
            className="next-btn" 
            onClick={change}
            style={{visibility: isAnswered ? "visible" : "hidden"}}>{text}</button>
        </>
    )
}

export default Controls
