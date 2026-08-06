function verifyToken() {

    const token = sessionStorage.getItem("token")

    return token
}

function hideFilters() {

    const filters = document.querySelector(".filters")

    filters.replaceChildren()
}
