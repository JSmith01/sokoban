import React from 'react';
import { connect } from 'react-redux';
import { setRadio } from "../actions";

const RadioPlayer = ({ radio, onStop }) => (
    radio ?
        <div className="radio-player">
            <div onClick={onStop}>Radio playing: {radio.name}</div>
            <audio src={radio.url} autoPlay={true} />
        </div> :
        <div className="radio-player">
            <div>Radio stopped</div>
        </div>
);


const mapStateToProps = state => ({ radio: state.radio });

const mapDispatchToProps = dispatch => ({ onStop: () => dispatch(setRadio(null)) });

export default connect(mapStateToProps, mapDispatchToProps)(RadioPlayer);