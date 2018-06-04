import React from 'react';
import Block from './Block';
import { V } from '../../maps/index';

const Blocks = ({ data, map }) => (
    <div className="blocks">
        {data.map((b, i) => <Block key={i} {...b} placed={map[b.y][b.x] === V} />)}
    </div>
);

export default Blocks;
