import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        onExit: PropTypes.func,
        horizontal: PropTypes.bool,
        inactive: PropTypes.bool
    };

    wrapper = null;

    els = [];

    state = {
        position: 0,
        scroll: 0,
    };

    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
    }

    keyHandler(e) {
        if (this.props.inactive) {
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
                e.preventDefault();
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
        this.setState(({ position, scroll }) => ({ scroll: scroll + this.calculateScroll(position) }));
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.keyHandler);
    }

    calculateScroll(position) {
        if (this.wrapper && this.els[position]) {
            let selectionBox = this.els[position].getBoundingClientRect();
            let wrapperBox = this.wrapper.getBoundingClientRect();
            if (selectionBox.top < wrapperBox.top) {
                return wrapperBox.top - selectionBox.top;
            }
            if (selectionBox.bottom > wrapperBox.bottom) {
                return wrapperBox.bottom - selectionBox.bottom;
            }
        }

        return 0;
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.position !== nextState.position) {
            this.setState({ scroll: nextState.scroll + this.calculateScroll(nextState.position) });
        }
    }

    render() {
        return (
            <div className="menu-wrapper" ref={wrapper => this.wrapper = wrapper}>
                <ul className="menu" style={{transform: 'translateY(' + this.state.scroll + 'px)'}}>
                    {this.props.children.map((child, i) => (
                            <li key={i}
                                className={i === this.state.position ? 'selected' : ''}
                                ref={el => this.els[i] = el}>
                                {child}
                            </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Menu;