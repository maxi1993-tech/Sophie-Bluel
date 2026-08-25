import { fetchLogin } from './api.js'

/**
 * Écoute l'envoi du formulaire de connexion.
 *
 * @function listenSubmit
 * @returns {void}
 */
function listenSubmit() {

    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault()

        handleLogin()
    })
}

/**
 * Récupère les valeurs saisies dans le formulaire de connexion.
 *
 * @function getInputValues
 * @returns {{email: string, password: string}} Objet contenant l'adresse e-mail et le mot de passe.
 */
function getInputValues() {

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    return { email, password }
}

/**
 * Enregistre le token d'authentification dans le stockage de session.
 *
 * @function saveToken
 * @param {string} token - Token d'authentification à enregistrer.
 * @returns {void}
 */
function saveToken(token) {

    sessionStorage.setItem("token", token)
}

/**
 * Redirige l'utilisateur vers la page d'accueil.
 *
 * @function redirectUser
 * @returns {void}
 */
function redirectUser() {

    window.location.href = "./index.html"
}

/**
 * Affiche un message d'erreur lorsque la connexion échoue.
 *
 * @function handleError
 * @returns {void}
 */
function handleError() {

    let errorLogin = document.querySelector(".error-login")

    if (!errorLogin) {

        errorLogin = document.createElement("p")
        errorLogin.classList.add("error-login")
        errorLogin.setAttribute("aria-live", "polite")

        const loginButton = document.querySelector(".login-button")

        loginButton.before(errorLogin)

    }
    errorLogin.textContent = "Veuillez corriger vos identifiants de connexion"
}

/**
 * Authentifie l'utilisateur, enregistre son token puis le redirige.
 *
 * @async
 * @function handleLogin
 * @returns {Promise<void>}
 */
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

/**
 * Initialise le formulaire de connexion.
 *
 * @function startLogin
 * @returns {void}
 */
function startLogin() {

    listenSubmit()
}

startLogin()