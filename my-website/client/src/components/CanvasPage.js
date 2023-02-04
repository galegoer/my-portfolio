import React from 'react';
import CanvasDraw from "react-canvas-draw";
import { useRef, useState } from "react";

function CanvasPage() {
  
  const saveableCanvas = useRef(null);
  const [color, setColor] = useState('white');

  const setCanvasRef = (canvasDraw) => {
    saveableCanvas.current = canvasDraw;
  };

  return (
    <>
      <CanvasDraw className='mx-auto border border-dark'
        ref={setCanvasRef} 
        onChange={() => console.log("onChange")}
        brushColor={color}
        brushRadius="15"
      />
      {/* <button onClick={() => {
        localStorage.setItem(
          "savedDrawing",
          saveableCanvas.current.getSaveData()
        );
      }}>Save</button> */}
      <div className='d-flex justify-content-center'>
        <button onClick={() => {
          saveableCanvas.current.eraseAll();
        }}>Clear Canvas</button>

        <button onClick={() => {
          saveableCanvas.current.undo();
        }}>Undo</button>

        <button onClick={() => {
          console.log(saveableCanvas.current.getDataURL());
          alert("DataURL written to console")
        }}>GetDataURL</button>

        <button onClick={() => {
          setColor((curr) => {
            console.log(curr);
            if(curr === 'white') {
              return 'black';
            }else{
              return 'white';
            }
          });
        }}>Change Color</button>
      </div>

    </>
  );
}

export default CanvasPage;