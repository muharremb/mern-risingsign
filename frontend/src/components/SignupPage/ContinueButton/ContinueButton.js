import './ContinueButton.css';

const ContinueButton = (props) => {
   const text = props.text;

   return (
      <button type="submit" value={text ? text : "Continue"}></button>
   )
}

export default ContinueButton;