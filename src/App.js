import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
				<button className="drag-as-new-window">*</button>	
                {this.props.label}
            </div>
        );
    }
}

export default App;
