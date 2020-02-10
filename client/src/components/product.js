import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Product extends Component {
    state = { blogs: [] ,comments:[]}
    comments = { name: '', email: '', text: '', blog: '' }
    id = '';





    addCom = () => {
        if (this.comments.email === localStorage.email) {
            console.log(this.id)

            axios
                .post(`/comments/${this.id}`, {
                    name: this.comments.name,
                    email: this.comments.email,
                    text: this.comments.text,
                })
                .then(res => {
                    if (res.status === 201) {
                        console.log('success');
                    } else {
                        console.log(`error status code ${res.status}`);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    componentDidMount() {
        console.log(this.id)
        axios.get(`/api/comments/${this.id}`)
            .then(res => {
                // const blogs = res.data;
                console.log(res.data)

                 this.setState({ comments: res.data });
                // this.setState({comments : res.data.comments })

                // this.props.blogsArray(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {

        const product = [this.props.product];
        console.log(product)
        console.log(this.state.comments)


        if (!this.props.product) {
            return <Redirect to="/" />
        }


        const elements = product.map((item, index) => (
            <div key={index}>
                <h1>{item.categories}</h1>
                <img src={item.filename} />
                <p>{item.description}</p>
                {/* {this.setState({ id: item._id })} */}
                {this.id = item._id}
            </div>
        ))

        const comments =this.state.comments.map((com,i) =>(
            <div key={i}>
            <h1>{com.name}</h1>
            <h2>{com.text}</h2>

        </div>
        ))



        return (
            <div>

                {elements}
                {comments}
                <div>
                    <textarea onChange={(e) => {
                        this.comments.text = e.target.value
                    }} ></textarea>


                    <input onChange={(e) => {
                        this.comments.name = e.target.value
                    }} type="text" placeholder="שם חובה" />



                    <input onChange={(e) => {
                        this.comments.email = e.target.value
                    }} type="email" placeholder="אימייל חובה" />




                    <button onClick={() => {
                        this.addCom()
                    }}>
                        תגובה לפוסט</button>
                </div>
{/* 
                {this.state.comments.map(com => (
                    <div>
                        <h1>{com.name}</h1>
                        <p>{com.text}</p>
                    </div>

                ))} */}

            </div>
        )
    }


}

export default Product;