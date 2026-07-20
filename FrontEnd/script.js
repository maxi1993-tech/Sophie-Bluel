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
const buttonAll = `
    <li>
        <button type="button">Tous</button>
    </li>`
filters.insertAdjacentHTML(`afterbegin`, buttonAll)

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(donnees => donnees.forEach(categorie => {
        const buttonCategorie = `
            <li>
                <button type="button">${categorie.name}</button>
            </li>
        `
        filters.insertAdjacentHTML(`beforeend`, buttonCategorie)
    }))