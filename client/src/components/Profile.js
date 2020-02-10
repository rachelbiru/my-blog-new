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

        // const config = {headers : {'content-type' : 'multipart/from-data'}}

        
        axios
            .post('/api', formData)
            .then(res => {
                if (res.status === 201) {
                    console.log('success');
                    console.log(res.data.filename);
                    this.blogs.file = res.data.filename.filename;
                    console.log(res.data.filename);

                } else {
                    console.log(`error status code ${res.status}`);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        console.log(this.blogs.image);

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
                            <select onChange={(e) => {
                                this.blogs.categories = e.target.value
                                console.log(e.target)

                            }} className="form-control" id="exampleFormControlSelect1">
                                <option ></option>
                                <option>Sportswear</option>
                                <option>Evening clothes</option>
                                <option>Days clothes</option>
                                <option>Summer clothes</option>
                                <option>winter clothes</option>
                            </select>
                        </div>

                        <div className="row">

                            <div className="col">
                                <label htmlFor="exampleFormControlTextarea1">Some File</label>
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
                                this.setState({ redirect: true });
                                this.loadToServerFile();
                                window.location.reload(false);
                            }}>Add Blog to Home Page</button>
                        </div>
                    </form>

                    <input type="text" onChange={(e) => {
                        this.comments.name = e.target.value
                    }}></input>

                    <input type="text" onChange={(e) => {
                        this.comments.text = e.target.value
                    }}></input>


                </div >
            </div>
        )
    }
}

export default Profile;