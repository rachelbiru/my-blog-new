import React, { Component } from 'react';

class AddBlog extends Component {
    blogs = { UrlImage: '', figcaption: '' }
    render() {
        return (
            <div>
                <input onChange={(event) => {
                    this.blogs.UrlImage = event.target.value;
                }} type="text" name="" id="" />

                <br/>
                <br/>

                <input type="file" name="" id=""/>

                <br/>

                    <input onChange={(event) => {
                        this.blogs.figcaption = event.target.value;
                    }} type="text" name="" id="" />

                    <button onClick={() => { this.props.clickToShare(this.blogs) }}>Share</button>
            </div>
                )
            }
        }
        
export default AddBlog;