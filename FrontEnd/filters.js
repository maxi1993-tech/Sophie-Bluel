/**
 * Construit les boutons de filtres par catégorie
 * 
 * @function createButtons
 * @param {object[]} categoriesList - La liste des catégories de filtre
 * @param {number} categoriesList[].id - Identifiant de la catégorie.
 * @param {string} categoriesList[].name - Nom de la catégorie affiché sur le bouton.
 * @returns {void}
 */
export function createButtons(categoriesList) {

    const filters = document.querySelector(".filters")

    filters.replaceChildren()

    const buttonTemplate = document.getElementById("button-template")

    const virtualBox = document.createDocumentFragment()

    const allCategories = [{ id: 0, name: "Tous" }, ...categoriesList]

    allCategories.forEach(categorie => {

        const buttonClone = buttonTemplate.content.cloneNode(true)

        const button = buttonClone.querySelector("button")

        button.textContent = categorie.name
        button.dataset.categoryId = categorie.id

        if (categorie.id === 0) {
            button.classList.add("filter-button-selected")
        }

        virtualBox.appendChild(buttonClone)
    })

    filters.appendChild(virtualBox)
}

/**
 * Écoute l'événement "click" sur chaque bouton
 * 
 * @function listenButtons
 * @param {object[]} works - La liste des travaux
 * @param {number} works[].categoryId - Identifiant de la catégorie du travail.
 * @param {function} displayGallery - La fonction displayGallery transmise à filterWorks
 * @returns {void}
 */
export function listenButtons(works, displayGallery) {

    const buttons = document.querySelectorAll(".filter-button")

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            setActiveButton(button)
            filterWorks(button, works, displayGallery)
        })
    })
}

/**
 * Retire la classe du bouton précédemment sélectionné et l'ajoute au bouton cliqué.
 * 
 * @function setActiveButton
 * @param {HTMLElement} button - Bouton de filtre qui vient d'être cliqué.
 * @returns {void}
 */
function setActiveButton(button) {

    const buttonSelected = document.querySelector(".filter-button-selected")

    if (buttonSelected) {

        buttonSelected.classList.remove("filter-button-selected")
    }

    button.classList.add("filter-button-selected")

}

/**
 * Filtre les travaux par rapport à la catégorie cliquée et les transmet à la
 * fonction d'affichage de la galerie.
 * 
 * @function filterWorks
 * @param {HTMLElement} button - Bouton de filtre.
 * @param {object[]} works - Liste complète des travaux.
 * @param {number} works[].categoryId - Identifiant de la catégorie du travail.
 * @param {function} displayGallery - Fonction permettant d'afficher les travaux filtrés.
 * @returns {void}
 */
function filterWorks(button, works, displayGallery) {

    const buttonId = Number(button.dataset.categoryId)

    if (buttonId === 0) {

        displayGallery(works)
    } else {
        const filteredWorks = works.filter((work) => work.categoryId === buttonId)
        displayGallery(filteredWorks)
    }
}



