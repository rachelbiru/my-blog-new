import React, { Component } from 'react';
import { login } from './UserFunction';
import '../login.css';
import userImage from '../userImage.png';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onChange2 = this.onChange2.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ email: e.target.value })
    }
    onChange2(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res){
                 console.log(res);
                this.props.history.push('/profile');
            }
        })
    }

    render() {
        return (
            <div className="loginpage">
                <div className="container1">
                    <img src={userImage} alt="user_image" className="avatar" />
                    <h2>Contact form</h2>

                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <p>Email</p>
                            <input type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                // placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <p>Password</p>
                            <input type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                // placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChange2} />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Sign in
                    </button>
                    </form>

                </div>
            </div>

        )
    }
}

export default Login;