import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <h1>Take me in your world ....</h1>
                            <img className="d-block w-100" src="https://colorlib.com/activello/wp-content/uploads/sites/10/2012/03/photo-1437915015400-137312b61975-1920x550.jpg" alt="First slide" />
                           

                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="..." alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="..." alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Home;