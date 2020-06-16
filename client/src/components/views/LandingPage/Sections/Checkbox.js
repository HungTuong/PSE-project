import React, { useState } from 'react'
import { Checkbox, Collapse, Col } from 'antd';

const { Panel } = Collapse

const cinema = [
    {
        "_id" : 1,
        "location" : "CGV Cinema 1"
    },
    {
        "_id" : 2,
        "location" : "CGV Cinema 2"
    },
    {
        "_id" : 3,
        "location" : "CGV Cinema 3"
    },
    {
        "_id" : 4,
        "location" : "Galaxy Cinema 1"
    },
    {
        "_id" : 5,
        "location" : "Galaxy Cinema 2"
    },
    {
        "_id" : 6,
        "location" : "Galaxy Cinema 3"
    },
    {
        "_id" : 7,
        "location" : "Lotte Cinemas 1"
    },
    {
        "_id" : 8,
        "location" : "Lotte Cinemas 2"
    },
    {
        "_id" : 9,
        "location" : "Lotte Cinemas 3"
    },
    {
        "_id" : 10,
        "location" : "BHD Star Cineplex 1"
    },
    {
        "_id" : 11,
        "location" : "BHD Star Cineplex 2"
    },
    {
        "_id" : 12,
        "location" : "BHD Star Cineplex 3"
    } 
]

function CheckBox(props) {
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        //update this checked information into landing page component 
        props.handleFilters(newChecked)
    
    }

    const renderCheckboxLists = () => cinema.map((value, index) => (
        <React.Fragment key={index}>
            <Col span={6}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
                style={{margin: '0px 1rem 0px 0px'}}
            />  
            {value.location}</Col>
        </React.Fragment>
    ))

    

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Cinema" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox