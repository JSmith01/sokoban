import React from 'react';

const Block = ({ x, y, placed }) => (
    <div className={'block' + (placed ? ' placed': '')} style={{ top: y * 32 + 'px', left: x * 32 + 'px' }} />
);

export default Block;
