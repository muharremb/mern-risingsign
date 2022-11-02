import './BackButton.css';

const BackButton = (props) => {
   const handleClick = props.handleClick;
   const type = props.type;

   return (
      <input className='back-button' type={type} onClick={handleClick ? e => handleClick(e) : () => null} value="Back"/>
   )
}

export default BackButton;