import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios';

class AddUser extends Component {
    state = {
        formVisible: false,
        error: false,
        name: "",
        surname: "",
        age: ""
    }

    toggleUserForm = (e) => {
        this.setState({
            formVisible: !this.state.formVisible
        })
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

    addUser = async (dispatch, e) => {
        e.preventDefault();

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        // this.setState({
        //     error: false
        // })

        let { name, surname, age } = this.state;
        age = Number(age);
        const newUser = {
            name,
            surname,
            age
        }
        const response = await axios.post('http://localhost:3004/users', newUser);
        dispatch({ type: "ADD_USER", payload: response.data })
        this.setState({
            ...this.state,
            name: "",
            surname: "",
            age: ""
        })
        window.location = window.location.href.replace(window.location.pathname, '')
    }

    render() {
        const { formVisible, error, name, surname, age } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className='row justify-content-center'>
                            <div className='col-lg-8'>
                                <div className='d-grid mt-2 mb-2'>
                                    <button type='button' className='btn btn-dark' onClick={this.toggleUserForm}>{formVisible ? 'Hide Form' : 'Show Form'}</button>
                                </div>
                                {formVisible ?
                                    <div className="card">
                                        <div className="card-header">
                                            Add Users
                                        </div>
                                        <div className="card-body">
                                            {
                                                error ? <span className='text-danger'>Please fill out all the inputs!</span> : null
                                            }
                                            <form onSubmit={this.addUser.bind(this, dispatch)}>
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
                                                    <button type='submit' className='btn btn-success'>Add User</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>

    }
}


export default AddUser;