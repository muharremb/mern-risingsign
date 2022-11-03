import { Link } from 'react-router-dom';
import './Developers.css'

function DevButton(){
        
    return (
        <Link to="/developers">
            <div id="dev-button" className="pulse">
                <span>Meet the Devs</span>
            </div>
        </Link>    
    )
}

export default DevButton;