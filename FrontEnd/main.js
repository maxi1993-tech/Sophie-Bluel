import { fetchData } from './api.js'
import { displayGallery } from './gallery.js'
import { createButtons, listenButtons } from './filters.js'
import { loginUser } from './edition.js'

async function start() {

    try {

        const {categories, works} = await fetchData()

        displayGallery(works)
        createButtons(categories)
        listenButtons(works, displayGallery)

        loginUser()
        
    } catch (error) {

        console.error(error)
    }
}

start() 