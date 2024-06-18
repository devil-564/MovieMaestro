import React, { useContext, useEffect } from 'react'
import eContext from '../context/everything_context/eContext'

const {alert, setAlert} = context;
useEffect(() => {
    setTimeout(() => {
        setAlert(null)
    }, 5000);
}, [])
const Alert = () => {
  return (
    alert && <div>
      Hello This is Alert
    </div>
  )
}

export default Alert
