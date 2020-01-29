import React, { Component } from 'react';
import { register } from './UserFunction';
import userImage from '../userImage.png';


class Register extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onChange1 = this.onChange1.bind(this)
        this.onChange2 = this.onChange2.bind(this)
        this.onChange3 = this.onChange3.bind(this)


        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ first_name: e.target.value })
    }

    onChange1(e) {
        this.setState({ last_name: e.target.value })
    }
    onChange2(e) {
        this.setState({ email: e.target.value })
    }
    onChange3(e) {
        this.setState({ password: e.target.value })
    }


    onSubmit(e) {
        alert('A name was submitted: ' + this.state.first_name);
        e.preventDefault()
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        register(user).then(res => {
            this.props.history.push('/login');
            console.log("rachellllllllll" + res)
        })

    }

    render() {
        return (
            <div className="loginpage">
                <div className="container1">
                <img src={userImage} alt="user_image" className="avatar" />
                    <h2>Contact form</h2>

                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form onSubmit={this.onSubmit}  >

                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter First Name"
                                        value={this.state.first_name}
                                        onChange={this.onChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter Lirst Name"
                                        value={this.state.last_name}
                                        ref="searchStringInput"
                                        onChange={this.onChange1}

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={this.state.email}
                                        ref="searchStringInput"
                                        onChange={this.onChange2} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={this.state.password}
                                        ref="searchStringInput"
                                        onChange={this.onChange3} />
                                </div>

                                <button type="submit" className="btn btn-lg btn-success btn-block">
                                    register!!!
                             </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register;