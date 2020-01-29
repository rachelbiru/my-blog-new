import React, { Component } from 'react';

class Blog extends Component {
    render() {
        return (
            <div>
                <h1>this is image</h1>

                {this.props.blogs.map((blog, index) =>
                    <div className="divBook" key={index} >
                     <figure>   
                            {/* <img src={blog.UrlImage} alt="some" /> */}
                            <embed src={blog.UrlImage} type="instegram"/>
                            <figcaption> {blog.figcaption} </figcaption> 
                            </figure>
                    </div>
                )}

                {/* <div style = {{width : "100%" , height : "200px" , border : "2px solid black"}} className='text'></div>                         */}
            </div>
        )
    }
}

export default Blog;