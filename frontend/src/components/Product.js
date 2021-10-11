import React from 'react'
import {Link} from 'react-router-dom';
export default function Product (props) {
    const { product } = props;
    return (
            <div key={product._id} className="card">
              <Link href={`/product/${product._id}`}>
              <img className="medium"
                src={product.image} 
                alt={product.name} />
               </Link>

             <div className="card-body">
               <Link href={`/product/${product._id}`}>
                <h2> {product.name}</h2>
               </Link>
             </div>

             <div className="price">
                ${product.price}
             </div>
            </div>
        );
        
}
       

