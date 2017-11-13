import React from 'react';

import observerMenu from './../utils/observer';

let SingleChar = (props) => {
    return (
        <div onClick={()=> observerMenu.executeObserver('changeFocus', {id: props.params.id})} className ="roster-grid">
            <img className="roster-img" alt='character' src={props.params.url} />
        </div>
    );
};

export default SingleChar;