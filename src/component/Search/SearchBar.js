import { Component } from 'react';

export default class SearchBar extends Component {
    state = {
        text: "",
    }

    handleInput = (e) => {
        this.setState({ text: e.target.value })
      }

    render(){
        return (
            <div>
                <input onChange={this.handleInput} className="search" type="text" placeholder="Search Track"></input>
                <button>Submit</button>
            </div>
        )
    }
}
