function listenClick(button, fn) {

    button.addEventListener("click", fn)
}

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
<figure id="modal-work-${work.id}">
	<img src="${work.imageUrl}" alt="${work.title}">
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

        listenClick(buttonModifier, () => openModal(works))
    }

    listenClick(buttonAddPicture, switchModal)
    listenClick(buttonArrowLeft, switchModal)
    listenClick(buttonExit, closeModal)
    listenOverlay()
}