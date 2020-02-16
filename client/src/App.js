import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Product from './components/product';
import UserBlogs from './components/userBlogs';
import Editblog from './components/editBlog';
import About from './components/About';
import ShowHistory from './components/History';





class App extends Component {
  state = { blogs: [], history: [], product: [], blog: {}, id: '' }


  componentDidMount() {
    axios.get(`/blogs`)
      .then(res => {
        this.setState({ blogs: res.data });
      })
      .catch(err => {
        console.log(err);
      })





    axios.get(`/history/${localStorage.email}`)
      .then(res => {
        this.setState({ history: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }



  createArrayhistory = (titleBlog, type) => {
    let date = moment(new Date()).format('llll');


    axios
      .post(`/history`, {
        titleBlog: titleBlog,
        type: type,
        date: date,
        email: localStorage.email
      })
      .then(res => {
        if (res.status === 201) {
          console.log(res.data, "res dataaaaaaaa");

        } else {
          console.log(`error status code ${res.status}`);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  setProduct = product1 => {
    this.setState({ product: product1 })
  }


  searchBlog = (id) => {
    this.setState({ id: id })

    let tmp = [...this.state.blogs];
    const BlogIndex = tmp.findIndex(blog => { return blog._id === id })
    if (BlogIndex !== -1) {
      this.setState({ blog: tmp[BlogIndex] })
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div >
            <Route exact path='/' render={() => <Landing blogs={this.state.blogs} setProduct={this.setProduct} shereblogs={this.shareBlog} />} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/history' render={() => <ShowHistory historyArray={this.state.history} />} />

            <Route exact path='/profile' render={() => <Profile history={this.createArrayhistory} />} />

            <Route exact path='/product' render={() => <Product Blogs={this.state.blogs} setProdact={this.setProduct} product={this.state.product} />} />
            <Route exact path='/userblogs' render={() => <UserBlogs  searchBlog={this.searchBlog} history={this.createArrayhistory} />} />
            <Route exact path='/editblog' render={() => <Editblog blog={this.state.blog} id={this.state.id} history={this.createArrayhistory} />} />
            <Route exact path='/about' component={About} />


          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
