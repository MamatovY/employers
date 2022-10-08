import { Component } from 'react'
import './SearchPanel.css'

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: ''
        }
    }
    onSearchUpdate = (e) => {
        const term = e.target.value
        this.setState({ term })
        this.props.onSearchUpdate(term)
    }
    render() {
        return (
            <input
                type="text"
                value={this.state.term}
                onChange={this.onSearchUpdate}
                className="formControl searchInput"
                placeholder="Найти сотрудника"

            />
        )
    }
}

export default SearchPanel