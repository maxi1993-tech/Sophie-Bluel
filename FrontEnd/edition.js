/**
 * Récupère le token d'authentification depuis le stockage de session.
 *
 * @function getToken
 * @returns {string|null} Token d'authentification ou null si aucun token n'est présent.
 */
function getToken() {

    const token = sessionStorage.getItem("token")

    return token
}

/**
 * Affiche la bannière noire indiquant que le mode édition est actif.
 *
 * @function displayBlackBanner
 * @returns {void}
 */
function displayBlackBanner() {

    const body = document.querySelector("body")
    const editionTemplate = document.querySelector("#edition-template")

    const editionClone = editionTemplate.content.cloneNode(true)
    

    body.classList.add("edition-mode")

    body.prepend(editionClone)
}

/**
 * Masque les boutons de filtres en vidant leur conteneur.
 *
 * @function hideFilters
 * @returns {void}
 */
function hideFilters() {

    const filters = document.querySelector(".filters")

    filters.replaceChildren()
}

/**
 * Ajoute le bouton permettant de modifier le contenu du portfolio.
 *
 * @function editButton
 * @returns {void}
 */
function editButton() {

    const wrapperPortfolio = document.querySelector(".wrapper-portfolio")
    const editionButtonTemplate = document.querySelector("#edition-button-template")

    const editionButtonClone = editionButtonTemplate.content.cloneNode(true)

    wrapperPortfolio.appendChild(editionButtonClone)
}

/**
 * Ajoute un écouteur d'événement au lien de déconnexion.
 *
 * @function logoutUser
 * @returns {void}
 */
function logoutUser() {

    const logoutLink = document.querySelector(".logout")

    logoutLink.addEventListener("click", (event) => {
        event.preventDefault()

        sessionStorage.removeItem("token")
        window.location.href = "./index.html"
    })
}

/**
 * Initialise le mode édition si un token d'authentification est présent.
 *
 * @function setupEditionMode
 * @returns {void}
 */
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



