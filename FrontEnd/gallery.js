/**
 * Construit et affiche la galerie
 * 
 * @function displayGallery
 * @param {object[]} worksList - La liste des travaux à afficher
 * @returns {void}
 */
export function displayGallery(worksList) {

    const gallery = document.querySelector(".gallery")

    gallery.replaceChildren()

    const workTemplate = document.getElementById("work-template")

    const virtualBox = document.createDocumentFragment()

    worksList.forEach(work => {

        const workClone = workTemplate.content.cloneNode(true)

        const cloneFigure = workClone.querySelector("figure")
        const cloneImg = workClone.querySelector("img")
        const cloneFigcaption = workClone.querySelector("figcaption")

        cloneFigure.dataset.workId = work.id
        cloneImg.src = work.imageUrl
        cloneImg.alt = work.title
        cloneFigcaption.textContent = work.title

        virtualBox.appendChild(workClone)
    })

    gallery.appendChild(virtualBox)
}
