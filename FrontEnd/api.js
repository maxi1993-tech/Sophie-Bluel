/**
 * @constant {string} API_URL - URL de l'API backend
 */
const API_URL = "http://localhost:5678/api/"

/**
 * Récupère les données API de catégories et projets
 * 
 * @async
 * @function fetchData
 * @returns {Promise<{categories:object[], works:object[]}>} Un objet contenant la liste des catégories et des travaux.
 * @throws {Error} Si l'une des requêtes HTTP échoue (statut non ok).
 */
export async function fetchData() {

    try {

        const [categoriesResponse, worksResponse] = await Promise.all([
            fetch(`${API_URL}categories`),
            fetch(`${API_URL}works`),
        ])

        if (!categoriesResponse.ok || !worksResponse.ok) {
            throw new Error(`Erreur serveur, categories ${categoriesResponse.status}, works ${worksResponse.status}`)
        }

        const [categories, works] = await Promise.all([
            categoriesResponse.json(),
            worksResponse.json()
        ])

        return {
            categories, works
        }
    } catch (error) {

        throw error
    }
}

/**
 * Envoie les données d'authentification de l'utilisateur
 * 
 * @async
 * @function fetchLogin
 * @param {object} user - Les données d'identification de l'utilisateur.
 * @param {string} user.email - L'adresse email de l'utilisateur.
 * @param {string} user.password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} L'objet renvoyé par l'API, avec userId et token.
 * @throws {Error} Si la tentative de connexion échoue ou si le serveur renvoie une erreur.
 */
export async function fetchLogin(user) {

    try {

        const response = await fetch(`${API_URL}users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            throw new Error(`Erreur serveur, login ${response.status}`)
        }

        const usersData = await response.json()

        return usersData

    } catch (error) {

        throw error
    }
}

/**
 * Supprime le travail
 * 
 * @async
 * @function fetchDelete
 * @param {string} id - identifiant du travail à supprimer
 * @returns {Promise<void>} Ne renvoie rien, la réponse 204 est vide.
 * @throws {Error} Si la suppression échoue.
 */
export async function fetchDelete(id) {

    try {

        const response = await fetch(`${API_URL}works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
        })

        if (!response.ok) {
            throw new Error(`Erreur serveur, delete ${response.status}`)
        }

    } catch (error) {

        throw error
    }

}

/**
 * Ajoute un nouveau travail
 * 
 * @async
 * @function fetchAdd
 * @param {FormData} data - les données du formulaire, image, titre et catégorie
 * @returns {Promise<Object>} Le projet créé, renvoyé par l'API.
 * @throws {Error} Si l'ajout échoue.
 */
export async function fetchAdd(data) {

    try {

        const response = await fetch(`${API_URL}works/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
            body: data
        })

        if (!response.ok) {
            throw new Error(`Erreur serveur, add ${response.status}`)
        }

        const workCreate = await response.json()

        return workCreate

    } catch (error) {

        throw error
    }

}

