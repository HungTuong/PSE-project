import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../Utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Cinemas = [
    { key: 1, value: "CGV Cinemas 1" },
    { key: 2, value: "CGV Cinema 2" },
    { key: 3, value: "CGV Cinema 3" },
    { key: 4, value: "Galaxy Cinema 1" },
    { key: 5, value: "Galaxy Cinema 2" },
    { key: 6, value: "Galaxy Cinema 3" },
    { key: 7, value: "Lotte Cinema 1" },
    { key: 8, value: "Lotte Cinema 2" },
    { key: 9, value: "Lotte Cinema 3" },
    { key: 10, value: "BHD Star Cineplex 1" },
    { key: 11, value: "BHD Star Cineplex 2" },
    { key: 12, value: "BHD Star Cineplex 3" }
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [GenreValue, setGenreValue] = useState("")
    const [LengthValue, setLengthValue] = useState(0)

    const [ReleaseDateValue, setReleaseDateValue] = useState(new Date())
    const [MoviesDistributorsValue, setMoviesDistributorsValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onGenreChange = (event) => {
        setGenreValue(event.currentTarget.value)
    }

    const onLengthChange = (event) => {
        setLengthValue(event.currentTarget.value)
    }
    const onReleaseDateValue = (event) => {
        setReleaseDateValue(event.currentTarget.value)
    }

    const onMoviesDistributorsSelectChange = (event) => {
        setMoviesDistributorsValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !GenreValue || 
            !LengthValue || !ReleaseDateValue ||
            !MoviesDistributorsValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            genre: GenreValue,
            length: LengthValue,
            ReleaseDate: ReleaseDateValue,
            images: Images,
            cinema: MoviesDistributorsValue
        }

        Axios.post('/api/movie/uploadMovie', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Movie Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload the movie')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Movie Description</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Genre</label>
                <Input
                    onChange={onGenreChange}
                    value={GenreValue}
                />
                <br />
                <br />
                <label>Released date</label>
                <Input
                    onChange={onReleaseDateValue}
                    value={ReleaseDateValue}
                    type="date"
                />
                <br />
                <br />
                <label>Length (mins)</label>
                <Input
                    onChange={onLengthChange}
                    value={LengthValue}
                    type="number"
                />
                <br /><br />
                <label>Cinema</label>
                <br />
                <select onChange={onMoviesDistributorsSelectChange} value={MoviesDistributorsValue}>
                    {Cinemas.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage