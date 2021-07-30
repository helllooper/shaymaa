import React from 'react'

const Loading = () => {
    return (
    <div id="loading" className="d-flex justify-content-center align-items-center position-fixed">
        <div className="lds-heart">
            <div></div>
        </div>
    </div>
    )
}

export default Loading
