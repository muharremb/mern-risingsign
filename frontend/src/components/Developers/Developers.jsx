import DevCard from './DevCard';
import './Developers.css';

function Developers() {

    const clarence = {
        photo: "https://trnkt-dev.s3.amazonaws.com/ProfilePic.png",
        role: "Flex Developer",
        job_description: "Support frontend and backend developers with sticky bugs and weird ideas.",
        name: "Clarence Smith",
        blurb: "A passionate techie and gamer, I wrote my first code on the TI-82 calculator. I hope you'll check out my game, Interceptor, and send me some feedback!",
        github: "https://github.com/siegetheday90",
        linkedIn: "https://linkedin.com/in/clarence-smith-nyc",
        project_1: {
            name: "Interceptor (Game)",
            link: "https://siegetheday90.github.io/Interceptor/"
        },
        project_2: {
            name: "Trnkt (E-commerce)",
            link: "https://trnkt-2022.herokuapp.com/"
        }
    };
    const muharrem = {
        photo: "https://trnkt-dev.s3.amazonaws.com/muharremBoztepeProfile.jpg",
        role: "Backend Developer",
        job_description: "Build the backend structure in Express.js.",
        name: "Muharrem Boztepe",
        blurb: "I am a trader-turned-software-engineer who is intellectually curious and enjoys problem solving.",
        github: "https://github.com/muharremb",
        linkedIn: "https://www.linkedin.com/in/muharremboztepe/",
        project_1: {
            name: "Cakeman (Game)",
            link: "https://muharremb.github.io/singlePageAppJS/"
        },
        project_2: {
            name: "Mebook (Social Media)",
            link: "https://mebook-2022.herokuapp.com/"
        }
    };
    const ben = {};
    const dan = {};
    

    return (

                
        <div id="developers">
            <p className="heading" >Development Team</p>
            <div id="dev-card-container">
                {/* <DevCard dev={ben}/>
                <DevCard dev={dan}/> */}
                <DevCard dev={muharrem}/>
                <DevCard dev={clarence}/>
                <DevCard dev={muharrem}/>
                <DevCard dev={clarence}/>
            </div>
        </div>
    )
}

export default Developers;