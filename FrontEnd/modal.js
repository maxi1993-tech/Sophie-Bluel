function listenClick(button, fn) {

    button.addEventListener("click", fn)
}

function closeModal() {

    const modalContainer = document.querySelector("#modal-container")
    modalContainer.classList.remove("is-active")
    modalContainer.ariaHidden = "true"
}
