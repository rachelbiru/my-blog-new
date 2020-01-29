import React, { Component } from 'react';
import './App.css';


import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';



class App extends Component {
  state = { Blogs: [] }

  clickToAddBlog = (addblog) => {
    let tmpBook = [...this.state.Blogs]
    tmpBook.push(addblog);

    this.setState({ Blogs : tmpBook })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
          <Route exact path='/' render={() => <Landing arrayblogs={this.state.Blogs} />} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            {/* <Route exact path='/Profile' component={Profile} /> */}

            <Route exact path='/profile' render={() => <Profile clickToShare={this.clickToAddBlog} />} />

          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
