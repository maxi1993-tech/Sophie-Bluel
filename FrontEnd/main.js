import { fetchData } from './api.js'
import { displayGallery } from './gallery.js'
import { createButtons, listenButtons } from './filters.js'
import { loginUser } from './edition.js'
import { startModal } from './modal.js'

async function start() {

    try {

        const {categories, works} = await fetchData()

        displayGallery(works)
        createButtons(categories)
        listenButtons(works, displayGallery)

        loginUser()
        startModal(works)
        
    } catch (error) {

        console.error(error)
    }
}

start() 