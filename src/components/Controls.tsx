import React from 'react'

type Props = {
    isAnswered: boolean,
    nextExists: boolean,
    next: () => void,
    end: () => void,
}

const Controls = ({ isAnswered, nextExists, next, end }:Props) => {
    return (
        <>
            {isAnswered && nextExists && <button className="next-btn" onClick={next}>Next Question</button>}
            {isAnswered && !nextExists && <button className="next-btn" onClick={end}>End Quiz</button>}
        </>
    )
}

export default Controls
