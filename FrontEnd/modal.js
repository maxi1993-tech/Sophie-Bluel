import { fetchAdd, fetchDelete } from './api.js'

function listenOverlay() {

    const modalOverlay = document.querySelector(".modal-overlay")

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
            closeModal()
        }
    })
}

function closeModal() {

    const modalContainer = document.querySelector("#modal-container")
    modalContainer.classList.remove("is-active")
    modalContainer.ariaHidden = "true"
}

function openModal(works) {

    const modalContainer = document.querySelector("#modal-container")
    modalContainer.classList.add("is-active")
    modalContainer.ariaHidden = "false"

    displayGalleryModal(works)
    listenDeleteButtons(works)
}

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

function listenDeleteButtons(works) {

    const buttonsDelete = document.querySelectorAll(".delete-button")

    buttonsDelete.forEach(buttonDelete => {

        buttonDelete.addEventListener("click", () => {

            const idDelete = buttonDelete.dataset.workId
            handleDelete(idDelete, works)
        })
    })
}

async function handleDelete(id, works) {

    try {

        await fetchDelete(id)
        updateGallery(id, works)

    } catch (error) {

        console.error(error)
        alert("La suppression a échoué, veuillez réessayer")
    }
}

function updateGallery(id, works) {

    const workGallery = document.querySelector(`.gallery figure[data-work-id="${id}"]`)
    const workGalleryModal = document.querySelector(`.modal-gallery-miniatures figure[data-work-id="${id}"]`)

    workGallery.remove()
    workGalleryModal.remove()

    const positionWorkDelete = works.findIndex(work => work.id === Number(id))

    works.splice(positionWorkDelete, 1)
}

function handleValidation(works, displayGallery) {

    const formModal = document.querySelector("#modal-add-form")
    const titleModal = document.querySelector("#modal-title-input")
    const fileModal = document.querySelector("#modal-input")
    const selectModal = document.querySelector("#modal-category-select")

    formModal.addEventListener("submit", async (event) => {
        event.preventDefault()

        if (!fileModal.files[0] || !titleModal.value || !selectModal.value) {

            let errorModal = document.querySelector("#modal-error-message")

            if (!errorModal) {

                errorModal = document.createElement("p")
                errorModal.id = "modal-error-message"
                errorModal.setAttribute("aria-live", "polite")

                selectModal.after(errorModal)
            }

            errorModal.textContent = "Veuillez remplir tous les champs obligatoires."
            return
        }

        const existingError = document.querySelector("#modal-error-message")

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
        }
    })
}

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