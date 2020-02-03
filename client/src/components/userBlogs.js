import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class UserBlogs extends Component {
    state = { blogs: [] , redirect : false , blog : {} }

    componentDidMount() {
        axios.get(`/blogs/${localStorage.email}`)
          
            .then(res => {
                //  console.log(`/blogs/${localStorage.email}`);
                const blogs = res.data;
                this.setState({ blogs });
            })
    }

    deleteBlog = (id,i)=>{
        axios.delete(`/blogs/${id}`)
        .then(res =>{
            console.log(res.data);
        }) 

        let tmp = [this.state.blogs]
        tmp.splice(i,1)
        this.setState({blogs : tmp})
    }
    


    render() {
         console.log(this.state.blogs)
        console.log(this.state.blog)

        if (this.state.redirect) {
            return <Redirect to='/editblog' />
        }
        

        const elements = this.state.blogs.map((item, i) => (
            <div key={i}>
                <img src={item.image} />
                <h1>{item.categories}</h1>
                <p>{item.description}</p>

                <button onClick={()=>{
                    const id = item._id
                    this.deleteBlog(id,i)
                }} >Delete</button>


                <button onClick={()=>{
                       const id = item._id
                    //   this.updateBlog(id);
                     this.props.searchBlog(item._id);
                      this.setState({redirect:true})
                }}>update</button>


            </div>
        ))

        return (
            <div>
                {elements}
            </div>
        )
    }

}

export default UserBlogs;