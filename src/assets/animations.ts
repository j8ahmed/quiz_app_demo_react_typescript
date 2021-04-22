import gsap from 'gsap'

const animations = {
    app_load_anim: (tl = gsap.timeline({autoAlpha:0})) => {
        tl
        .fromTo(".app", {opacity: 0}, {opacity: 1})
        .to(".app", {visibility: "visible"}, "<")
        return tl
    },
    question_load_anim: (tl = gsap.timeline({autoAlpha:0})) => {
        tl
        .fromTo(".question-set", {opacity: 0}, {opacity: 1})
        .to(".question-set", {visibility: "visible"}, "<")
    
        return tl
    },
    question_remove_anim: (tl = gsap.timeline({autoAlpha:0})) => {
        tl
        .to(".question-set", {opacity: 0, duration: 0.1})
    
        return tl
    }
}
export const {
    app_load_anim,
    question_load_anim,
    question_remove_anim,
} = animations
export default animations