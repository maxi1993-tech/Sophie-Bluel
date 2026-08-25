import { fetchAdd, fetchDelete } from './api.js'

/**
 * Écoute les clics sur l'overlay de la modale pour permettre sa fermeture.
 *
 * @function listenOverlay
 * @returns {void}
 */
function listenOverlay() {

    const modalOverlay = document.querySelector(".modal-overlay")

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
            closeModal()
        }
    })
}

/**
 * Ferme la modale et met à jour son état d'accessibilité.
 *
 * @function closeModal
 * @returns {void}
 */
function closeModal() {

    const modalContainer = document.querySelector("#modal-container")
    modalContainer.classList.remove("is-active")
    modalContainer.ariaHidden = "true"
}

/**
 * Ouvre la modale, affiche les travaux et active leurs boutons de suppression.
 *
 * @function openModal
 * @param {object[]} works - Liste des travaux à afficher dans la modale.
 * @returns {void}
 */
function openModal(works) {

    const modalContainer = document.querySelector("#modal-container")
    modalContainer.classList.add("is-active")
    modalContainer.ariaHidden = "false"

    displayGalleryModal(works)
    listenDeleteButtons(works)
}

/**
 * Bascule entre la galerie et le formulaire de la modale.
 *
 * @function switchModal
 * @param {object[]} works - Liste des travaux à afficher dans la modale.
 * @returns {void}
 */
function switchModal(works) {

    const modalWrapper = document.querySelector("#modal-wrapper")
    const modalGallery = document.querySelector("#modal-gallery")
    const modalForm = document.querySelector("#modal-form")

    let modalActive

    modalGallery.classList.toggle("is-active")
    modalForm.classList.toggle("is-active")

    if (modalGallery.classList.contains("is-active")) {
        modalActive = modalGallery
    } else {
        modalActive = modalForm
    }

    const modalTitleActive = modalActive.querySelector("h3")

    modalWrapper.setAttribute("aria-labelledby", modalTitleActive.id)

    displayGalleryModal(works)
    listenDeleteButtons(works)
}

/**
 * Affiche les travaux sous forme de miniatures dans la galerie de la modale.
 *
 * @function displayGalleryModal
 * @param {object[]} works - Liste des travaux à afficher.
 * @returns {void}
 */
function displayGalleryModal(works) {

    const modalGalleryMiniatures = document.querySelector(".modal-gallery-miniatures")
    modalGalleryMiniatures.replaceChildren()

    let modalMiniatures = ""

    works.forEach(work => {

        modalMiniatures += `
<figure data-work-id="${work.id}">
	<img src="${work.imageUrl}" alt="">
	<button class="delete-button" data-work-id="${work.id}" aria-label="Supprimer le projet ${work.title}">
		<i class="fa-solid fa-trash-can" aria-hidden="true"></i>
	</button>
</figure>
`
    })
    modalGalleryMiniatures.insertAdjacentHTML("beforeend", modalMiniatures)
}

/**
 * Initialise les interactions de la modale et les options du formulaire.
 *
 * @function startModal
 * @param {object[]} works - Liste des travaux.
 * @param {object[]} categories - Liste des catégories.
 * @param {function} displayGallery - Fonction permettant d'afficher les travaux dans la galerie principale.
 * @returns {void}
 */
export function startModal(works, categories, displayGallery) {

    const buttonModifier = document.querySelector(".edition-button")
    const buttonAddPicture = document.querySelector(".button-next")
    const buttonArrowLeft = document.querySelector(".button-back")
    const buttonExit = document.querySelector(".button-close")
    const modalselect = document.querySelector("#modal-category-select")

    if (buttonModifier) {

        buttonModifier.addEventListener("click", () => openModal(works))
    }

    buttonAddPicture.addEventListener("click", () => switchModal(works))
    buttonArrowLeft.addEventListener("click", () => switchModal(works))
    buttonExit.addEventListener("click", closeModal)
    listenOverlay()
    handleValidation(works, displayGallery)
    displayPreview()

    categories.forEach(categorie => {

        const optionModal = `
        
        <option value="${categorie.id}">${categorie.name}</option>
        `
        modalselect.insertAdjacentHTML("beforeend", optionModal)
    })
}

/**
 * Ajoute un écouteur "click" aux boutons de suppression des travaux.
 *
 * @function listenDeleteButtons
 * @param {object[]} works - Liste des travaux à gérer.
 * @returns {void}
 */
function listenDeleteButtons(works) {

    const buttonsDelete = document.querySelectorAll(".delete-button")

    buttonsDelete.forEach(buttonDelete => {

        buttonDelete.addEventListener("click", () => {

            const idDelete = buttonDelete.dataset.workId
            handleDelete(idDelete, works)
        })
    })
}

