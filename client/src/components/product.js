import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../style/product.css';
import { Row, Col, Container } from 'react-bootstrap';
import moment from 'moment';


class Product extends Component {
    state = { blogs: [], comments: [], flag: false }
    comments = { name: '', email: '', text: '', blog: '' }
    newCom = { name: '', text: '' }
    id = '';
    idCom = '';
    indexCom = '';


    addCom = () => {
        if (localStorage.email) {
            axios
                .post(`/comments/${this.id}`, {
                    name: this.comments.name,
                    email: localStorage.email,
                    text: this.comments.text,
                })
                .then(res => {
                    if (res.status === 201) {

                        let tmpComments = [...this.state.comments]
                        tmpComments.push(res.data)
                        this.setState({ comments: tmpComments })
                    } else {
                        console.log(`error status code ${res.status}`);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    deleteCom = (id, i) => {

        axios.delete(`/comments/${id}`)
            .then(res => {
                if (res.status === 200) {
                    let tmp = [...this.state.comments]
                    tmp.splice(i, 1)
                    this.setState({ comments: tmp })
                } else {

                }
            })
            .catch({

            })
    }



    componentDidMount() {
        
        axios.get(`/blogs/comments/${this.id}`)
            .then(res => {
                this.setState({ comments: res.data });
                
            })
            .catch(err => {
                console.log(err);
            })
    }



    updateCom = (id, i) => {
        axios.patch(`/comments/${id}`, {
            name: this.newCom.name,
            text: this.newCom.text,
        })
            .then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    let tmpCom = [...this.state.comments]
                    const newBlog = { ...this.newCom };

                    tmpCom[i] = newBlog;
                    this.setState({ comments: tmpCom })
                    
                }
            })
    }




    render() {

        const product = [this.props.product];

        if (this.props.product.length === 0) {
            return <Redirect to="/" />
        }


        return (
            <Container fluid>
                <Row>
                    <Col sm={8} className="blogCol">

                        {product.map((item, index) => (
                            <div className="product" key={index}>
                                <Row  >
                                    <Col><div className="head"><h1>{item.categories}</h1></div></Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className="post">
                                            <img className="imgProduct" src={item.filename} alt="blogImg" />
                                            <div className="post-s">
                                                <h2>
                                                    <ion-icon name="chatbubble-outline"></ion-icon>
                                                </h2>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col><p className="description">{item.description}</p></Col>
                                </Row>
                                <p style={{ display: "none" }}>{this.id = item._id}</p>
                            </div>
                        ))}


                        <div className="Share">
                            <Row>
                                <Col md={6}>
                                    <span>
                                        <img src="gmail.jpg" alt="gmail" />
                                        <img src="220px-Instagram_logo_2016.svg.png" alt="instegram" />
                                        <img src="facebook-logo.png" alt="facebook" />
                                    </span>
                                </Col>

                                <Col md={5}>
                                    <span><h3>שתפו את הבלוג ברשתות החברתיות</h3></span>
                                </Col>
                            </Row>
                        </div>


                        <h1>תגובות</h1>
                        {this.state.comments.map((com, i) => (
                            <div className="com" key={i}>

                                <p style={{ direction: 'ltr' }} >  שם : {com.name}  </p>
                                <p>{moment(new Date()).format('llll')}</p>
                                <h5>{com.text}</h5>

                                {localStorage.email === com.email ?
                                    <div className="iconComments">

                                        <span>
                                            <ion-icon onClick={() => {
                                                const id = com._id
                                                this.deleteCom(id, i)
                                            }} name="trash-outline"></ion-icon>

                                            <ion-icon onClick={() => {
                                                const id = com._id
                                                this.setState({ flag: true })
                                                this.idCom = id;
                                                this.indexCom = i;
                                            }} name="create-outline"></ion-icon>
                                        </span>

                                    </div> : ''}
                            </div>
                        ))}

                        {this.state.flag ?
                            <Container>
                                <Row>
                                    <Col sm={8}>
                                        <div className="editCom">
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea3"
                                                    rows="7"
                                                    placeholder="ערוך/י תגובה" onChange={(e) => {
                                                        this.newCom.text = e.target.value
                                                    }} >
                                                </textarea>
                                            </div>

                                            <div className="md-form input-group mb-3">
                                                <div className="input-group-prepend" id="MaterialButton-addon3">
                                                    <button onClick={() => {
                                                        this.updateCom(this.idCom, this.indexCom)
                                                        this.setState({ flag: false })
                                                    }} className="btn btn-md btn-info m-0 px-3" type="button">עריכה</button>
                                                </div>

                                                <div className="input-group-prepend" id="MaterialButton-addon3">
                                                    <button onClick={() => {
                                                        this.setState({ flag: false })
                                                    }} className="btn btn-md btn-info m-0 px-3" type="button">ביטול</button>
                                                </div>
                                            </div>

                                            <div className="md-form input-group mb-3">
                                                <div className="input-group-prepend" id="MaterialButton-addon3">
                                                    <input onChange={(e) => {
                                                        this.newCom.name = e.target.value
                                                    }} placeholder="ערכי שם" type="text" className="form-control" id="validationTooltip05" required />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container> : ""
                        }

                        <hr />

                        <div className="comments">
                            <h1>כתיבת תגובה</h1>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea3"
                                    rows="7"
                                    placeholder="...כתוב/י כאן משהו" onChange={(e) => {
                                        this.comments.text = e.target.value
                                    }} >
                                </textarea>
                            </div>

                            <div className="md-form input-group mb-3">
                                <div className="input-group-prepend" id="MaterialButton-addon3">
                                    <button onClick={() => {
                                        this.addCom();
                                    }} className="btn" className="btn btn-md  m-0 px-3" type="button">הגב/י</button>
                                </div>
                            </div>

                            <div className="md-form input-group mb-3">
                                <div className="input-group-prepend" id="MaterialButton-addon3">
                                    <input onChange={(e) => {
                                        this.comments.name = e.target.value
                                    }} placeholder="שם חובה" type="text" className="form-control" id="validationTooltip05" required />
                                </div>
                            </div>
                        </div>
                    </Col>


                    <Col>
                        <div className="MoreBlog" >
                            <h2>:לעוד בלוגים</h2>
                            {this.props.Blogs.map((blog, i) => (
                                <div className="moreUserBlogs" key={i}>
                                    <Row>
                                        {this.props.product._id !== blog._id ?
                                            <div className="Morepost"> 
                                                <img src={blog.filename} alt="blog" />
                                                 <div className="Morepost-s">
                                                    <button onClick={()=>{
                                                        
                                                        this.props.setProdact(this.props.Blogs[i]);
                                                        this.id = blog._id;
                                                        this.componentDidMount()
                                                    }}> Read More</button>
                                                </div>
                                            </div>

                                            : ''}
                                    </Row>
                                </div>
                            ))}
                        </div>


                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Product;