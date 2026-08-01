//###############################################################################################
//###############################################################################################
//###############################################################################################

export function createButtons(categoriesList) {
    console.log("### createButtons ###")

    const filters = document.querySelector(".filters")

    filters.replaceChildren()

    const buttonTemplate = document.getElementById("button-template")

    const virtualBox = document.createDocumentFragment()

    const allCategories = [{ id: 0, name: "Tous" }, ...categoriesList]
    console.log(allCategories)

    allCategories.forEach(categorie => {

        const buttonClone = buttonTemplate.content.cloneNode(true)

        const button = buttonClone.querySelector("button")


        button.textContent = categorie.name
        button.dataset.categoryId = categorie.id

        if (categorie.id === 0) {
            button.classList.add("filter-button-selected")
        }
        console.log(categorie)

        virtualBox.appendChild(buttonClone)
    })

    filters.appendChild(virtualBox)
}

//###############################################################################################
//###############################################################################################
//###############################################################################################

export function listenButtons() {

}