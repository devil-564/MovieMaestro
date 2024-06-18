import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../Css/LoaderMain.css"

const LoaderMain = () => {
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            navigate(location.state.next_page_url)
        }, 2000);

        return () => {

        }
    }, [])
    return (
        <>  
            <div className='loader-container1'>
                <div className='loader'>
                    <div className='loader-item' id='loader-item-1'></div>
                </div>
            </div>
        </>
    )
}

export default LoaderMain
