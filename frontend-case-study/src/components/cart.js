import React from 'react';
import {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = ({cartItems, handleAddProduct, handleRemoveProduct}) => {


    const totalPrice = cartItems?.reduce(
        (price, item) => price + item.quantity * item.price, 0)

    const styles = {
        card: {
          backgroundColor: 'white',
          borderRadius: '0',
          width: '100%',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        },
        cardImage: {
          objectFit: 'cover',
          borderRadius: '0',
          width: '100%'
        },
        button: {
            borderRadius: '0',
        }
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])
    

   return(  
    <div data-testid='carttest'>
        
        <Card style={styles.card}>
        {cartItems?.length === 0 && <div style={{'textAlign':'center', 'fontWeight':'bold'}}>No product added yet.</div>}
        {cartItems?.map(product => {
            
                    return (    
                            <div key = {product.id}>
                                
                               <Card.Body>
                                    <Card.Title>
                                        
                                        {product.brand}
                                    </Card.Title>
                                    <Card.Subtitle style={{color:'blue'}}>
                                        {product.price} ₺
                                    </Card.Subtitle>
                                    <Button variant='secondary'
                                            style={styles.button} 
                                            onClick={() => handleRemoveProduct(product)}>-</Button>
                                    <Button primary style={styles.button}
                                            disabled>{product.quantity}</Button>
                                    <Button variant="secondary" 
                                            style={styles.button} 
                                            onClick={() => handleAddProduct(product)}>+</Button>
                                </Card.Body>                                              
                            </div>                     
                    );
            
                   
                    
        })}   
        </Card>    
        <br></br>
        <Card style={styles.card}>
            <Card.Body>
                <Card.Title>Total Price : </Card.Title>
                <Card.Title style={{color:'blue', fontWeight:'bold'}} data-testid='pricetest'>{totalPrice} ₺</Card.Title>
                <br></br>
                <Button style={{width:'100%'}}>Checkout</Button>
            </Card.Body>
        </Card>
    </div>
   );
}
export default Cart;