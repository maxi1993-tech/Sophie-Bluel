import { fetchLogin } from './api.js'

function listenSubmit() {

    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault()
    })
}