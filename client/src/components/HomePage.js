import TerminalIcon from '@mui/icons-material/Terminal';
import { useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import HomeCard from './HomeCard';


function HomePage(props) {

    const hiddenElsRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
      const hiddenEls = hiddenElsRef.current.querySelectorAll(".hidden");
      hiddenEls.forEach((el) => observer.observe(el));

      cardsRef.current.addEventListener('mousemove', onMouseMove);
      return () => {
        cardsRef.current.removeEventListener('mousemove', onMouseMove);
      };
    }, []);

    const onMouseMove = (e) => {
      const cards = cardsRef.current.querySelectorAll('.home-card');
      for(const card of cards) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      })
    })
    
    return (
      <div ref={hiddenElsRef} className="mx-10">
        <section className='hidden'>
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
        </section>
        <section className='hidden'>
          <span style={{ fontSize: "40px" }}>Here I'll show some of my projects, some interests of mine, as well as some resources I've found useful throughout the years. </span>
        </section>
        <section className='hidden'>
          {/* <div className="skills-area"> */}
          <span className="d-flex justify-content-center" style={{ fontSize: "40px" }}>Some of my Skills ✨</span>
            <div ref={cardsRef} id='cards'>
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" title="Python" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg" alt="java" title="Java" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" title="JavaScript" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="jenkins" title="Jenkins" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="react" title="React" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="HTML5" title="HTML5" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" alt="firebase" title="Firebase" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg" alt="django" title="Django" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" alt="docker" title="Docker" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="css" title="CSS" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" title="C" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="bash" title="Bash / Scripting" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" title="NodeJS" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" title="PostgreSQL" />
              <HomeCard src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain-wordmark.svg" alt="ubuntu" title="Ubuntu" />
            </div>
        </section>
        <section className='hidden'>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
            <span style={{ fontSize: "40px" }}>
              <span>Interests TBD 👋🏻</span>
              <span>Resources TBD 🙋🏻‍♀️</span>
              <span>Projects TBD ✋🏻</span>
              <span>See you</span>
            </span>
          </div>
        </section>
        <section className='hidden'>
          <span style={{ fontSize: "40px" }}>That's It... For Now</span>
        </section>
      </div>
    );
}

export default HomePage;