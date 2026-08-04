import { fetchLogin } from './api.js'

function listenSubmit() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        try {

            const values = getInputValues()
            const userData = await fetchLogin(values)
            console.log("reponse api", userData)
            sessionStorage.setItem("token", userData.token)
            window.location.href = "./index.html"
        } catch (error) {
            console.error(error)
            
            let errorLogin = document.querySelector(".error-login")
            if (!errorLogin) {
                errorLogin = document.createElement("p")
                errorLogin.classList.add("error-login")
                const section = document.querySelector("#contact")
                section.appendChild(errorLogin)
            } 
                errorLogin.textContent = "Veuillez corriger vos identifiants de connexion"
            
        }
    })
}
listenSubmit()

function getInputValues() {

    const inputEmail = document.querySelector("input[type='email']").value
    const inputPassword = document.querySelector("input[type='password']").value

    return { inputEmail, inputPassword }
}