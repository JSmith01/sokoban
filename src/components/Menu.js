import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        onExit: PropTypes.func,
        horizontal: PropTypes.bool,
        inactive: PropTypes.bool
    }

    state = {
        position: 0
    };

    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
    }

    keyHandler(e) {
        if (!!this.props.inactive) {
            return;
        }

        let key = e.keyCode;
        const limit = v => Math.max(0, Math.min(v, this.props.children.length - 1));
        let keyShift = !this.props.horizontal ? 0 : -1;
        let move = 1;

        switch(key) {
            case (38 + keyShift):
                move = -1; // eslint-disable-next-line
            case (40 + keyShift):
                this.setState({ position: limit(this.state.position + move) });
                break;
            case 13:
                this.props.onSelect(this.state.position);
                break;
            case 27:
                if (this.props.onExit) {
                    this.props.onExit();
                }
                break;
            default:
        }
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this.keyHandler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.keyHandler);
    }

    render() {
        return (
            <ul className="menu">
                {this.props.children.map((child, i) => (
                        <li key={i} className={i === this.state.position ? 'selected' : ''}>{child}</li>
                    ))}
            </ul>
        );
    }
}

export default Menu;