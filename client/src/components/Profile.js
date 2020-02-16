import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../style/profile.css';
import axios from 'axios';


class Profile extends Component {

    blogs = { file: '', categories: '', description: '' };
    comments = { name: '', text: '' }

    state = { filename: '', redirect: false }


    loadToServerFile = () => {
        let formData = new FormData();
        formData.append('someFile', this.state.filename)
        formData.append('categories', this.blogs.categories);
        formData.append('description', this.blogs.description);
        formData.append('email', localStorage.email);
        formData.append('comments', JSON.stringify(this.comments));

        axios
            .post('/blogs', formData)
            .then(res => {
                
                if (res.status === 201) {
                    this.blogs.file = res.data.filename.filename;
                    console.log(res.data)
                    console.log(this.state.redirect)
               
                  window.location.reload(true);


                   
                } else {
                    console.log(`error status code ${res.status}`);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        
        if (this.state.redirect) {
            return <Redirect to='/' /> 
        }

        return (
            <div className="loginpage">
                <div className="addblog">
                    <h1>Add blog</h1>
                    <form >
                        <div className="form-group">
                            <p>Categories :</p>

                            <input className="form-control" id="exampleFormControlSelect1" type="text" onChange={(e) => {
                                this.blogs.categories = e.target.value
                                console.log(e.target)

                            }}/>
                        </div>

                        <div className="row">

                            <div className="col">
                                <p>Some File :</p>
                                <input type="file" className="form-control" onChange={(e) => {
                                    this.setState({ filename: e.target.files[0] })
                                }} />
                            </div>
                        </div>


                        <div className="form-group">
                            <p> description : </p>
                            <textarea onChange={(event) => {
                                this.blogs.description = event.target.value;
                            }} type="text" name="text" id="" className="form-control" rows="3"></textarea>
                        </div>


                        <div className="form-group">
                            <button type="submit" className="btn btn-success form-control" onClick={() => {
                                this.loadToServerFile();
                                this.props.history(this.blogs.categories, "add")
                                this.setState({ redirect: true });
                                
                               
                            }}>    Add Blog to Home Page </button>
                        </div>
                    </form>

                </div >
            </div>
        )
    }
}

export default Profile;