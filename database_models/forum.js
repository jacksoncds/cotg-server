const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    created: Date,
    title: String,
    description: String,
    createdBy: String,
    topics: [
        {
            created: Date,
            title: String,
            description: String,
            createdBy: String,
            replies: [
                {
                    created: Date,
                    edited: Date,
                    isEdited: Boolean,
                    content: String,
                    createdBy: String,
                },
            ],
        },
    ],
});
