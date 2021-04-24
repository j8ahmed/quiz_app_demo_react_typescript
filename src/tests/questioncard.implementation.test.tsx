import React from 'react'
import gsap from 'gsap'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import App from '../App'
import QuestionCard from '../components/QuestionCard'
import Animations from '../assets/animations'

jest.mock('../assets/animations')
const mockedAnimations = Animations as jest.Mocked<typeof Animations>
const mock_app_load_anim = Animations.app_load_anim as jest.MockedFunction<typeof Animations.app_load_anim>

let container: HTMLElement | null


beforeEach(()=>{
    // setup a DOM element as a render target
    container = document.createElement('div') as HTMLElement
    document.body.appendChild(container)
})

afterEach(()=>{
    // cleanup on exiting of each test
    unmountComponentAtNode(container as HTMLElement)
    container?.remove()
    container = null
})

describe('Testing our mocked module', ()=>{

    test('method of mocked module has been called', ()=>{

        mock_app_load_anim.mockImplementationOnce( () => {
            //Ensures all elements are visible and accessible for other tests
            return gsap.timeline().to("*", {visibility: 'visible'})
        })
        Animations.app_load_anim()
        expect(mock_app_load_anim).toHaveBeenCalled()
    })
})

test('Test that the App has the title Quiz App', ()=> {
    act(()=>{
        render(<App/>, container)
    })
    expect(container?.querySelector('h1')?.textContent).toBe('Quiz App')
})


test('Quiz Button fetches the Quiz data', async ()=>{
    const fakeQuestions = {
        results: [
            {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'What is your name?', type: 'MC',},
            {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'What is your number?', type: 'MC',},
            {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'Where are you from?', type: 'MC',},
            {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'How old are you?', type: 'MC',},
            {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'What do you study?', type: 'MC',},
        ]
    }
    

    //render the component to the DOM
    act(()=>{
        render(<QuestionCard/>, container)
    })
    
    expect(container?.querySelector('.start-btn')?.textContent).toBe('Start Quiz')

    // mock the global fetch function to return fake data
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve(fakeQuestions)
        }) as Promise<Response>
    })

    
    await act( async ()=>{
        const btn = container?.querySelector('.start-btn')
        btn?.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    // const question = container?.querySelector('#question-number')
    // console.log(question?.textContent)
    expect(fetch).toHaveBeenCalled()
})


