import gsap from 'gsap'


export const app_load_anim = (tl = gsap.timeline({autoAlpha:0})) => {
    tl
    .fromTo(".app", {opacity: 0}, {opacity: 1})
    .to(".app", {visibility: "visible"}, "<")
    

    return tl
}

export const question_load_anim = (tl = gsap.timeline({autoAlpha:0})) => {
    tl
    .fromTo(".question-set", {opacity: 0}, {opacity: 1})
    .to(".question-set", {visibility: "visible"}, "<")

    return tl
}


export const question_remove_anim = (tl = gsap.timeline({autoAlpha:0})) => {
    tl
    .to(".question-set", {opacity: 0, duration: 0.1})

    return tl
}