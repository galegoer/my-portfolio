function HomeCard(props) {
    
    return (
        <div className="home-card skills-child">
            <div className="card-content">
                <div className="card-image">
                    {/* <i className="fa-duotone fa-apartment"></i> */}
                    <img src={props.src} alt={props.alt} />
                </div>
                {/* <div className="card-info-wrapper">
                        <div className="card-info">
                            <div className="card-info-title">
                                <h3>{props.title}</h3>  
                                <h4></h4>
                            </div>    
                        </div>
                    </div> */}
            </div>
      </div>
    );
}

export default HomeCard;