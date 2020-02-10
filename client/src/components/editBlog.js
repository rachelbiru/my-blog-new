import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



class Editblog extends Component {
    blog = { ...this.props.blog }
    state = { filename: '', redirect: false, blog: this.blog };
    blogs = { file: '', categories: '', description: '' }


    updateBlog = (id) => {
        console.log(id)


        let formData = new FormData();
        formData.append('someFile', this.state.filename)
        formData.append('categories', this.blogs.categories);
        formData.append('description', this.blogs.description);
        formData.append('email', localStorage.email);

        axios.post(`/api/${id}`, formData)
            .then(res => {
                if (res.status === 201) {
                    console.log('success update');
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



    inputChangeHandler = (e, value) => {
        const blog = { ... this.state.blog }

        if (value === "categories") {
            blog.categories = e.target.value;
        }
        else if ("description") {
            blog.description = e.target.value
        }
        this.setState({ blog: blog })
    }


    render() {

        console.log(this.props.id);
        console.log(this.state.blog);

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            // <div>
            //     <h1>Edit blog</h1>

            //     <input type="file" onChange={(e) => {
            //         this.setState({ filename: e.target.files[0] })

            //     }} />

            //     <input type="text" defaultValue={this.props.blog.categories} onChange={(e) => {
            //         this.blogs.categories = e.target.value;
            //         this.inputChangeHandler(e, "categories");
            //     }} />

            //     <input type="text" defaultValue={this.props.blog.description} onChange={(e) => {
            //         this.blogs.description = e.target.value;
            //         this.inputChangeHandler(e, "description")

            //     }} />

            //     <button onClick={() => {
            //         this.updateBlog(this.props.id);
            //         this.setState({ redirect: true })
            //     }} type="submit" className="btn btn-dark">Save</button>

            // </div>


            <div className="loginpage">
                <div className="addblog">
                    <h1>Update Blog</h1>
                    <form >
                        <div className="form-group">
                            <p>Categories :</p>
                            <select defaultValue={this.props.blog.categories} onChange={(e) => {
                                this.blogs.categories = e.target.value

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
                            <textarea defaultValue={this.props.blog.description} onChange={(e) => {
                                this.blogs.description = e.target.value;
                            }} type="text" name="text" id="" className="form-control" rows="3"></textarea>
                        </div>


                        <div className="form-group">
                            <button type="submit" className="btn btn-success form-control" onClick={() => {
                                this.updateBlog(this.props.id);
                                this.setState({ redirect: true })
                            }}>Edit Blog to Home Page</button>
                        </div>
                    </form>


                    {/* <input type="text" onChange={(e) => {
                        this.comments.name = e.target.value
                    }}></input>

                    <input type="text" onChange={(e) => {
                        this.comments.text = e.target.value
                    }}></input> */}
                    


                </div >
            </div >

        )
    }

}


export default Editblog;