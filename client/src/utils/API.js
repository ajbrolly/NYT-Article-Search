import axios from "axios";

export default {
    runQuery: function (searchTerm) {

        const APIKey = 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931';
        const search = searchTerm;
        // const startDate = start.trim() + "0101";
        // const endDate = end.trim() + "1231";

        return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
                'api-key': APIKey,
                'q': search
                // 'begin_date': startDate,
                // 'end_date': endDate
            }
        })
            .then(function (results) {
                return results.data.response;
            });
    },

    getSaved: function () {
        return axios.get('/api/articles')
            .then(function (results) {
                return results;
            })
    },

    postSaved: function (title, date, url, snippet) {
        var newArticle = { title: title, date: date, url: url, snippet: snippet };
        return axios.post('/api/articles', newArticle)
            .then(function (results) {
                return results._id;
            })
    },

    deleteSaved: function (title, date, url) {
        return axios.delete('/api/articles', {
            params: {
                'title': title,
                'date': date,
                'url': url,
            }
        })
            .then(function (results) {
                return results;
            })
    }
}





// export default {
//     // Gets all articles
//     getAllArticles: function () {
//         return axios.get("/api/articles");
//     },
//     // Gets the article with the given id
//     getArticles: function (id) {
//         return axios.get("/api/articles/" + id);
//     },
//     // Deletes the article with the given id
//     deleteArticle: function (id) {
//         return axios.delete("/api/articles/" + id);
//     },
//     // Saves a article to the database
//     saveArticle: function (bookData) {
//         return axios.post("/api/articles", bookData);
//     }
// };
