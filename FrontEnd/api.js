const API_URL = "http://localhost:5678/api/"

// Récupère les données API de catégories et projets
export async function fetchData() {

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

        throw error
    }
}

// Envoie les données d'authentification de l'utilisateur
export async function fetchLogin(user) {

    try {

        // Lance la requête
        const response = await fetch(`${API_URL}users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        // Vérifie la réponse HTTP
        if (!response.ok) {
            throw new Error(`Erreur serveur, login ${response.status}`)
        }

        // Convertit la réponse en JSON
        const usersData = await response.json()

        // Renvoie les données
        return usersData

    } catch (error) {

        throw error
    }
}

// Supprime le travail
export async function fetchDelete(id) {

    try {

        // Lance la requête
        const response = await fetch(`${API_URL}works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
        })

        // Vérifie la réponse HTTP
        if (!response.ok) {
            throw new Error(`Erreur serveur, delete ${response.status}`)
        }

    } catch (error) {

        throw error
    }

}

export async function fetchAdd(data) {

    try {

        // Lance la requête
        const response = await fetch(`${API_URL}works/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
            body: data
        })

        // Vérifie la réponse HTTP
        if (!response.ok) {
            throw new Error(`Erreur serveur, add ${response.status}`)
        }

        const workCreate = await response.json()

        return workCreate

    } catch (error) {

        throw error
    }

}

