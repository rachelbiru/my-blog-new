import React, { Component } from 'react';
import '../style/Home.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import team_pic from './theme_picture.png'; 
import { Row, Col, Container } from 'react-bootstrap';



class Landing extends Component {
    state = { blogs: [{}], navigateToProduct: false, img: '', comments: [] }


    componentDidMount() {
        axios.get(`/api`)
            .then(res => {
                // const blogs = res.data;
                console.log(res.data)

                this.setState({ blogs: res.data });
                // this.setState({comments : res.data.comments })

                this.props.blogsArray(res.data);

            })
            .catch(err => {
                console.log(err);
            })




    }


    render() {
        console.log(this.state.blogs)
        console.log(this.state.comments)



        if (this.state.navigateToProduct) {
            return <Redirect to="product" />
        }

        return (
            <div className="homePage">
                <img className="theme_img" src="photoNew.png" alt="backgroundimage" />
                <Container>
                    <div className="header" > <h1> Blogers | בלוגרים</h1> </div>
                </Container>

                <div className="wrapper">
                    <Container>
                        <Row >
                            {this.state.blogs.map((blog, i) => (
                                <Col key={i} md={6} md="auto" >
                                    <div className="Blog" key={i} >
                                        <img id="blogImg" src={blog.filename} alt="" />
                                        <h3>{blog.categories}</h3>





                                        <span>  </span>
                                        <div className="overlay">
                                            <div className="content" onClick={() => {
                                                this.props.setProduct(this.state.blogs[i]);
                                                this.setState({ navigateToProduct: true })
                                            }}>  Read More... </div>
                                        </div>
                                    </div>

                                    {/* {this.state.comments.map(com => (
                                        <p>{com.text}</p>
                                    ))} */}


                                </Col>

                                // <div className="" key={i} onClick={() => {
                                //     this.props.setProduct(this.state.blogs[i]);
                                //     this.setState({ navigateToProduct: true })
                                //     // window.location.href = `/product/${this.state.blogs[i]._id}`
                                // }}>


                                //     <img src={blog.filename} alt="" />
                                //     <h1>{blog.categories}</h1>
                                //     <div className="overlay">
                                //         <div className="content"> Image Hover Effect </div>
                                //     </div>
                                // </div>
                            ))}

                        </Row>
                    </Container>
                </div>





                <div className="footer-main-div">
                    <div className="footer-social-icons">
                        <ul>
                            <li><a href="#" target="blank" className="fa fa-facebook" /></li>
                            <li><a href="#" target="blank" className="fa fa-twitter" /></li>
                            <li><a href="#" target="blank" className="fa fa-google-plus" /></li>
                            <li><a href="#" target="blank" className="fa fa-youtube" /></li>

                        </ul>
                    </div>

                    <div className="footer-menu-one">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Service</a></li>
                            <li><a href="#">Conect us</a></li>

                        </ul>
                    </div>

                    <div className="footer-menu-two">
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Gallery</a></li>
                            <li><a href="#">Media</a></li>

                        </ul>
                    </div>


                </div>
                <div className="footer-bottom">
                    <p> Design by: <a href="#"> Learning Tutorial Point</a></p>
                </div>
            </div>
        )
    }
}

export default Landing