import { useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import HomeCard from './HomeCard';
import Contact from './Contact';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';


function AboutMe(props) {

    const hiddenElsRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const hiddenEls = hiddenElsRef.current.querySelectorAll(".hidden");
        hiddenEls.forEach((el) => observer.observe(el));
        
        cardsRef.current.addEventListener('mousemove', onMouseMove);
    }, []);

    const onMouseMove = (e) => {
        const cards = document.querySelectorAll('.home-card');
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
    });

    return (
        <div ref={hiddenElsRef}>
            {/* Section 1 (About Me) */}
            <section className='hidden section'>
                <div className='txt-box'>
                    <img className="memoji" src="memoji-thumbs-up.png" alt="memoji"/>
                    <span>Hello, Welcome to my site! 😀 I'm Eric a recent University of Toronto Computer Science Specialist graduate!
                    My journey into the world of technology and coding began during my high school years when I was first introduced to software development.
                    One of the most rewarding aspects of my coding journey has been the ability to automate tasks and streamline processes in my day-to-day life.
                    Through my work, I strive to contribute positively to the ever-evolving landscape of technology.
                    <br />
                    If you have any questions or would like to collaborate on exciting projects, feel free to reach out through the contact form at the bottom of this page. 
                    Let's build a brighter, more connected future together through the power of technology!
                    </span>
                </div>
            </section>
            {/* Section 2 (Skills) TODO: Refactor */}
            <section className='hidden section'>
                <div className="skills-area">
                    <h3 className="txt-box mb-4">Some of my Skills ✨</h3>
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
                </div>
            </section>
            {/* Section 3 (Contact Me) */}
            <section className='hidden section'>
                <Contact />
            </section>
        </div>
    )
}

export default AboutMe;