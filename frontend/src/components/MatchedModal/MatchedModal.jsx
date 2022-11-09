import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './MatchedModal.css'

function MatchedModal({user}){

    const closeModal = () => {
        document.getElementById('matched-modal').close();
    }

    return (

        <dialog id="matched-modal">
            <div id="matched-modal-contents">
                <h1>You matched!</h1>
                <Link to="/matches">Go to Matches Page to Chat</Link>
                <button onClick={closeModal}>Stay Here</button>
            </div>
        </dialog>
    )
}

export default MatchedModal;