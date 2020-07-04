import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           &copy; {new Date().getFullYear()} Copyright:{' '}
            <a href='https://www.google.com'> Logo.com </a>
        </div>
    )
}

export default Footer
