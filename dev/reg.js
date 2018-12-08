import React, {Component} from 'react'
import {render} from 'react-dom'

class Reg extends Component {
    state = {
        success: false,
        submited: false
    }

    render() {
        const {submited, success} = this.state 
        return(
        <div>
            <form onSubmit={this.submitForm}>
                Name:<br />
                <input type='text' name='name' /><br />
                Age:<br />
                <input type='text' name='age' /><br />
                Password:<br />
                <input type='password' name='pass' /><br />
                <input type='submit' onClick={this.clickHandler} disabled={submited || success} value={submited && !success ? 'Loading...' : 'Submit'} />
            </form>
        </div>
        )
    }

    clickHandler = () => {
        this.setState({
            submited: true
        })
    }

    submitForm = e => {
        e.preventDefault()
        let form = e.target
        var xhr = new XMLHttpRequest()
        xhr.open('POST', '/reg', true)
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.onload = () => {
            this.setState({
                success: true
            })
        }
        let data = {
            name: form.name.value,
            pass: form.pass.value,
            age: form.age.value
        }
        console.log(data)
        xhr.send(JSON.stringify(data))
    }
}

render(<Reg />, document.getElementById('main'))
