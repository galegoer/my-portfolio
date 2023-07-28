import { useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import Project from './Project';


function Projects(props) {

    const projectsRef = useRef(null);
    // TODO: Change from literal
    const projects = ["1", "2", "3", "4", "5"];

    useEffect(() => {
        projectsRef.current.addEventListener('mousemove', onMouseMove);
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

    return (
        <div ref={projectsRef} className='project-page'>
            <h3 className='txt-box mb-4'>Projects</h3>
            {projects.map(projName => (
                <Project name={projName} />
            ))}
        </div>
    )
}

export default Projects;