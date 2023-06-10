  import React from "react"

const Button = ({ text, clickEvent, classNa }) => {
    return (
      <button
      onClick={clickEvent}  className={`${classNa}`}>
        {text}
      </button>
    )
    
}
  
  export default Button