import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios';

class UpdateUser extends Component {

    state = {
        name: "",
        surname: "",
        age: "",
        error: false
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
        })
    }

    validateForm = () => {
        const { name, surname, age } = this.state;
        if (!name.trim() || !surname.trim() || !age) {
            return false;
        }
        return true;
    }

    updateUser = async (dispatch, e) => {
        e.preventDefault();

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        const { name, surname, age } = this.state;

        const split = window.location.pathname.split('/');
        const id = split[2];

        const updatedUser = {
            name,
            surname,
            age
        }

        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser)

        dispatch({ type: "UPDATE_USER", payload: response.data })

        window.location = window.location.href.replace(window.location.pathname, '');
    }

    componentDidMount = async () => {
        const split = window.location.pathname.split('/');
        const id = split[2];
        const response = await axios.get(`http://localhost:3004/users/${id}`)
        const { name, surname, age } = response.data;
        this.setState({
            ...this.state,
            name,
            surname,
            age
        })
    }

    render() {
        const { name, surname, age, error } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className='row justify-content-center'>
                            <div className='col-lg-8'>
                                <div className="card">
                                    <div className="card-header">
                                        Update User
                                    </div>
                                    <div className="card-body">
                                        {
                                            error ? <span className='text-danger'>Please fill out all the inputs!</span> : null
                                        }
                                        <form onSubmit={this.updateUser.bind(this, dispatch)}>
                                            <div className='form-group mt-2'>
                                                <label htmlFor='name'>Name</label>
                                                <input type="text" value={name} onChange={this.changeInput} name='name' className='form-control mt-2' placeholder='Enter Name...'></input>
                                            </div>
                                            <div className='form-group mt-2'>
                                                <label htmlFor='surname'>Surname</label>
                                                <input type="text" value={surname} onChange={this.changeInput} name='surname' className='form-control mt-2' placeholder='Enter Surname...'></input>
                                            </div>
                                            <div className='form-group mt-2'>
                                                <label htmlFor='age'>Age</label>
                                                <input type="number" value={age} onChange={this.changeInput} name='age' className='form-control mt-2' placeholder='Enter Age...'></input>
                                            </div>
                                            <div className='d-grid mt-2'>
                                                <button type='submit' className='btn btn-success'>Update User</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>

    }
}


export default UpdateUser;
