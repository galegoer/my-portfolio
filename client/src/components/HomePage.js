import { useRef } from 'react';
import '../styles/HomePage.css';
import MatrixBackground from './Matrix';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import AboutMe from './AboutMe';
import Projects from './Projects';
import SiteFeatures from './SiteFeatures';


function HomePage(props) {

    const hackerRef = useRef(null);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    const onMouseOver = (e) => {
      let iterations = 0;
      const interval = setInterval(() => {
        e.target.innerText = e.target.innerText.split("")
        .map((letter, index) => {
          if(index < iterations) {
            return e.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");

        if(iterations >= e.target.dataset.value.length) clearInterval(interval);
        
        iterations += 1 / 3;
      }, 30);
    }

    return (
      <AwesomeSlider className="awsBtn" animation="cubeAnimation" fillParent={true} bullets={false} mobileTouch={true} buttons={true}>
        {/* Section 1 */}
        <div>
          <MatrixBackground />
          <div ref={hackerRef} onMouseMove={onMouseOver} data-value="ERIC GALEGO" className='hacker-txt'>ERIC GALEGO</div>
        </div>
        {/* Section 2 */}
        <div className='temp'>
          <AboutMe />
        </div>
        {/* Section 3 */}
        <div className='temp'>
          <Projects />
        </div>
        {/* Section 4 */}
        <div className='temp'>
          <SiteFeatures />
        </div>
      </AwesomeSlider>
    );
}

export default HomePage;