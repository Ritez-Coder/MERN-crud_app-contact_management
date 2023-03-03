import React from 'react'
import { useNavigate } from 'react-router-dom'
function Error404() {
     const navigate = useNavigate();
     return (
          <div className='error-page'>
               <img className='dog-img' src="/img.webp" alt="" width={600} />

               <div>
                    <h1 style={{ color: "black" }}>(404) NOT FOUND</h1>
                    <div onClick={() => {
                         navigate("/")
                    }} style={{ color: "green", cursor: "pointer" }}>Back to Home</div>

               </div>
          </div>
     )
}

export default Error404
