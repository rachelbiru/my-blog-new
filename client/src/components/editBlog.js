import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



class Editblog extends Component {

    state = { redirect: false };


    updateBlog = (id) => {
        axios.patch(`/blogs/${id}`,{
            
            categories: this.blogs.categories,
            image: this.blogs.image,
            is_local: this.blogs.is_local,
            description: this.blogs.description,
        })
        .then(res =>{
            console.log(res.data);
        })
    }

    blogs = { categories: '', image: '', is_local: '', description: '' }


    render() {
        console.log(this.props.id);

        // console.log(this.state.book);


        if (this.state.redirect) {
            return <Redirect to='/userblogs' />
        }


        return (
            <div>
                <h1>Edit book</h1>

                <input type="text" onChange={(e) => {
                    this.blogs.categories = e.target.value;
                }} />

                <input type="text" onChange={(e) => {
                    this.blogs.image = e.target.value;
                }} />

                <input type="text" onChange={(e) => {
                    this.blogs.description = e.target.value;
                }} />

                <button onClick={() => {
                    this.updateBlog(this.props.id) ;
                    this.setState({redirect:true})
                }} type="submit" className="btn btn-dark">Save</button>

            </div>
        )
    }

}


export default Editblog;