import React, { Component } from 'react';
import '../Home.css';
import axios from 'axios';
// import i  from '.../background.jpg';

class Landing extends Component {
    state = { blogs: [{}] }

    componentDidMount() {
        axios.get(`/blogs`)
            .then(res => {
                const blogs = res.data;
                this.setState({ blogs });
            })
    }

    render() {
        // console.log(this.state.blogs[0].categories);
        console.log(this.state.blogs);

        return (
            <div className="homePage">
                <img src="https://colorlib.com/activello/wp-content/uploads/sites/10/2012/03/photo-1437915015400-137312b61975-1920x550.jpg" alt="backgroundimage" />
                <div className="row">

                    <table >

                        <tbody>

                            <tr>
                                <th>Evening clothes</th>
                            </tr>
                            <tr> 
                            {this.state.blogs.filter((blog, index) => blog.categories === 'Evening clothes')
                                    .map((b, i) => <td><img src={b.image} /></td>)}
                            </tr>


                            <tr>
                                <th> winter clothe </th>
                            </tr>
                            <tr>
                                {this.state.blogs.filter((blog, index) => blog.categories === 'winter clothes')
                                    .map((b, i) =>

                                        <td><img src={b.image} /></td>)}
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>

        )
    }
}

export default Landing