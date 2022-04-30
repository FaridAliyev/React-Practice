import React, { Component } from 'react'
import PropTypes from 'prop-types';
import UserConsumer from '../context';
import axios from 'axios';
import { Link } from 'react-router-dom'

class User extends Component {
    state = {
        isVisible: true
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isVisible: true
    //     }
    // }

    static defaultProps = {
        name: "Anonymous",
        surname: "Undefined",
        age: 0
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        surname: PropTypes.string,
        age: PropTypes.number.isRequired
    }

    onclickEvent = (num, e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
        console.log(num)
        console.log(e)
    }

    onDeleteUser = async (dispatch, e) => {
        const { id } = this.props;

        await axios.delete(`http://localhost:3004/users/${id}`)

        dispatch({ type: "DELETE_USER", payload: id });
    }

    render() {
        const { id, name, surname, age } = this.props;
        const { isVisible } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            isVisible ?
                                <ul>
                                    <li onClick={this.onclickEvent.bind(this, 30)}>Name: {name}</li>
                                    <li>
                                        <Link to={`/updateUser/${id}`}>
                                            Surname: {surname}
                                        </Link>
                                    </li>
                                    <li onClick={this.onDeleteUser.bind(this, dispatch)}>Age: {age}</li>
                                </ul> : null
                        )
                    }
                }
            </UserConsumer >
        )
    }
}

export default User;
