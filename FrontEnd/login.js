import { fetchLogin } from './api.js'

// Écoute l'envoi du formulaire de connexion
function listenSubmit() {

    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault()

        handleLogin()
    })
}

function getInputValues() {

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    return { email, password }
}

function saveToken(token) {

    sessionStorage.setItem("token", token)
}

function redirectUser() {

    window.location.href = "./index.html"
}

// Affiche un message d'erreur si la connexion échoue
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

// Authentifie l'utilisateur puis le redirige
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