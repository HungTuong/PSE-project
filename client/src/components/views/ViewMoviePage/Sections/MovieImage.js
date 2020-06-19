import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function MovieImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(movie => {
                images.push({
                    original: `http://localhost:5000/${movie}`,
                    thumbnail: `http://localhost:5000/${movie}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default MovieImage
