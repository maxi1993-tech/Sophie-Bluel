import { fetchDelete } from './api.js'

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

function switchModal() {

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

export function startModal(works) {

    const buttonModifier = document.querySelector(".edition-button")
    const buttonAddPicture = document.querySelector(".button-next")
    const buttonArrowLeft = document.querySelector(".button-back")
    const buttonExit = document.querySelector(".button-close")

    if (buttonModifier) {

        buttonModifier.addEventListener("click", () => openModal(works))
    }

    buttonAddPicture.addEventListener("click", switchModal)
    buttonArrowLeft.addEventListener("click", switchModal)
    buttonExit.addEventListener("click", closeModal)
    listenOverlay()
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
