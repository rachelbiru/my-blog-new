import React, { Component } from 'react';
import '../style/Home.css';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';



class Landing extends Component {
    state = {navigateToProduct: false}

  
    render() {
        
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
                        <Row>
                            {this.props.blogs.map((blog, i) => (
                                <Col key={i} md={6} >
                                    <div className="Blog" key={i} >
                                        <img id="blogImg" src={blog.filename} alt="" />
                                        <h3>{blog.categories}</h3>

                                        <div className="overlay">
                                            <div className="content" onClick={() => {
                                                this.props.setProduct(this.props.blogs[i]);
                                                this.setState({ navigateToProduct: true })
                                            }}>  Read More... </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}

                        </Row>
                    </Container>
                </div>



                <div className="footer-main-div">
                    <div className="footer-social-icons">
                        <ul>
                            <li><Link to="https://www.facebook.com/" target="blank" className="fa fa-facebook"><img src="facebook-logo.png" alt="facebook" /> </Link> </li>
                            <li><Link to="https://www.instagram.com/" target="blank" className="fa fa-twitter" > <img src="220px-Instagram_logo_2016.svg.png" alt="instegram" /></Link></li>
                            <li><Link to="https://mail.google.com/mail/u/0/?ogbl#inbox" target="blank" className="fa fa-google-plus" ><img src="gmail.jpg" alt="gmail" /></Link></li>
                            <li><Link to="https://www.youtube.com/results?search_query=ckud+tupbv" target="blank" className="fa fa-youtube" ><img src="yt_1200-vflhSIVnY.png" alt="youtube" /></Link></li>

                        </ul>
                    </div>

                    <div className="footer-menu-one">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="#">Conect us</Link></li>

                        </ul>
                    </div>

                    <div className="footer-menu-two">
                        <ul>
                            <li><Link to="/">Blog</Link></li>
                            <li><Link to="#">News</Link></li>
                            <li><Link to="#">Media</Link></li>

                        </ul>
                    </div>


                </div>
                <div className="footer-bottom">
                    <p> Design by: <Link to="#"> Learning Tutorial Point</Link></p>
                </div>
            </div>
        )
    }
}

export default Landing