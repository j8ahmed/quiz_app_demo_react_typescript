import React from 'react'

type Props = {
    isAnswered: boolean,
    nextExists: boolean,
    next: () => void
}

const Controls = ({ isAnswered, nextExists, next }:Props) => {
    return (
        <div>
            {isAnswered && nextExists && <button onClick={next}>Next Question</button>}
        </div>
    )
}

export default Controls
