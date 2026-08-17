import { fetchData } from './api.js'
import { displayGallery } from './gallery.js'
import { createButtons, listenButtons } from './filters.js'
import { setupEditionMode } from './edition.js'
import { startModal } from './modal.js'

async function start() {

    try {

        let { categories, works } = await fetchData()

        displayGallery(works)
        createButtons(categories)
        listenButtons(works, displayGallery)

        setupEditionMode()
        startModal(works, categories)

    } catch (error) {

        console.error(error)
    }
}

start() 