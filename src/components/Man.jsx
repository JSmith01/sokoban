import React from 'react';

const Man = ({ x, y, direction }) => (
    <div className={'move-pos ' + direction} style={{ top: (y - 1) * 32 + 'px', left: x * 32 - 16 + 'px' }}>
        <div id="man" />
    </div>
);

export default Man;