import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';

function MovieInfo(props) {
    const [Movie, setMovie] = useState({})

    useEffect(() => {

        setMovie(props.detail)

    }, [props.detail])

    return (
        <div>
            <Descriptions bordered layout="vertical" title="Movie Info">
                <Descriptions.Item label="Genre"> {Movie.genre}</Descriptions.Item>
                <Descriptions.Item label="Length"> {Movie.length} mins</Descriptions.Item>
                <Descriptions.Item label="Description"> {Movie.description}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default MovieInfo
