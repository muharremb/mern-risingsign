import './ContinueButton.css';

const ContinueButton = (props) => {
   const disabled = props.disabled;
   const text = props.text;
   const handleClick = props.handleClick;
   const type = props.type;
   // debugger
   return (
      <input className='continue-button' disabled={disabled} type={type} onClick={handleClick ? e => handleClick(e) : () => null} value={text ? text : "Continue"}/>
   )
}

export default ContinueButton;