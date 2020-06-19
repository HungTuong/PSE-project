const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Movie } = require("../models/Movie");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Movies
//=================================

router.post("/uploadImage", auth, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/uploadMovie", auth, (req, res) => {

    //save all the data we got into the DB 
    const movie = new Movie(req.body)

    movie.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/getMovies", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;


    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            
            findArgs[key] = req.body.filters[key];

        }
    }

    if(term){
        Movie.find(findArgs)
        .find({ $text: { $search: term } })
        .populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, movie) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, movie, movieCapacity: movie.length})
        })
    }else{
        Movie.find(findArgs)
        .populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, movie) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, movie, movieCapacity: movie.length})
        })
    }
    

    
});


router.get("/movies_by_id", (req, res) => {
    let type = req.query.type
    let movieId = req.query.id

    
    Movie.find({'_id': {$in: movieId}})
    .populate('writer')
    .exec((err, movie) => {
        if(err) return res.status(400).send(err)
        return res.status(200).send(movie)
    })

});

module.exports = router;
