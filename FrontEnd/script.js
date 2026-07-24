const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".filters")
let donneesGallery
//###############################################################################################
//###############################################################################################
//###############################################################################################
console.log("### Script begin ###")
function fetchCategories() {
    console.log("### fetchCategories ###")
    fetch("http://localhost:5678/api/categories")
        .then(reponse => reponse.json())
        .then(donnees => createButtons(donnees))
        .catch(error => console.log(error))
}
//###############################################################################################
//###############################################################################################
//###############################################################################################

function fetchGallery() {
    console.log("### fetchGallery ###")
    fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then(donnees => {
            console.log("### les données sont arrivées ###")
            donneesGallery = donnees
            displayGallery(donnees)
        })
        .catch(error => console.log(error))
}
//###############################################################################################
//###############################################################################################
//###############################################################################################

function createButtons(categories) {
    console.log("### createButtons ###")
    const buttonAll = `
        <li>
            <button class="filter-button filter-button-selected" type="button">Tous</button>
        </li>
        `
    filters.insertAdjacentHTML(`afterbegin`, buttonAll)
    categories.forEach(categorie => {
        console.log("### forEach ###")
        const buttonCategorie = `
            <li>
                <button class="filter-button" type="button">${categorie.name}</button>
            </li>
        `
        filters.insertAdjacentHTML(`beforeend`, buttonCategorie)
    })
    listenFilterButtons()
}
//###############################################################################################
//###############################################################################################
//###############################################################################################

function displayGallery(donnees) {
    console.log("### displayGallery ###")
    gallery.replaceChildren()
    donnees.forEach(work => {
        const project = document.createElement("figure");
        const projectImg = document.createElement("img");
        projectImg.setAttribute("src", work.imageUrl);
        projectImg.setAttribute("alt", work.title);
        const projectTitle = document.createElement("figcaption");
        projectTitle.textContent = work.title;
        gallery.appendChild(project);
        project.appendChild(projectImg);
        project.appendChild(projectTitle);
    })
}
//###############################################################################################
//###############################################################################################
//###############################################################################################

function listenFilterButtons() {
    console.log("### listenFilterButtons ###")
    const filterButton = document.querySelectorAll(".filter-button")
    filterButton.forEach(button => {
        button.addEventListener("click", function () {
            console.log("### bouton cliqué ###", button.textContent)
            filterWorks(button)
            const filterButtonSelected = document.querySelector(".filter-button-selected")
            filterButtonSelected.classList.remove("filter-button-selected")
            button.classList.add("filter-button-selected")
        })
    })
}
//###############################################################################################
//###############################################################################################
//###############################################################################################

function filterWorks(button) {
    console.log("### filterWorks ###")
    if (button.textContent === "Tous") {
        console.log("### affiche toutes la gallerie ###")
        displayGallery(donneesGallery)
    } else {
        console.log("### affiche la gallerie par filtre ###")
        const sort = donneesGallery.filter((work) => work.category.name === button.textContent)
        displayGallery(sort)
    }
}
//###############################################################################################
//###############################################################################################
//###############################################################################################

fetchCategories()
fetchGallery()

console.log("### Script End ###")

