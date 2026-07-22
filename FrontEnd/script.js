const gallery = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(donnees => donnees.forEach(work => {
        const project = document.createElement("figure");
        const projectImg = document.createElement("img");
        projectImg.setAttribute("src", work.imageUrl);
        projectImg.setAttribute("alt", work.title);
        const projectTitle = document.createElement("figcaption");
        projectTitle.textContent = work.title;

        gallery.appendChild(project);
        project.appendChild(projectImg);
        project.appendChild(projectTitle);


    }))

const filters = document.querySelector(".filters")


function fetchCategories() {
    fetch("http://localhost:5678/api/categories")
        .then(reponse => reponse.json())
        .then(donnees => createButtons(donnees))
}

function createButtons(categories) {
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
}

function listenFilterButtons() {
    const filterButtonSelected = document.querySelector(".filter-button-selected")
    const filterButton = document.querySelectorAll(".filter-button")
    filterButton.forEach(button => {
        button.addEventListener("click", function () {
            console.log(button)
        })
    })
}

fetchCategories()
