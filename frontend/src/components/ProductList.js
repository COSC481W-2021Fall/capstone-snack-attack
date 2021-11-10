import React, { useState, useEffect } from "react";
import ProductActions from "../services/productAction";
import { Image } from "react-bootstrap";

const ProductsList = props => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        retrieveProducts();
    }, []);

    const retrieveProducts = () => {
        ProductActions.getAll()
            .then(response => {
                console.log(response.data.selectedProducts);
                
                setProducts(response.data.selectedProducts);

            })
            .catch(e => {
                console.log(e);
            });
    };

    return (

      <div className="row">
                {products.map((product) => {
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                            <a href={"/product/" + product._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">
                                        <strong>price: </strong>{product.price}<br />
                                        <Image src={product.image} alt={product.title} fluid></Image>
                                    </p>
                                </div>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
    );
  }
  
  
    
export default ProductsList;