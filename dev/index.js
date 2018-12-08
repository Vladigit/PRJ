import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import './less/index.less'
import Rating from './components/Rating'

class App extends PureComponent {
    state = {}

    componentWillMount() {
        console.log('React App will mount!')
    }

    componentDidMount() {
        console.log('React App did mount')
    }

    render() {
        return(
        <div>
            <h1 onClick={this.headerHandler}>Hello React</h1>
            <Rating />
        </div>
        )
    }

    headerHandler = () => {
        alert('hello react header!')
    }
}

render(<App />, document.getElementById('main'))