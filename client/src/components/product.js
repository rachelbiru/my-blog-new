import React, { Component } from 'react';


function Product(props) {

    const product = [props.product];
    console.log(product)

    const elements = product.map((item, index) => (
        <div key={index}>
            <h1>{item.categories}</h1>
            <img src={item.image} />
            <p>{item.description}</p>
        </div>
    ))

    return (
        <div>
          {elements}
        </div>
    )
}

export default Product;