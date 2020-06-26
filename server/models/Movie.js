const mongoose = require('mongoose');
const Schema = require('mongoose');

const movieSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    genre: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    length: {
        type: Number,
        default: 1
    },
    cinema: {
        type: Number,
        default: 1
    },
    releaseDate: {
        type: Date
    }
}, { timestamps: true })

movieSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        title: 5,
        description: 1,
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie }