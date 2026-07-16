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

