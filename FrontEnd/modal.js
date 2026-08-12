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

function startModal(works) {

    const modalContainer = document.querySelector("#modal-container")
    modalContainer.classList.add("is-active")
    modalContainer.ariaHidden = "false"
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
