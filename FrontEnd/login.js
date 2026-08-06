import { fetchLogin } from './api.js'

function listenSubmit() {

    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault()
    })
}

function getInputValues() {

    const email = document.querySelector("input[type='email']").value
    const password = document.querySelector("input[type='password']").value

    return { email, password }
}

function saveToken(token) {

    sessionStorage.setItem("token", token)
}