import React, { Component } from 'react';
import '../style/Home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Landing extends Component {
    state = { blogs: [{}], navigateToProduct: false }

    componentDidMount() {
        axios.get(`/blogs`)
            .then(res => {
                const blogs = res.data;
                console.log(res.data)
                this.setState({ blogs });
            })
    }

    render() {
        // console.log(this.state.blogs[0].categories);
        console.log(this.state.blogs);

        if (this.state.navigateToProduct) {
            return <Redirect to="product" />
        }

        return (
            <div className="homePage">
                <img src="https://colorlib.com/activello/wp-content/uploads/sites/10/2012/03/photo-1437915015400-137312b61975-1920x550.jpg" alt="backgroundimage" />
                <div className="row">
                    {this.state.blogs.map((blog, i) => (
                        <div key={i} onClick={()=>{
                            this.props.setProduct(this.state.blogs[i]);
                            this.setState({ navigateToProduct: true })
                        }}>
                            <img src={blog.image} className="blog_img"  alt="" />
                            <h1>{blog.categories}</h1>
                        </div>
                    ))}
                </div>
                {/* {this.props.shereblogs(this.state.blogs)} */}
            </div> 
            
        )
    }
}

export default Landing