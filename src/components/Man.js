import React from 'react';

const Man = ({ x, y, direction }) => (
    <div className={'move-pos ' + direction} style={{ top: 'calc(' + y * 5 + 'vh - 32px)', left: x * 5 + 'vw' }}>
        <div id="man" />
    </div>
);

export default Man;