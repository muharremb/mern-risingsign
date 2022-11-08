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
    const dan = {
        photo: "https://mern-rising-sign-profile-pics.s3.amazonaws.com/dan_prof_pic.jpg",
        role: "Frontend Developer",
        job_description: "Construct frontend component structures and make the CSS look good.",
        name: "Dan Lay",
        blurb: "In love with electronic soundscapes, classical instruments, and using technology to blur the lines of both. Tater tots are the best snack, period. Always looking for productive input to help me become a better programmer :).",
        github: "https://github.com/dan-lay",
        linkedIn: "www.linkedin.com/in/dan-lay",
        project_1: {
           name: "stepSeq (Music Gadget)",
           link: "https://dan-lay.github.io/stepSeq/"
        },
        project_2: {
           name: "BooooTube (YouTube Clone)",
           link: "https://booootube.herokuapp.com/"
        }
    };    
    const ben = {
        photo: "https://rising-sign-profile-pics-schwartz.s3.amazonaws.com/Rising_Schwartz_Prof.png",
        role: "Project Lead",
        job_description: "Envision application from experiential standpoint and work on chat feature.",
        name: "Benjamin Schwartz",
        blurb: "I am interested in the notion of \"romantic engineering,\" building technology that supports individual and collective emotional expression.",
        github: "https://github.com/bwschwartz",
        linkedIn: "https://www.linkedin.com/in/benjamin-schwartz-b98622255/",
        project_1: {
            name: "Synth Site (Modular Synth)",
            link: "https://bwschwartz.github.io/synth_site/"
        },
        project_2: {
            name: "Slick (Slack Clone)",
            link: "https://slick-slack-clone-one.herokuapp.com/"
        }
    };
    
    return (

        <>
        <div id="developers">
            <p className="heading" >Development Team</p>
            <div id="dev-card-container">
                <DevCard dev={ben}/>
                <DevCard dev={muharrem}/>
                <DevCard dev={dan}/>
                <DevCard dev={clarence}/>
            </div>
        </div>
            <Link className="home-link" to={'/'}>Rising Sign</Link>
        </>     
        
    )
}

export default Developers;