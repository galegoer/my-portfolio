import React from 'react';
import CanvasDraw from "react-canvas-draw";
import { useRef, useState } from "react";

function CanvasPage() {

  const saveableCanvas = useRef(null);
  // const [color, setColor] = useState('black');

  // need to set background as white for it to be detected
  const [whiteBg] = useState(JSON.stringify({
    "lines":[
      {"points":[{"x":196.35038302288189,"y":258.61806842460453},{"x":196.35038302288189,"y":258.61806842460453},{"x":196.35038302288189,"y":258.61806842460453},{"x":196.35038302288189,"y":258.61806842460453},{"x":196.35038302288189,"y":258.61806842460453},{"x":196.36331590512356,"y":258.5937619576129},{"x":199.1263987407861,"y":256.07831669919403},{"x":201.83550448415522,"y":254.37832508644482},{"x":205.05818593232632,"y":252.92713962745714},{"x":206.78526089296392,"y":252.26961669955463},{"x":209.3053785045838,"y":251.68994945657894},{"x":211.2250035055169,"y":251.3128894385402},{"x":213.16565777696036,"y":250.98704407298405},{"x":214.14128497676722,"y":250.8359950974208},{"x":215.1204814006167,"y":250.69618331760054},{"x":217.08861688047523,"y":250.45566211048447},{"x":218.07554584753015,"y":250.34439323326333},{"x":221.00319367086473,"y":250.2768355129317},{"x":225.00179651457026,"y":250.20763699627335},{"x":229.0146912613655,"y":250.4063886459886},{"x":232.0672852689885,"y":250.73101649013796},{"x":232.0672852689885,"y":250.73101649013796}],"brushColor":"white","brushRadius":450}],
      "width":400,
      "height":400
  }));

  const setCanvasRef = (canvasDraw) => {
    saveableCanvas.current = canvasDraw;
    clearCanvas();    
  };

  const clearCanvas = () => {
    saveableCanvas.current.eraseAll();
    saveableCanvas.current.loadSaveData(whiteBg, false);
  };

  return (
    <>

      <div class="d-flex flex-column align-items-center justify-content-center text-center" style={{fontFamily: 'Playfair Display'}}>
        <h2 class="w-75 text-center">
          Draw a number using the canvas and the number that you drew will be guessed by a convolutional neural network for handwritten digit classification.
          {/* Can maybe add more info here summary */}
        </h2>
        <h4 class="w-50 text-center">
          Note: If the canvas shows grid lines there will be an issue with detection, please click clear canvas which ensures a white background and the ability to detect the number being written.
        </h4>
      </div>
      <CanvasDraw className='mx-auto border border-dark'
        ref={setCanvasRef} 
        onChange={() => console.log("onChange")}
        brushColor={'black'}
        brushRadius={15}
      />

      <div className='d-flex justify-content-center'>

        {/* <button onClick={() => {
        localStorage.setItem(
          "savedDrawing",
          saveableCanvas.current.getSaveData()
        );
        }}>Save</button> */}

        <button onClick={clearCanvas}>Clear Canvas</button>

        <button onClick={() => {
          saveableCanvas.current.undo();
        }}>Undo</button>

        <button onClick={() => {
          console.log(saveableCanvas.current.getDataURL());
          alert("DataURL written to console")
        }}>GetDataURL</button>

        <button disabled onClick={() => {
          // TODO: add call to send to python script running the number checker
        }}>Guess my number</button>

        {/* <button onClick={() => {
          setColor((curr) => {
            console.log(curr);
            if(curr === 'white') {
              return 'black';
            }else{
              return 'white';
            }
          });
        }}>Change Color</button> */}
      </div>

    </>
  );
}

export default CanvasPage;