import { fetchLogin } from './api.js'

function listenSubmit() {

    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault()

        handleLogin()
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

function redirectUser() {

    window.location.href = "./index.html"
}

function handleError() {

    let errorLogin = document.querySelector(".error-login")

    if (!errorLogin) {

        errorLogin = document.createElement("p")
        errorLogin.classList.add("error-login")

        const loginButton = document.querySelector(".login-button")

        loginButton.before(errorLogin)

    }
    errorLogin.textContent = "Veuillez corriger vos identifiants de connexion"
}

async function handleLogin() {

    try {

        const inputsValues = getInputValues()

        const userData = await fetchLogin(inputsValues)

        saveToken(userData.token)

        redirectUser()

    } catch (error) {

        console.error(error)
        handleError()
    }
}

function startLogin() {

    listenSubmit()
}

startLogin()