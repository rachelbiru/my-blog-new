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




class App extends Component {
  state = { product: null , book:{} , id:''}


  setProduct = product1 => {
    this.setState({ product: product1 })
  }
  
  searchBlog = (id) => {
  
    this.setState({id:id})
  
  
  
    // let tmp = [...this.state.books];
    // const bookIndex = tmp.findIndex(book => { return book.id === id; })
    // if (bookIndex !== -1) {
    //   this.setState({ book: tmp[bookIndex] })
    // }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path='/' render={() => <Landing setProduct={this.setProduct} shereblogs={this.shareBlog} />} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            {/* <Route exact path='/Profile' component={Profile} /> */}

            <Route exact path='/profile' render={() => <Profile />} />
            <Route exact path='/product' render={() => <Product product={this.state.product} />} />
            {/* <Route exact path='/userblogs' component={UserBlogs} /> */}

            <Route exact path='/userblogs' render={() => <UserBlogs searchBlog={this.searchBlog} />} />
            <Route exact path='/editblog' render={() => <Editblog id={this.state.id} />} />

          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