/**
 * Supprime un travail via l'API puis met à jour les galeries.
 *
 * @async
 * @function handleDelete
 * @param {string} id - Identifiant du travail à supprimer.
 * @param {object[]} works - Liste des travaux.
 * @returns {Promise<void>}
 */
async function handleDelete(id, works) {

    try {

        await fetchDelete(id)
        updateGallery(id, works)

    } catch (error) {

        const modalGallery = document.querySelector(".modal-gallery-miniatures")

        console.error(error)
        displayError("La suppression a échoué, veuillez réessayer", modalGallery)
    }
}

/**
 * Met à jour les galeries après la suppression d'un travail.
 *
 * @function updateGallery
 * @param {string} id - Identifiant du travail supprimé.
 * @param {object[]} works - Liste des travaux à mettre à jour.
 * @returns {void}
 */
function updateGallery(id, works) {

    const workGallery = document.querySelector(`.gallery figure[data-work-id="${id}"]`)
    const workGalleryModal = document.querySelector(`.modal-gallery-miniatures figure[data-work-id="${id}"]`)

    workGallery.remove()
    workGalleryModal.remove()

    const positionWorkDelete = works.findIndex(work => work.id === Number(id))

    works.splice(positionWorkDelete, 1)
}

/**
 * Gère la validation du formulaire d'ajout d'un travail.
 *
 * @function handleValidation
 * @param {object[]} works - Liste des travaux à mettre à jour après l'ajout.
 * @param {function} displayGallery - Fonction permettant de mettre à jour la galerie principale.
 * @returns {void}
 */
function handleValidation(works, displayGallery) {

    const formModal = document.querySelector("#modal-add-form")
    const titleModal = document.querySelector("#modal-title-input")
    const fileModal = document.querySelector("#modal-input")
    const selectModal = document.querySelector("#modal-category-select")
    const buttonValidate = document.querySelector("#modal-validate-form")

    formModal.addEventListener("input", () => {

        if (fileModal.value && titleModal.value && selectModal.value) {

            buttonValidate.classList.add("modal-button-valid")
        } else {
            buttonValidate.classList.remove("modal-button-valid")
        }
    })

    formModal.addEventListener("submit", async (event) => {
        event.preventDefault()

        if (!fileModal.files[0] || !titleModal.value || !selectModal.value) {

            displayError("Veuillez remplir tous les champs obligatoires", selectModal)

            return
        }

        const existingError = document.querySelector(".modal-error-message")

        if (existingError) {
            existingError.remove()
        }

        const formDataModal = new FormData(formModal)

        try {

            const data = await fetchAdd(formDataModal)
            const defaultContent = document.querySelector("#modal-default-content")
            const boxImagePreview = document.querySelector("#box-image-preview")

            works.push(data)

            fileModal.value = ""
            titleModal.value = ""
            selectModal.value = ""

            defaultContent.classList.add("is-active")
            boxImagePreview.remove()
            displayGallery(works)

        } catch (error) {

            console.error(error)

            displayError("L'envoi a échoué, veuillez réessayer", selectModal)
        }
    })
}

/**
 * Affiche un aperçu de l'image sélectionnée dans le formulaire.
 *
 * @function displayPreview
 * @returns {void}
 */
function displayPreview() {

    const formModal = document.querySelector("#modal-add-form")
    const fileModal = document.querySelector("#modal-input")
    const defaultContent = document.querySelector("#modal-default-content")

    fileModal.addEventListener("change", () => {

        const file = fileModal.files[0]
        const urlPreview = URL.createObjectURL(file)

        const boxImagePreview = document.createElement("div")
        const imagePreview = document.createElement("img")

        boxImagePreview.id = "box-image-preview"
        imagePreview.src = urlPreview
        imagePreview.id = "image-preview"
        imagePreview.alt = ""

        defaultContent.classList.remove("is-active")

        const existingBox = document.querySelector("#box-image-preview")

        if (existingBox) {
            existingBox.remove()
        }

        formModal.prepend(boxImagePreview)
        boxImagePreview.appendChild(imagePreview)

        imagePreview.classList.add("is-active")
    })
}

/**
 * Affiche un message d'erreur à proximité d'un élément donné.
 *
 * @function displayError
 * @param {string} message - Message d'erreur à afficher.
 * @param {HTMLElement} anchor - Élément auquel le message d'erreur est rattaché.
 * @returns {void}
 */
function displayError(message, anchor) {

    let error = anchor.parentElement.querySelector(".modal-error-message")

    if (!error) {

        error = document.createElement("p")
        error.classList.add("modal-error-message")
        error.setAttribute("aria-live", "polite")

        anchor.after(error)
    }

    error.textContent = message
}
