import React from 'react'
import gsap from 'gsap'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { convertTypeAcquisitionFromJson, isJSDocAugmentsTag } from 'typescript'

import App from '../App'
import QuestionCard from '../components/QuestionCard'
import Animations from '../assets/animations'

jest.mock('../assets/animations')

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

test('Test that the App has the title Quiz App', ()=> {
    
    act(()=>{
        render(<App/>, container)
    })
    expect(container?.querySelector('h1')?.textContent).toBe('Quiz App')
})


test('Quiz Button fetches the Quiz data', async ()=>{
    const fakeQuestions = [
        {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'What is your name?', type: 'MC',},
        {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'What is your number?', type: 'MC',},
        {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'Where are you from?', type: 'MC',},
        {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'How old are you?', type: 'MC',},
        {category: 'random', correct_answer: 'C', difficulty: 'normal', incorrect_answers: ['A', 'B', 'D'], question: 'What do you study?', type: 'MC',},
    ]
    // mock the global fetch function to return fake data
    jest.spyOn(global, 'fetch').mockImplementation( () => {
        return Promise.resolve({
            json: () => Promise.resolve(fakeQuestions)
        }) as Promise<Response>
    })

    jest.spyOn(Animations, 'app_load_anim')

    // mock the animation functions to remove GSAP errors
    // jest.spyOn(Animations, 'app_load_anim').mockImplementation( (tl = gsap.timeline()) => {
    //     // tl.to("*", {visibility: "visible"})
    //     return tl
    // })

    // const Animations = jest.createMockFromModule('../assets/animations')
    // Animations.app_load_anim.mockImplementation(()=> "hello")

    act(()=>{
        // jest.mock('../assets/animations')
        render(<QuestionCard/>, container)
    })
    const test = jest.fn()
    test("Hello")
    test.mockImplementationOnce((x, y) => x + y)
    test.mockImplementationOnce((x, y) => console.log(x+y))
    test(10, 15)
    test(20, 33)
    const newMock = new test((x:number) => x + 100)
    // newMock.mockImplementationOnce((x:number, y:number) => console.log(x+y))
    // console.log(newMock)
    console.log(test.mock)
    // expect(Animations.app_load_anim).toHaveBeenCalled()
    expect(container?.querySelector('.start-btn')?.textContent).toBe('Start Quiz')
})



/**
 * Console.log(test.mock)
 * {
      calls: [ [ 'Hello' ] ],
      instances: [ undefined ],
      invocationCallOrder: [ 2 ],
      results: [ { type: 'return', value: undefined } ]
    }

    calls = An array of arrays which hold all the arguments 
            passed in as parameters for each call of the mock function.

    instances = An array of all the objects instances that have been 
                instantiated from this mock function using 'new'. When 
                a mock function is called (i.e. mockFn()), the corresponding 
                'instances' value in the array will be undefined since 
                it was not a new instance of the mock function being built?

    invocationCallOrder = An array of integers indicating in what order was 
                          this particular mock function was called relative to 
                          all the other mock functions that may exist in the 
                          test sutie (test file). This replaced the previous 
                          'mock timestamps' because multiple mock functions 
                          could potentially share the same timestamp which 
                          presented a problem when trying to test any
                          callorders between mocked functions.

    results = An array containing the results of all calls that have been made 
              to this mock function. Each entry is an object with 2 properties. 
              Ex: {type: 'return', value: 25}
              
            type = 
                'return' - call completed by returning normally.
                'throw' - call completed by throwing a value as an Error.
                'incomplete' - call has not yet completed. 
                    This occurs if you test the result from within the 
                    mock function itself, or from within a function that was
                    called by the mock.
              
            value = The value that was thrown or returned. 
                    value is undefined when type === 'incomplete'.
 */