function getToken() {

    const token = sessionStorage.getItem("token")

    return token
}

function displayBlackBanner() {

    const body = document.querySelector("body")
    const editionTemplate = document.querySelector("#edition-template")

    const editionClone = editionTemplate.content.cloneNode(true)
    

    body.classList.add("edition-mode")

    body.prepend(editionClone)
}

function hideFilters() {

    const filters = document.querySelector(".filters")

    filters.replaceChildren()
}

function editButton() {

    const wrapperPortfolio = document.querySelector(".wrapper-portfolio")
    const editionButtonTemplate = document.querySelector("#edition-button-template")

    const editionButtonClone = editionButtonTemplate.content.cloneNode(true)

    wrapperPortfolio.appendChild(editionButtonClone)
}

function logoutUser() {

    const logoutLink = document.querySelector(".logout")

    logoutLink.addEventListener("click", (event) => {
        event.preventDefault()

        sessionStorage.removeItem("token")
        window.location.href = "./index.html"
    })
}

export function setupEditionMode() {

    const token = getToken()

    const logoutLink = document.querySelector(".logout")

    if (token) {

        displayBlackBanner()
        hideFilters()
        editButton()
        logoutUser()

        logoutLink.textContent = "logout"
    }
}



