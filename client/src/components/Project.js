import projectInfo from '../information/AboutMe.json';

function Project(props) {
    
    const tags = projectInfo[props.name]["tags"];
    
    return (
        <div className="d-flex flex-row project-hover home-card skills-child w-100">
            <img className="project-img" alt={props.name} src={projectInfo[props.name]["imageUrl"]}></img>
            <div className='flex-column'>
                <h3 className='project-name'>
                    <a href={projectInfo[props.name]["projectUrl"]}>{projectInfo[props.name]["name"]}</a>
                </h3>
                <span className="project-txt">
                    {projectInfo[props.name]["info"]}
                </span>
                <div className="project-tags">
                    {tags.map(tag => (
                        <span>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Project;