import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, Form} from 'react-bootstrap';
import Products from './products';
import Cart from './cart';
import Paginationn from './paginationn';

const Home = ({products, cartItems, setProducts, handleAddProduct, handleRemoveProduct, loadProducts}) => {

    const [searchBrand, setSearchBrand] = useState('');
    const [searchModel, setSearchModel] = useState('');
    const [loading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);

    const styles = {
        card: {
          backgroundColor: 'white',
          borderRadius: '0',
          width: '100%',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          
        },
        cardImage: {
          objectFit: 'cover',
          borderRadius: '0',
          width: '100%',
          
        },
        scrolable: {
          backgroundColor: 'white',
          borderRadius: '0',
          width: '100%',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          overflowY: 'auto',
          maxHeight: '300px'
        }
        
    }
    
    const uniqueBrands = [...new Set(products?.map((product) => product.brand))];
    const uniqueModel = [...new Set(products?.map((product) => product.model))];

    const filterModel = (filterModel) => {
        console.log(filterModel);
        const result = products.filter((currentData) => {
            return currentData.model === filterModel;
        });
        setProducts(result);
    }

    const filterBrand = (filterBrand) => {
        const result = products.filter((currentData) => {
            return currentData.brand === filterBrand;
        });
        setProducts(result);
    }

    const handleSort = (s) => {
        if (s === 'oldToNew') {
            const sortedDates = products?.map(obj => 
                { return { ...obj, createdAt: new Date(obj.createdAt)} })
                .sort((a, b) => b.createdAt - a.createdAt)
                setProducts(sortedDates);
           
        } else if (s === 'newToOld') {
            const sortedDates = products?.map(obj => 
                { return { ...obj, createdAt: new Date(obj.createdAt)} })
                .sort((a, b) => a.createdAt - b.createdAt)
                setProducts(sortedDates);
        } else if (s === 'highToLow') {
            const sortedPrice = 
                [...products].sort((a, b) => {
                    return b.price > a.price ? 1 : -1})
                setProducts(sortedPrice);
        } else if (s === 'lowToHigh') {
            const sortedPrice = 
                [...products].sort((a, b) => {
                    return a.price > b.price ? 1 : -1})
                setProducts(sortedPrice);
        }
    }

    // Get current products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page with pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container fluid>
                <div className='left'>
                <Card style={styles.card}>
                                <Card.Body>
                                    <Card.Title>Sort By</Card.Title>

                                    <Form name='sortBy'>
                                            <Form.Check key='1' type="radio" 
                                                        value='oldToNew' name='sortBy' label="Old to New" onChange={() => handleSort('oldToNew')} />
                                            <Form.Check key='2' type="radio" 
                                                        value='newToOld' name='sortBy' label="New to Old" onChange={() => handleSort('newToOld')} />
                                            <Form.Check key='3' type="radio" 
                                                        value='highToLow' name='sortBy' label="High to Low" onChange={() => handleSort('highToLow')}/>
                                            <Form.Check key='4' type="radio" 
                                                        value='lowToHigh' name='sortBy' label="Low to High" onChange={() => handleSort('lowToHigh')}/>
  
                                    </Form>
                                    
                                </Card.Body>
                            </Card>

                            <br></br>
                        
                            <Card style={styles.scrolable}>
                                <Card.Body>
                                    <Card.Title>Brand</Card.Title>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            onChange={(e) => setSearchBrand(e.target.value)}
                                            aria-label="Search"
                                        />
                                    </Form>
                                    <br></br>
                                    {uniqueBrands.filter((brand) => {
                                        return searchBrand.toLowerCase() === '' ? brand : brand.toLowerCase().includes(searchBrand);        
                                    }).map((brand) => (
                                        
                                    <Form key={brand}>
                                        <Form.Check type="checkbox" 
                                                    value={brand} 
                                                    onChange={() => filterBrand(brand)}
                                                    label={brand}
                                        />                
                                    </Form>

                                    ))}
                                </Card.Body>
                            </Card>

                            <br></br>
                        
                        
                            <Card style={styles.scrolable}>
                                <Card.Body>
                                    <Card.Title>Model</Card.Title>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            onChange={(e) => setSearchModel(e.target.value)}
                                            aria-label="Search"
                                        />
                                    </Form>
                                    <br></br>
                                    
                                    {uniqueModel.filter((model) => {
                                        return searchModel.toLowerCase() === '' ? model : model.toLowerCase().includes(searchModel);        
                                    }).map((model) => (
                                        
                                        <Form key={model}>
                                            <Form.Check key={model} 
                                                   type="checkbox" 
                                                   name={model} 
                                                   value={model}
                                                   onChange={() => filterModel(model)}
                                                   label={model}
                                            /> 
                                        </Form>
                                    ))}       
                                </Card.Body>
                            </Card>           
                </div>

                <div className='center' data-testid='productstest'>   
                
                        <Products currentProducts={currentProducts}
                                products={products}
                                loading={loading}
                                handleAddProduct={handleAddProduct}
                                cartItems={cartItems}
                                handleRemoveProduct={handleRemoveProduct}>
                        </Products>
                        <br></br>
                    
                            <div>
                                <Paginationn productPerPage={productPerPage} 
                                            totalProducts={products?.length}
                                            currentPage={currentPage}
                                            paginate={paginate}>
                                </Paginationn>
                            </div>

                </div> 

                <div className='right'>
                    <Cart cartItems={cartItems} 
                        handleAddProduct={handleAddProduct}
                        handleRemoveProduct={handleRemoveProduct}>
                    </Cart>
                </div>
          
    </Container> 
    
  );
}

export default Home;