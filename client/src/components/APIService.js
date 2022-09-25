export default class APIService {
    static UpdateRecipe(id, body) {
        return fetch(`/update/${id}`, {
            "method" : "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
    }
}