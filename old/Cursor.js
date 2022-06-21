import React, { useState } from 'react';
export default function Cursor() { 

  const [MousePosition, setMousePosition] = useState({
      left: 0,
      top: 0
  })

  function handleMouseMove(ev) { setMousePosition({left: ev.pageX, top: ev.pageY}); }

  return (
    <div 
      onMouseMove={(ev)=> handleMouseMove(ev)}
      style={{left:MousePosition.left , top: MousePosition.top, backgroundColor: "red"}}
    > </div>
  )

}