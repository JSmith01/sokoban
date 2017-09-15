import React from 'react';
import {withRouter} from 'react-router-dom';
import Menu from './Menu';
import genres from '../radio/genres.json';
import radios from '../radio/radios.json';
import { connect } from 'react-redux';
import { setRadio } from '../actions';

const RadioContainer = ({ setRadio, radio, match, history }) => {
    let genreId = +match.params.id;
    let genre = genres.find(g => g.id === genreId);
    if (!genre) {
        return <h1>No radio with this id</h1>;
    }

    return (
        <div>
            <RadioGenre genre={genre}
                        onEnter={newRadio => setRadio(radio !== newRadio ? newRadio : null)}
                        onExit={() => history.push('/radio')}/>
        </div>
    );
};


const RadioGenre = ({ genre, onEnter, onExit }) => {
    let radiosList = genre.stations.map(id => radios[id]);
    return (
        <div>
            <h1>{genre.name}</h1>
            <Menu onSelect={pos => onEnter(radiosList[pos])} onExit={onExit}>
                {radiosList.map(radio => <span key={radio.id}>{radio.name} ({radio.genre})</span>)}
            </Menu>
        </div>
    );
};

const mapStateToProps = state => ({ radio: state.radio });

const mapDispatchToProps = dispatch => ({ setRadio: radio => dispatch(setRadio(radio)) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RadioContainer));