import axios from "axios";

export default {
    // Gets all books
    getAllArticles: function () {
        return axios.get("/api/articles");
    },
    // Gets the book with the given id
    getArticles: function (id) {
        return axios.get("/api/articles/" + id);
    },
    // Deletes the book with the given id
    deleteArticle: function (id) {
        return axios.delete("/api/articles/" + id);
    },
    // Saves a book to the database
    saveArticle: function (bookData) {
        return axios.post("/api/articles", bookData);
    }
};
