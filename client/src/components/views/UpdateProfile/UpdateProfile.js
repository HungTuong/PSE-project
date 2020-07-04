import React, { useEffect, useState } from 'react';
import {Typography, Button, Form, Input} from 'antd';
import Axios from 'axios';


const { Title } = Typography;

function UpdateProfile(props){

    const userId = props.match.params.userId
    const [User, setUser] = useState([])

    useEffect(() => {
        Axios.get(`/api/users/users_by_id?id=${userId}&type=single`)
            .then(response => {
                setUser(response.data[0])
            })

    }, [])
    
    const [NameValue, setNameValue] = useState("")
    const [UsernameValue, setUsernameValue] = useState("")
    const [EmailValue, setEmailValue] = useState("")

    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value)
    }

    const onUsernameChange = (event) => {
        setUsernameValue(event.currentTarget.value)
    }

    const onEmailChange = (event) => {
        setEmailValue(event.currentTarget.value)
    }

    const onUpdate = (event) => {
        event.preventDefault();

        if (!NameValue || !UsernameValue || !EmailValue) {
            return alert('Fill all the fields first!')
        }

        const variables = {
            name: NameValue,
            username: UsernameValue,
            email: EmailValue,
        }

        Axios.put(`/api/users/users_by_id?id=${userId}`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('User info successfully updated')
                    props.history.push('/')
                } else {
                    alert(response.data.err.errmsg)
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>User Profile</Title>
            </div>
        
            <Form onSubmit={onUpdate} >
                <label>Name</label>
                <Input
                    onChange={onNameChange}
                    placeholder={User.name}
                />
                <br />
                <br />
                <label>Username</label>
                <Input
                    onChange={onUsernameChange}
                    placeholder={User.username}
                />
                <br />
                <br />

                <label>Email</label>
                <Input
                    onChange={onEmailChange}
                    placeholder={User.email}
                />
                <br />
                <br />
            
                <Button
                    onClick={onUpdate}
                    type='primary'
                >
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default UpdateProfile