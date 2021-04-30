import React from 'react';
import {render, screen} from '@testing-library/react';
import Draggable from '../components/Draggable';

test('should render header', () => {
    render(
        <Draggable id={'d1'} zIndexOndrag={100} zIndex={10} className={'draggable-item'} title={'Header'}>
            <ul>
                <li>One <span style={{float: 'right'}}>.</span></li>
                <li>Two <span style={{float: 'right'}}>.</span></li>
                <li>three <span style={{float: 'right'}}>.</span></li>
            </ul>
        </Draggable>
    );
    const header = screen.getByText(/Header/i);
    expect(header).toBeInTheDocument();
});
