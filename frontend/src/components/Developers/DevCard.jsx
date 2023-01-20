import './Developers.css'

function DevCard({dev}){
        
    return (

        <div className="dev-card">
            <h2>{dev.name}</h2>
            <img src={dev.photo} alt="Developer"/>
            <h3>{dev.role}</h3>
            <p className="job-description">{dev.job_description}</p>
            <p>{dev.blurb}</p>
            <div className="dev-card-bottom">
                <div className="dev-card-bottom-div">
                    <h3>Projects</h3>
                    <a href={dev.project_1.link}>
                        <div>{dev.project_1.name}</div>
                    </a>            
                    <a href={dev.project_2.link}>
                        <div>{dev.project_2.name}</div>
                    </a>
                </div>
                <div className="dev-card-bottom-div">
                    <h3>Contact</h3>
                    <a href={dev.linkedIn}>LinkedIn</a>
                    <a href={dev.github}>Github</a>
                </div>
            </div>
        </div>        
    )
}

export default DevCard;