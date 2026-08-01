//###############################################################################################
//###############################################################################################
//###############################################################################################

export function displayGallery(worksList) {
    console.log("### displayGallery ###")
    // récupère la galerie
    const gallery = document.querySelector(".gallery")

    // vide la gallerie
    gallery.replaceChildren()

    // récupère le template HTML
    const workTemplate = document.getElementById("work-template")

    // crée un conteneur temporaire en mémoire
    const virtualBox = document.createDocumentFragment()

    // parcourt les projet
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
        console.log(work)
        console.dir(virtualBox)
    })
    // ajoute les projets à la galerie
    gallery.appendChild(virtualBox)
}