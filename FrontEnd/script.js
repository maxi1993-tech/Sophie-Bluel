const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".filters")
let donneesGallery


function fetchCategories() {
    console.log("javascript commence à lire et appelle les données de catégories")
    fetch("http://localhost:5678/api/categories")
        .then(reponse => reponse.json())
        .then(donnees => createButtons(donnees))
        .catch(error => console.log(error))
}

function fetchGallery() {
    console.log("javascript continue et appelle les données de gallery")
    fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then(donnees => {
            console.log("les données sont arrivées")
            donneesGallery = donnees
            displayGallery(donnees)
        })
        .catch(error => console.log(error))
}

function createButtons(categories) {
    console.log("javascript récupère les données de catégories et peut enfin les créer")
    const buttonAll = `
        <li>
            <button class="filter-button filter-button-selected" type="button">Tous</button>
        </li>
        `
    filters.insertAdjacentHTML(`afterbegin`, buttonAll)
    categories.forEach(categorie => {
        const buttonCategorie = `
            <li>
                <button class="filter-button" type="button">${categorie.name}</button>
            </li>
        `
        filters.insertAdjacentHTML(`beforeend`, buttonCategorie)
    })
    listenFilterButtons()
    console.log("les clics sont ecouter")
}


function displayGallery(donnees) {
    gallery.replaceChildren()
    console.log("javascript affiche la gallery")
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

function listenFilterButtons() {
    console.log("javascript peut maintenant écouter les clics")
    const filterButton = document.querySelectorAll(".filter-button")
    filterButton.forEach(button => {
        button.addEventListener("click", function () {
            console.trace()
            console.log(button.textContent)
            console.log(donneesGallery)
            filterWorks(button)
            const filterButtonSelected = document.querySelector(".filter-button-selected")
            filterButtonSelected.classList.remove("filter-button-selected")
            button.classList.add("filter-button-selected")
        })
    })
}

function filterWorks(button) {
    console.log("javascript filtre par catégories")
    if (button.textContent === "Tous") {
        console.log("affiche toutes la gallerie")
        displayGallery(donneesGallery)
    } else {
        console.log("affiche la gallerie par filtre")
        const sort = donneesGallery.filter((work) => work.category.name === button.textContent)
        displayGallery(sort)
    }
}


fetchCategories()
fetchGallery()
console.log("javascript a fini de lire le script car il n'attend pas")


