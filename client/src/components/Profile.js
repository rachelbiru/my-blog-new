import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

import '../profile.css';
import axios from 'axios';


class Profile extends Component {
    blogs = { file: '', categories: '', image: '', is_local: '', description: '' };
    state = { redirect: false }


    // loadToServer = () => {
    // let formData = new FormData();
    // formData.append('someFile' , this.blogs.file )
    // formData.append('someText' , this.blogs.figcaption);

    // const config = {headers : {'content-type' : 'multipart/from-data'}}

    //     axios
    //     .post('/api' ,formData,config)
    //     .then(res => {
    //         if(res.status === 201){
    //             console.log('succes');
    //             console.log(res.data.file);   
    //             this.blogs.file = res.data.file.filename;      
    //         }else{
    //             console.log(`error status code ${res.status}`);
    //         }
    //      })
    //      .catch(err => {console.log(err);
    //       })
    // }





    loadToServer = () => {
        axios
            .post('/blogs', {

                categories: this.blogs.categories,
                image: this.blogs.image,
                is_local: this.blogs.is_local,
                description: this.blogs.description

            })
            .then(res => {
                if (res.status === 201) {
                    console.log('succes');

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
                            <label htmlFor="exampleFormControlSelect1">Example select</label>
                            <select onChange={(e) => {
                                this.blogs.categories = e.target.value
                                console.log(e.target)

                            }} defaultValue="Sportwear" className="form-control" id="exampleFormControlSelect1">
                                <option >Sportswear</option>
                                <option>Evening clothes</option>
                                <option>Days clothes</option>
                                <option>Summer clothes</option>
                                <option>winter clothes</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                <input onChange={(event) => {
                                    this.blogs.image = event.target.value;
                                }} type="text" name="" id="" className="form-control" />
                            </div>

                            {/* <div className="col">
                            <label htmlFor="exampleFormControlTextarea1">Some File</label>
                            <input type="file" className="form-control" onChange={(e)=>{
                                this.blogs.file = e.target.files[0];
                            }}  />
                        </div> */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">figcaption</label>
                            <textarea onChange={(event) => {
                                this.blogs.description = event.target.value;
                            }} type="text" name="" id="" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-success form-control" onClick={() => {
                                this.props.clickToShare(this.blogs);
                                this.setState({ redirect: true });
                                this.loadToServer()
                            }}>Share</button>
                        </div>
                    </form>
                </div >
            </div>
        )
    }
}

export default Profile;