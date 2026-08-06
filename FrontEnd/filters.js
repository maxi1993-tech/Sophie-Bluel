//###############################################################################################
//###############################################################################################
//###############################################################################################

export function createButtons(categoriesList) {
    console.log("### createButtons ###")
    // récupère conteneur filters
    const filters = document.querySelector(".filters")

    // vide conteneur filters
    filters.replaceChildren()

    // récupère le template HTML
    const buttonTemplate = document.getElementById("button-template")

    // crée un conteneur temporaire en mémoire
    const virtualBox = document.createDocumentFragment()

    // crée nouvelle id et copie du nouveau tableau
    const allCategories = [{ id: 0, name: "Tous" }, ...categoriesList]

    // parcours toutes les categories
    allCategories.forEach(categorie => {

        // duplique le template
        const buttonClone = buttonTemplate.content.cloneNode(true)

        // récupère les éléments du clone
        const button = buttonClone.querySelector("button")

        // remplit le clone
        button.textContent = categorie.name
        button.dataset.categoryId = categorie.id

        // ajout de la class selected
        if (categorie.id === 0) {
            button.classList.add("filter-button-selected")
        }

        // ajoute le clone au conteneur
        virtualBox.appendChild(buttonClone)
    })
    // ajoute le conteneur virtuel dans le conteneur filter
    filters.appendChild(virtualBox)
}

export function listenButtons(works, displayGallery) {
    console.log("### listenButtons ###")

    // Récupère les boutons
    const buttons = document.querySelectorAll(".filter-button")

    // Parcours chaque boutons
    buttons.forEach(button => {

        // écoute les boutons
        button.addEventListener("click", () => {
            console.log("### bouton cliqué ###", button.textContent)

            setActiveButton(button)

            filterWorks(button, works, displayGallery)
        })
    })
}

function setActiveButton(button) {
    console.log("### setActiveButton ###")
    // récupère le bouton sélectionner
    const buttonSelected = document.querySelector(".filter-button-selected")

    if (buttonSelected) {
        // retire le bouton sélectionner
        buttonSelected.classList.remove("filter-button-selected")

    }
    // ajoute le bouton sélectionner au bouton click
    button.classList.add("filter-button-selected")

}

function filterWorks(button, works, displayGallery) {


    if (Number(button.dataset.categoryId) === 0) {

        displayGallery(works)
    } else {
        const filteredWorks = works.filter((work) => work.categoryId === Number(button.dataset.categoryId))
        displayGallery(filteredWorks)
    }

}

//###############################################################################################
//###############################################################################################
//###############################################################################################
