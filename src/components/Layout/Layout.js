import React from 'react';

const layout = (props) => {
    return(
        <div id="layoutSidenav">
            {props.children}
        </div>
    );
}

export default layout;
