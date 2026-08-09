// Construit et affiche la galerie
export function displayGallery(worksList) {

    // récupère la galerie
    const gallery = document.querySelector(".gallery")

    // vide la galerie
    gallery.replaceChildren()

    // récupère le template HTML
    const workTemplate = document.getElementById("work-template")

    // crée un conteneur temporaire en mémoire
    const virtualBox = document.createDocumentFragment()

    // parcourt les projets
    worksList.forEach(work => {

        // duplique le template
        const workClone = workTemplate.content.cloneNode(true)

        // récupère les éléments du clone
        const cloneImg = workClone.querySelector("img")
        const cloneFigcaption = workClone.querySelector("figcaption")

        // remplit le clone
        cloneImg.src = work.imageUrl
        cloneImg.alt = work.title
        cloneFigcaption.textContent = work.title

        // ajoute le clone au conteneur
        virtualBox.appendChild(workClone)
    })
    console.log("### nombre de travaux affichés ###", worksList.length)
    // ajoute les projets à la galerie
    gallery.appendChild(virtualBox)
}
