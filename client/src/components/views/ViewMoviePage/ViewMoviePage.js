import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import MovieImage from './Sections/MovieImage';
import MovieInfo from './Sections/MovieInfo';
import { useDispatch } from 'react-redux';
function ViewMoviePage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])

    useEffect(() => {
        Axios.get(`/api/movie/movies_by_id?id=${movieId}&type=single`)
            .then(response => {
                setMovie(response.data[0])
            })

    }, [])

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Movie.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <MovieImage detail={Movie} />
                </Col>
                <Col lg={12} xs={24}>
                    <MovieInfo
                        detail={Movie} />
                </Col>
            </Row>
        </div>
    )
}

export default ViewMoviePage