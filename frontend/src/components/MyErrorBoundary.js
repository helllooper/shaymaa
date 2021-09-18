import React from 'react'
import Message from "./Message"
const MyErrorBoundary = () => {
    return (
        <div>
            <Message variant="danger">Error</Message>
        </div>
    )
}

export default MyErrorBoundary
