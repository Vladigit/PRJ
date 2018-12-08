import React, {Component} from 'react'

class Rating extends Component {
    state = {
        usersTopDataArray: null
    }

    componentWillMount() {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', '/usersRating', true)
        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText),
                usersTopDataArray = data.map(function (value,index) {
                    return(
                    <tr key={value.id}>
                        <td>{index + 1}</td>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.score}</td>
                    </tr>
                    )
                })
            this.setState({
                usersTopDataArray
            })
        }
        xhr.send()
    }

    render() {

        const {usersTopDataArray} = this.state

        return(
        <div>
            <h2>Top users</h2>
            <table className="rating">
                <tbody>
                    <tr>
                        <td>Position</td>
                        <td>id</td>
                        <td>name</td>
                        <td>score</td>
                    </tr>
                    {!usersTopDataArray ? 'Loading...' : usersTopDataArray}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Rating