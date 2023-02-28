import React from 'react';
import {useEffect} from 'react';
import { Link } from "react-router-dom";
import { Button, CardGroup, Card, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Products = ({ products, currentProducts, loading, handleAddProduct }) => {

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
}, [products])

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
        }
}
  if (loading) {
    return <h2>Loading...</h2>;
  }

  

  return (
    <Row xs={1} md={4} xl={8}  className="g-4">
        {currentProducts?.map(product => {
        return (
            <Col key = {product.id} >
                <div key = {product.id}>
                    
                        <CardGroup>
                        <Card style={styles.card}>
                            <Link to={"/details/" + product.id} style={{textDecoration:'none'}}>
                                <Card.Img variant="top"                                   
                                        src={product.image} 
                                        alt={product.name}
                                        style={styles.cardImage} />
                                </Link> 
                                <Card.Body>
                                    <Card.Title style={{color:'blue'}}>{product.price} ₺</Card.Title>
                                    <Card.Text>{product.brand} {product.model}</Card.Text>
                                    <Button style={{width:'100%'}} 
                                            variant="primary"
                                            onClick={() => handleAddProduct(product)}>Add to Cart</Button>
                                </Card.Body>
                            </Card> 
                        </CardGroup> 
                                   
                </div>                  
            </Col>  
        );
    })}
    </Row>
    
  );
  
};

export default Products;