const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    title: { type: String, required: true},
    date: { type: String, required: true },
    url: { type: String, required: true },
    snippet: { type: String, required: true }
})