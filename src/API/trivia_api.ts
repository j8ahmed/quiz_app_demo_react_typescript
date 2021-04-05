
const URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"

export const fetchQuiz = async () => {
    return await (await fetch(URL)).json()
}