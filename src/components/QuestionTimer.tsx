import React, { useEffect, useState, useMemo } from 'react'


type Props = {
    id: number,
    unanswered: boolean,
    selectAnswer: (ans:string) => void,
}

const QuestionTimer = ({id, unanswered, selectAnswer}:Props) => {
    const initialTime = useMemo(()=> 10, [])
    const [count, setCount] = useState(initialTime)

    useEffect(()=>{
        const timeout_id = setTimeout(()=>{
            if(count > 0) setCount(count => count - 1)
            else selectAnswer('no answer')
        }, 1000)

        return ()=> clearTimeout(timeout_id)
    }, [id, count, selectAnswer])

    const radius = useMemo(()=> 40, [])
    const circum = useMemo(()=> Math.PI * 2 * radius, [radius])
    const percent_countDown = (1 - (count / initialTime)) * circum

    if(unanswered) return (
        <>
            <svg id="svg" width="200" height="200" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/   svg">
                <circle r={radius} cx="50" cy="50" 
                    // fill="black" 
                    fill="transparent" 
                    // strokeDasharray={circum} 
                    // strokeDashoffset={percent_countDown}
                />

                <text x="50" y="50" fill="white" textAnchor='middle' alignmentBaseline="middle">{count}</text>
                <circle id='bar' r={radius} cx="50" cy="50" 
                    // fill="black" 
                    fill="transparent" 
                    strokeDasharray={circum} 
                    strokeDashoffset={percent_countDown}
                />
            </svg>
        </>
    )
    else return <div></div>
}

export default QuestionTimer