export default class APIService {
    static UpdateRecipe(id, body) {
        return fetch("/get", {
            "method" : "PUT",
            headers: {
                "Content-Type":"applications/json"
            }
        })
    }
}