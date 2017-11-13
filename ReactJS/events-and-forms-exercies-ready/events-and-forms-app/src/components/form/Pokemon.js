import React, { Component } from 'react';
import PokemonField from './formFields/PokemonField';
import Input from './formFields/Input'

class PokemonIndex extends Component {
    constructor() {
        super();

        this.state = {
            pokemonName: '',
            pokemonImg: '',
            pokemonInfo: '',
            data: []
        };
    }

    createPokemon(e) {
        e.preventDefault();
        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo
        }

        this.createPokemonOnServer(payload);

    }

    createPokemonOnServer(payload) {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(d => {
                console.log(d)
                this.setState({data: d.pokemonCollection})
            })
    }

    componentDidMount() {
        console.log('did mount')
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(data => {
                return data.json();
            }).then(parsedData => {
                this.setState({ data: parsedData.pokemonCollection });
            });
    }

    render() {

        let validName = this.state.pokemonName !== '';
        let validImg = this.state.pokemonImg.startsWith('http');
        let validContent = this.state.pokemonInfo.length > 3 && this.state.pokemonInfo.length < 50

        return (

            <div>
                <form onSubmit={this.createPokemon.bind(this)}>
                    <fieldset className='App'>
                        <Input
                            data='pokeName'
                            name='Pokemon Name'
                            func={e => {
                                this.setState({ pokemonName: e.target.value })
                            }}
                            valid={validName}
                        />
                        <Input
                            data='pokeImg'
                            name='Pokemon image'
                            func={e => {
                                this.setState({ pokemonImg: e.target.value })
                            }}
                            valid={validImg}
                        />
                        <Input
                            data='pokeBio'
                            name='Pokemon Info'
                            func={e => {
                                this.setState({ pokemonInfo: e.target.value })
                            }}
                            valid={validContent}
                        />
                        <input
                            style={({ "display": validName && validImg && validContent === true ? '' : 'none' })}
                            type='submit'
                            value='Create Pokemon'
                        />
                    </fieldset>
                </form>
                <div style={({ display: 'inline-block' })}>
                    {this.state.data.map((p, index) => {
                        return <PokemonField key={index} data={p} />
                    })}
                </div>
            </div>
        );
    }

}


export default PokemonIndex;