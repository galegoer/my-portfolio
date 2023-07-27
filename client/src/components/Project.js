import projectInfo from '../information/AboutMe.json';
import { RiArrowRightUpLine } from 'react-icons/ri'

function Project(props) {
    
    const tags = projectInfo[props.name]["tags"];
    const highlights = projectInfo[props.name]["highlights"];
    
    return (
        <div className='project-hover home-card skills-child'>
            <div className='d-flex'>
                <img className="project-img w-50" width="200" height="48" alt={props.name} src={projectInfo[props.name]["imageUrl"]}></img>
                <div className='flex-column w-50 p-5'>
                    <div className='project-name'>
                        <a target="_blank" href={projectInfo[props.name]["projectUrl"]} rel="noreferrer">{projectInfo[props.name]["name"]}</a>
                        <RiArrowRightUpLine className='project-arrow' />
                    </div>
                    <div>
                        {projectInfo[props.name]["info"]}
                    </div>
                </div>
            </div>
            <div className="project-txt">
                <span className="fw-bold">Highlights</span>
                <ul>
                    {highlights.map(highlight => (
                        <li className='project-highlight'>{highlight}</li>
                    ))}
                </ul>
            </div>
            <div className="project-tags d-flex flex-wrap">
                {tags.map(tag => (
                    <span className='project-tag'>{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default Project;