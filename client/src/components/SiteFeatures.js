import { useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import SiteFeature from './SiteFeature';


function SiteFeatures(props) {

    const siteFeaturesRef = useRef(null);
    // TODO: Change from literal
    // TODO: Refactor, repetitive code with projects
    const siteFeatures = ["1", "2", "3", "4"];

    useEffect(() => {
        siteFeaturesRef.current.addEventListener('mousemove', onMouseMove);
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
        <div ref={siteFeaturesRef} className='project-page'>
            <h3 className='txt-box mb-4'>Site Features</h3>
            {siteFeatures.map(siteFeature => (
                <SiteFeature name={siteFeature} />
            ))}
        </div>
    )
}

export default SiteFeatures;