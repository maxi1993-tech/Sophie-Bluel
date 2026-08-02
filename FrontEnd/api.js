const API_URL = "http://localhost:5678/api/"

export async function fetchData() {
    console.log("### fetchData ###")

    try {

        // Lance les 2 requêtes en parallèle
        const [categoriesResponse, worksResponse] = await Promise.all([
            fetch(`${API_URL}categories`),
            fetch(`${API_URL}works`),
        ])

        // Vérifie les réponses HTTP
        if (!categoriesResponse.ok || !worksResponse.ok) {
            throw new Error(`Erreur serveur, categories ${categoriesResponse.status}, works ${worksResponse.status}`)
        }

        // Convertit les réponses en JSON
        const [categories, works] = await Promise.all([
            categoriesResponse.json(),
            worksResponse.json()
        ])

        // Renvoie les données
        return {
            categories, works
        }
    } catch (error) {
        // Affiche l'erreur
        console.error(error)
        throw error
    }
}

//###############################################################################################
//###############################################################################################
//###############################################################################################

export async function fetchLogin(user) {

    try {

        const response = await fetch(`${API_URL}users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.inputEmail, password: user.inputPassword }),
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur, login ${response.status}`)
        }

        const usersData = await response.json()

        return usersData

    } catch (error) {
        // Affiche l'erreur
        console.error(error)
        throw error

    }
}