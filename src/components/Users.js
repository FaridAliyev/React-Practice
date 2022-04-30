import React, { Component } from 'react'
import User from './User'
import UserConsumer from '../context';
class Users extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { users } = value;
                        return (
                            <div className='row justify-content-center mt-2'>
                                <div className='col-lg-8'>
                                    {
                                        users.map(user => <User
                                            key={user.id}
                                            id={user.id}
                                            name={user.name}
                                            surname={user.surname}
                                            age={user.age} />)
                                    }
                                </div>
                            </div>

                        )
                    }
                }
            </UserConsumer>
        )
    }
}

export default Users;