function listenSubmit() {

    const form = document.querySelector("form")

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        
        const values = getInputValues()
        console.log(values)
    })
}
listenSubmit()

function getInputValues() {

const inputEmail = document.querySelector("input[type='email']").value
const inputPassword = document.querySelector("input[type='password']").value
    
    return {inputEmail, inputPassword}
}