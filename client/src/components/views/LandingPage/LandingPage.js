import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd';
import Axios from 'axios';
import ImageSlider from '../../Utils/ImageSlider';
import CheckBox from './Sections/Checkbox';
import SearchFeature from './Sections/SearchFeature';



const { Meta } = Card;


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [MovieCapacity, setMovieCapacity] = useState()
    const [SearchTerms, setSearchTerms] = useState("")


    const [Filters, setFilters] = useState({
        cinema: []
    })


    useEffect(() => {
        const movie_interval = {
            skip: Skip,
            limit: Limit,
        }
        getMovies(movie_interval)
    }, [])

    const getMovies = (variables) => {
        Axios.post('/api/movie/getMovies', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setMovies([...Movies, ...response.data.movie])
                    } else {
                        setMovies(response.data.movie)
                    }
                    setMovieCapacity(response.data.movieCapacity)
                } else {
                    alert('Failed to fectch movie datas')
                }
            })
    }

    const renderCards = Movies.map((movie, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/movie/${movie._id}`} > <ImageSlider images={movie.images} /></a>}
            >
                <Meta
                    title={movie.title}
                />
            </Card>
        </Col>
    })

    const onLoadMore = () => {
        let startPoint = Skip + Limit;

        const variables = {
            startPoint: startPoint,
            limit: Limit,
            loadMore: true,
        }
        getMovies(variables)
        setSkip(startPoint)
    }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getMovies(variables)
        setSkip(0)

    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getMovies(variables)
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }
        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    
    return(
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Book Movie Tickets From Anywhere  <Icon type="rocket" />  </h2>
            </div>  

            
            <Row gutter={[16, 16]}>
                <CheckBox
                    handleFilters={filters => handleFilters(filters, "cinema")}
                /> 
            </Row>
        
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>
            <br /><br />
            {Movies.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No Movies yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br /><br />
            {MovieCapacity >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }
        </div>

    )


}

export default LandingPage