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
