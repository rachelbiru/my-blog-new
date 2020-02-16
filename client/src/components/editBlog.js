import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



class Editblog extends Component {
    blog = { ...this.props.blog }
    state = { filename: '', redirect: false, blog: this.blog };
    blogs = { file: '', categories: '', description: '' }


    updateBlog = (id) => {
        let formData = new FormData();
        formData.append('someFile', this.state.filename)
        formData.append('categories', this.blogs.categories);
        formData.append('description', this.blogs.description);
        formData.append('email', localStorage.email);

        axios.post(`/blogs/${id}`, formData)
            .then(res => {
                if (res.status === 201) {
                    console.log('success update');
                    this.blogs.file = res.data.filename.filename;
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
            if (this.blogs.categories === "" || this.blogs.description === "" || this.blogs.filename ==="") {
                alert("you nead to insert")
            } else {
                return <Redirect to='/userblogs' />
            }
        }


        return (
            <div className="loginpage">
                <div className="addblog">
                    <h1>Update Blog</h1>
                    <form >
                        <div className="form-group">
                            <p>Categories :</p>

                            <input defaultValue={this.props.blog.categories} className="form-control" id="exampleFormControlSelect1" type="text" onChange={(e) => {
                                this.blogs.categories = e.target.value
                                console.log(e.target)

                            }} />
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
                            <textarea defaultValue={this.props.blog.description} onChange={(e) => {
                                this.blogs.description = e.target.value;
                            }} type="text" name="text" id="" className="form-control" rows="3"></textarea>
                        </div>


                        <div className="form-group">
                            <button type="submit" className="btn btn-success form-control" onClick={() => {
                                this.updateBlog(this.props.id);
                                this.props.history(this.props.blog.categories, "update");
                                this.setState({ redirect: true })
                            }}>Edit Blog to Home Page</button>
                        </div>
                    </form>
                </div >
            </div >
        )
    }
}

export default Editblog;