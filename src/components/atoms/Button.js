import React from 'react';

function Button(props) {
  return <button type="button" disabled={props.isDisabled ? true : false} onClick={props.sendData}>{props.buttonText}</button>
}

export default Button;