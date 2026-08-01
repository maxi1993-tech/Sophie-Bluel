import { fetchData } from './api.js'
import { displayGallery } from './gallery.js'
import { createButtons } from './filters.js'

async function start() {

    try {

        const {categories, works} = await fetchData()
        console.log({categories, works})

        displayGallery(works)
        createButtons(categories)
    } catch (error) {

        console.error(error)
    }
}

start() 