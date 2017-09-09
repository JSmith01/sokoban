import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Menu from './Menu';
import genres from '../radio/genres.json';
import radios from '../radio/radios.json';

const RadioPlayer = ({ radio, onStop }) => (
    radio ?
        <div>
            <div onClick={onStop}>Radio playing: {radio.name}</div>
            <audio src={radio.url} autoPlay={true} />
        </div> :
        <div>
            <div>Radio stopped.</div>
        </div>
);

class RadioContainer extends Component {
    state = { radio: null };

    render() {
        let genreId = +this.props.match.params.id;
        let genre = genres.find(g => g.id === genreId);
        if (!genre) {
            return <h1>No radio with this id</h1>;
        }

        return (
            <div>
                <RadioPlayer radio={this.state.radio} onStop={() => this.setState({ radio: null})} />
                <RadioGenre genre={genre}
                            onEnter={radio => this.setState({ radio: this.state.radio !== radio ? radio : null })}
                            onExit={() => this.props.history.push('/radio')}/>
            </div>
        );
    }
}

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

export default withRouter(RadioContainer);