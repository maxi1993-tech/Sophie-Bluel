function verifyToken() {

    const token = sessionStorage.getItem("token")

    return token
}

function displayBlackBanner() {

    const body = document.querySelector("body")
    const editionTemplate = document.querySelector("#edition-template")

    const editionClone = editionTemplate.content.cloneNode(true)

    const editionContainer = editionClone.querySelector(".edition-container")

    body.prepend(editionContainer)
}

function hideFilters() {

    const filters = document.querySelector(".filters")

    filters.replaceChildren()
}


export function loginUser() {

    const token = verifyToken()

    if (token) {

        displayBlackBanner()
        hideFilters()
    }
}