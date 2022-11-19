import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, memo, useContext} from 'react';
import {ChatContext} from '../../context/chatContext'
import './MatchedModal.css'

function MatchedModal(props){
    const profUrl = props.profUrl
    const modal = document.getElementById('matched-modal')

    const {setActivateModal} = useContext(ChatContext)

    const closeModal = () => {
        // console.log("exiting from modal")
        document.getElementById('matched-modal').close();
        // props.modalFunc(false)
    }
    window.onclick = function(event) {
        if (event.target == modal) {
        document.getElementById('matched-modal').close();

        }
      }

    useEffect(() => {
        console.log("modal component rendering first time")
        // console.log("there is a user", user)
    }, [])

    return (
        // { }
        <dialog id="matched-modal">
            <div id="matched-modal-contents">
          <img className="modal-pic" src={profUrl}></img>
                <h1>You matched with {props.name}!</h1>
                <Link to="/matches">Go to Matches Page to Chat</Link>
                {/* <button onClick={closeModal}>Stay Here</button> */}
            </div>
        </dialog>
    )
}

export default memo(MatchedModal);