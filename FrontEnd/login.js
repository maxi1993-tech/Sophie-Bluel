import { fetchLogin } from './api.js'

function listenSubmit() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        
        const values = getInputValues()
        const userData = await fetchLogin(values)
        console.log("reponse api", userData)
    })
}
listenSubmit()

function getInputValues() {

const inputEmail = document.querySelector("input[type='email']").value
const inputPassword = document.querySelector("input[type='password']").value
    
    return {inputEmail, inputPassword}
}