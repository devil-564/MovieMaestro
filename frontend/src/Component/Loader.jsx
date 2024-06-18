import React, { useEffect } from 'react'
import "../Css/Loader.css"

const Loader = (props) => {
    const {loaderCheck} = props

    return (
        <div className='loader-container' style={{ display: loaderCheck == true ? "none" : "flex" }}>
            <h1 style={{ letterSpacing: "1.25vw" }}>LOADING ...</h1>
            <div className='loader'>
                <div className='loader-item' id='loader-item-1'></div>
            </div>
        </div>
    )
}

export default Loader
