import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';


class UserBlogs extends Component {
    state = { userBlogs:[], redirect: false, blog: {} }

    componentDidMount() {
        axios.get(`/blogs/${localStorage.email}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ userBlogs: res.data });
                } else {
                    console.log('error')
                }

            })
            .catch(err => {
                console.log(err);
            })
    }


    deleteBlog = (id, i) => {
        axios.delete(`/blogs/${id}`)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload(true);
                } else {

                }

            })
            .catch({

            })
    }


    render() {

        if (this.state.redirect) {
            return <Redirect to='/editblog' />
        }

        const elements = this.state.userBlogs.map((item, i) => (
            <Col key={i} md={4}>
                <div style={{ margin: "10%" }} >
                    <img style={{ width: "350px", height: "400px", margin: "10%" }} src={item.filename} alt="" />
                    <h1>{item.categories}</h1>
                    <p>{item.description}</p>


                    <Button style={{ margin: "10%" }} onClick={() => {
                        const id = item._id
                        this.deleteBlog(id, i)
                        this.props.history(item.categories, "deleted")
                    }} variant="success">Delete</Button>


                    <Button onClick={() => {
                        this.props.searchBlog(item._id);
                        this.setState({ redirect: true })
                    }} variant="success">Update</Button>
                </div>
            </Col>
        ))

        return (
            <div>
                <Container>
                    <Row>
                        {elements}
                    </Row>
                </Container>
            </div>
        )
    }

}

export default UserBlogs;