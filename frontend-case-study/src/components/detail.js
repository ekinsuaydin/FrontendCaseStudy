import React from 'react';
import { useParams } from "react-router";
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cart from './cart';
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = ({cartItems, handleAddProduct, handleRemoveProduct}) => {
    const[product, setProduct] = useState({
        name: '',
        price: '',
        model: '',
        description: ''
    });

    const styles = {
        card: {
          backgroundColor: 'white',
          borderRadius: '0',
          width: '100%',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          flexDirection: 'row',
        },
        cardImage: {
          objectFit: 'cover',
          borderRadius: '0',
          width: '100%',
          float: 'left'
        }
    }

    const { id } = useParams();

    useEffect(() => {
        fetch("https://5fc9346b2af77700165ae514.mockapi.io/products/" + id)
        .then(response => response.json())
        .then(data => {
            setProduct(data);
        })
    }, []);

   
    

   return(
    
    <div>
                    
                         
                            <div key = {product.id} className='detailContent' data-testid='detailtest'>
                                
                                
                                <Card style={styles.card}>
                                        <Card.Img variant="top" 
                                                src={product.image} 
                                                alt={product.name}
                                                style={styles.cardImage} />
                                        
                                        <Card.Body>
                                            <Card.Title>{product.name} {product.model}</Card.Title>
                                            <Card.Subtitle style={{color:'blue'}}>{product.price} ₺</Card.Subtitle>
                                            <br></br>
                                            <Button style={{width:'100%'}} 
                                                    variant="primary"
                                                    onClick={() => handleAddProduct(product)}>Add to Cart</Button>
                                            <Card.Text> {product.description}</Card.Text>
                                            
                                        </Card.Body>
                                    </Card>  
                                          
                            </div>                  
                            <div className='right'>
                                <Cart cartItems={cartItems} 
                                    handleAddProduct={handleAddProduct}
                                    handleRemoveProduct={handleRemoveProduct}>
                                </Cart>
                            </div> 
                    
            
    </div>
   );
}
export default Detail;