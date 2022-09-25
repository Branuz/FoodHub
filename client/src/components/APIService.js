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

    static InsertRecipe(body) {
        return fetch(`/add`, {
            "method" : "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
    }

    static DeleteRecipe(id) {
        return fetch(`/delete/${id}`, {
            "method" : "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
        })
    }
}
