import {render, unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'
import QuestionTimer from '../components/QuestionTimer'

jest.useFakeTimers()

let container: HTMLElement | null
beforeEach(()=>{
    container = document.createElement('div')
    document.body.appendChild(container)
})
afterAll(()=>{
    unmountComponentAtNode(container as HTMLElement)
    container?.remove()
    container = null
})

test('QuestionTimer calls setTimeout when rendered', ()=>{
    const mock_selectAnswer = jest.fn()
    act(()=>{
        render(
            <QuestionTimer id={1} unanswered={true} selectAnswer={mock_selectAnswer} />, 
            container
        )
    })

    expect(setTimeout).toHaveBeenCalled()
})