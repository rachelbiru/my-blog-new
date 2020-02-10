import React, { Component } from 'react';
import './App.css';


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





class App extends Component {
  state = { blogs: [] , product: [] , blog:{} , id:''}


  setProduct = product1 => {
    this.setState({ product: product1 })
  }



  putToArray = (arrayBlog) =>{
    // console.log(arrayBlog);
    let tmpBlogs = [...arrayBlog]
    // console.log(tmpBlogs)
    this.setState({blogs: tmpBlogs})
  }
  
  searchBlog = (id) => {
    this.setState({id:id})

    console.log(this.state.blogs)
    
    let tmp = [...this.state.blogs];

    const BlogIndex = tmp.findIndex(blog => { return blog._id === id })
    console.log(BlogIndex)
    if (BlogIndex !== -1) {
      this.setState({ blog: tmp[BlogIndex] })
    }
  }


  render() {
    console.log(this.state.blogs)
    console.log(this.state.blog)

    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div >
            <Route exact path='/' render={() => <Landing  setProduct={this.setProduct} blogsArray = {this.putToArray} shereblogs={this.shareBlog} />} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            {/* <Route exact path='/Profile' component={Profile} /> */}

            {/* <Route exact path='/profile' render={() => <Profile />} /> */}
            <Route exact path='/profile' render={() => <Profile  />} />

            <Route exact path='/product' render={() => <Product product ={this.state.product} />} />
            {/* <Route exact path='/userblogs' component={UserBlogs} /> */}

            <Route exact path='/userblogs' render={() => <UserBlogs searchBlog={this.searchBlog} />} />
            <Route exact path='/editblog' render={() => <Editblog blog ={this.state.blog} id={this.state.id} />} />
            <Route exact path='/about' component={About} />


          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
