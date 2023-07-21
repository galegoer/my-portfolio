function Project() {
    
    
    return (
        <div className="d-flex project-hover">
            <img alt="Project title" src="../images/motm-ui.png"></img>
            <h3>
                <a href="https://github.com/apps-of-the-millennium/motm">Project Title</a>
            </h3>
            <span className="project-txt">
                Info about this project blah blah blah.
            </span>
            <div className="tags">
                <span>Tag1</span>
                <span>Tag2</span>
                <span>Tag3</span>
            </div>
        </div>
    );
}

export default Project;