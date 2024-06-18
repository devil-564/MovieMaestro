import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if(count == 0)
        navigate('/landing')

      setCount(count - 1);
    }, 1000);
  },[count])

  return (
    <h1 style={{width : "100%", height : "100vh", display : 'flex', justifyContent : "center", alignItems : "center", fontFamily : "Bebas Neue sans-serif"}}>
        Payment is unfortunately canceled
        You will be redirected to the landing page after {count}
    </h1>
  )
}

export default Cancel
