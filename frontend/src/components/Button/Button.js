import './Button.css';

const Button = (props) => {
   const disabled = props.disabled;
   const text = props.text;
   const handleClick = props.handleClick;
   const type = props.type;
   // debugger
   return (
      <input className='button' disabled={disabled} type={type} onClick={handleClick ? e => handleClick(e) : () => null} value={text}/>
   )
}

export default Button;