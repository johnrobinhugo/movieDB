import React from 'react';

function Like(props) {

  const isLiked = props.likeStatus;

  return <button type="button" className={`button--like ${isLiked ? "button--like-active" : ""}` } onClick={props.sendLikeStatus}></button>
}

export default Like;