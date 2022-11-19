import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, memo} from 'react';
import './MatchedModal.css'

function MatchedModal(props){
    const profUrl = props.profUrl

    const closeModal = () => {
        // console.log("exiting from modal")
        document.getElementById('matched-modal').close();
    }

    useEffect(() => {
        console.log("modal component rendering first time")
        // console.log("there is a user", user)
    }, [])

    return (
        // { }
        <dialog id="matched-modal">
       {/* { console.log("user in modal is", user) } */}
            <div id="matched-modal-contents">
          {/* <h1>{profUrl}</h1> */}
          <img src={profUrl}></img>
            {/* <h1>{ document.getElementById('matched-modal').classList}</h1> */}
                <h1>You matched!</h1>
                <Link to="/matches">Go to Matches Page to Chat</Link>
                <button onClick={closeModal}>Stay Here</button>
            </div>
        </dialog>
    )
}

export default memo(MatchedModal);