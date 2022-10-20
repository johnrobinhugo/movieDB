import React from 'react';

function Pagination(props) {
  return (
    <div className="pagination">
      <button type="button" onClick={props.goBack} disabled={props.disableBackButton ? true : false}>Older</button>
      <button type="button" onClick={props.goForward}>Newer</button>
    </div>
  )
}

export default Pagination;