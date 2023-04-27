import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from 'react-scroll-motion';
import Paper from '@mui/material/Paper';
import TerminalIcon from '@mui/icons-material/Terminal';
import { useEffect, useRef } from 'react';
import '../styles/HomePage.css';


function HomePage(props) {

    const track = useRef(null);
    const blob = useRef(null);
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());

    useEffect(() => {
      window.addEventListener("mousedown", handleOnDown);
      // window.addEventListener("touchstart", handleOnDown);
      window.addEventListener("mouseup", handleOnUp);
      // window.addEventListener("touchend", handleOnUp);
      window.addEventListener("mousemove", handleOnMove);
      // window.addEventListener("touchmove", handleOnMove);

      window.addEventListener("pointermove", followPointer);
      
      // window.onmousedown = e => handleOnDown(e);
      // window.ontouchstart = e => handleOnDown(e.touches[0]);
      // window.onmouseup = e => handleOnUp(e);
      // window.ontouchend = e => handleOnUp(e.touches[0]);
      // window.onmousemove = e => handleOnMove(e);
      // window.ontouchmove = e => handleOnMove(e.touches[0]);
    }, []);

    const followPointer = (e) => {
      const { clientX, clientY } = e;
        
        blob.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 3000, fill: "forwards" });
    }

    const handleOnDown = (e) => {
      const currTrack = track.current;
      currTrack.dataset.mouseDownAt = e.clientX;
    }

    const handleOnUp = (e) => {
      const currTrack = track.current;
      currTrack.dataset.mouseDownAt = "0";  
      currTrack.dataset.prevPercentage = currTrack.dataset.percentage;
    }

    const handleOnMove = (e) => {
      const currTrack = track.current;

      if(currTrack.dataset.mouseDownAt === "0") return;
        const mouseDelta = parseFloat(currTrack.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
        const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(currTrack.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
        currTrack.dataset.percentage = nextPercentage;
        
        currTrack.animate({
          transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
        
        for(const image of currTrack.getElementsByClassName("image")) {
          image.animate({
            objectPosition: `${100 + nextPercentage}% center`
          }, { duration: 1200, fill: "forwards" });
        }
    }
    
    return (
      <>
        <div id="blob" ref={blob}></div>
        <div id="blur"></div>
        <div id="image-track" ref={track} data-mouse-down-at="0" data-prev-percentage="0">
          <img class="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" draggable="false" />
          <img class="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
        </div>
      </>

      // <>
      //   <ScrollContainer>
      //     <ScrollPage>
      //       <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      //         <div className='d-flex flex-column align-items-center text-center'>
      //           <img height="200" width="200" src="memoji-thumbs-up.png" alt="memoji"/>
      //           <div className='d-block' style={{fontSize: "30px"}}>
      //             <span>Hello, Welcome to my Page! 😀 
      //             I'm Eric a recent University of Toronto Computer Science Specialist graduate!
      //             Note this page is still under construction 🚧 Many new features are TBD... </span>
      //           </div>
      //           <div className='d-flex justify-content-around w-100'>
      //             <img height="100" src="uoft-logo.png" alt="uoft-logo"/>
      //             <TerminalIcon style={{ fontSize: 100 }} />
      //           </div>
      //         </div>
      //       </Animator>
      //     </ScrollPage>
      //     <ScrollPage>
      //       <Animator animation={ZoomInScrollOut}>
      //         <span style={{ fontSize: "40px" }}>Here I'll show some of my projects, some games and resources I've found useful throughout the years. </span>
      //       </Animator>
      //     </ScrollPage>
      //     <ScrollPage>
      //       <Animator animation={FadeUp}>
      //           <span className="d-flex justify-content-center" style={{ fontSize: "40px" }}>Some of my Skills ✨</span>
      //           <div className="skills-area">
      //             {/* TODO: Could change to react-icons */}
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" /></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg" alt="Java"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="React"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="HTML5"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" alt="Firebase"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg" alt="Django"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" alt="Docker"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="CSS3"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" alt="NodeJS"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL"/></Paper>
      //             <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child card" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain-wordmark.svg" alt="Ubuntu"/></Paper>
      //           </div>
      //       </Animator>
      //     </ScrollPage>
      //     <ScrollPage>
      //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      //         <span style={{ fontSize: "40px" }}>
      //           <Animator animation={MoveIn(-1000, 0)}>Interests TBD 👋🏻</Animator>
      //           <Animator animation={MoveIn(1000, 0)}>Hello Temp Text 🙋🏻‍♀️</Animator>
      //           <Animator animation={MoveOut(1000, 0)}>Good bye Temp Text ✋🏻</Animator>
      //           <Animator animation={MoveOut(-1000, 0)}>See you</Animator>
      //         </span>
      //       </div>
      //     </ScrollPage>
      //     <ScrollPage>
      //       <Animator animation={batch(Fade(), Sticky())}>
      //         <span style={{ fontSize: "40px" }}>That's It... For Now</span>
      //         <br/>
      //       </Animator>
      //     </ScrollPage>
      //   </ScrollContainer>
      // </>
    );
}

export default HomePage;