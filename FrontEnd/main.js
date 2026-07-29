import { fetchData } from './api.js'

async function start() {

    try {

        const {categories, works} = await fetchData()
        console.log({categories, works})
    } catch (error) {

        console.error(error)
    }
}

start() 