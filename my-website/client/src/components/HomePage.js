import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from 'react-scroll-motion';
import NavBar from './NavBar';
import Paper from '@mui/material/Paper';
import TerminalIcon from '@mui/icons-material/Terminal';


function HomePage(props) {
    
    // const [vidIds, setVidIds] = useState([]); // maybe add default video?
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());

    // useEffect(() => {
    //     provideVid();
    // }, []);

    // async function provideVid() {

    // }
    
    return (
      <>
        <NavBar />

        <ScrollContainer>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
              <div className='d-flex flex-column align-items-center text-center'>
                <img height="200" width="200" src="memoji-thumbs-up.png" alt="memoji"/>
                <div className='d-block' style={{fontSize: "30px"}}>
                  <span>Hello, Welcome to my Page! 😀 
                  I'm Eric a recent University of Toronto Computer Science Specialist graduate!
                  Note this page is still under construction 🚧 Many new features are TBD... </span>
                </div>
                <div className='d-flex justify-content-around w-100'>
                  <img height="100" src="uoft-logo.png" alt="uoft-logo"/>
                  <TerminalIcon style={{ fontSize: 100 }} />
                </div>
              </div>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={ZoomInScrollOut}>
              <span style={{ fontSize: "40px" }}>Here I'll show some of my projects, some games and resources I've found useful throughout the years. </span>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={FadeUp}>
                <span className="d-flex justify-content-center" style={{ fontSize: "40px" }}>Some of my Skills ✨</span>
                <div className="skills-area">
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" /></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg" alt="Java"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="React"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="HTML5"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" alt="Firebase"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg" alt="Django"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" alt="Docker"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="CSS3"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" alt="NodeJS"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL"/></Paper>
                  <Paper sx={{'backgroundColor': 'lightgrey'}} className="skills-child" elevation={3}><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain-wordmark.svg" alt="Ubuntu"/></Paper>
                </div>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
              <span style={{ fontSize: "40px" }}>
                <Animator animation={MoveIn(-1000, 0)}>Interests TBD 👋🏻</Animator>
                <Animator animation={MoveIn(1000, 0)}>Hello Temp Text 🙋🏻‍♀️</Animator>
                <Animator animation={MoveOut(1000, 0)}>Good bye Temp Text ✋🏻</Animator>
                <Animator animation={MoveOut(-1000, 0)}>See you</Animator>
              </span>
            </div>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky())}>
              <span style={{ fontSize: "40px" }}>That's It... For Now</span>
              <br/>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </>
    );
}

export default HomePage;