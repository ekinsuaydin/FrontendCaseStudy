import {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import Home from './components/home';
import Detail from './components/detail';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const initCart = {
    cartItems: [],
  }

  const initProducts = {
    products: [],
  }

  const loadCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : initCart;
  }

  const loadProducts = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : initProducts;
  }

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(loadCartItems);


  useEffect(()=>{
    fetch("https://5fc9346b2af77700165ae514.mockapi.io/products")
    .then(response => response.json())
    .then((response) => setProducts(response))
  },[]);


  const handleAddProduct = (p) => {
    const productExist = cartItems.find((item) => item.id === p.id);
    if (productExist) {
        setCartItems(
            cartItems.map((item) =>
                item.id === p.id 
                ? {...productExist, quantity: productExist.quantity + 1}
                : item
            )
        );
    } else {
        setCartItems([...cartItems, {...p, quantity : 1}]);
    }
  }

  const handleRemoveProduct = (p) => {
    const productExist = cartItems.find((item) => item.id === p.id);
    if (productExist === 1) {
        setCartItems(cartItems.filter((item) => item.id !== p.id));
    } else {
        setCartItems(
            cartItems.map((item) => 
            item.id === p.id 
            ? {...productExist, quantity: productExist.quantity -1}
            : item
            )
        );
    }
  }

  // Search bar for the header. It doesn't work.
  const filterName = (searchName) => {
    const filtered = products.filter((name) => {
      return searchName.toLowerCase() === '' ? name : name.toString().toLowerCase().includes(searchName); 
    });
    const result = filtered.filter((currentData) => {
      return currentData.name === searchName;
  });
    //setProducts(result);
}

  return (
    <BrowserRouter>
      <div className="App">
      <Navbar cartItems={cartItems} products={products} filterName={filterName}/>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home products={products}
                                                 handleAddProduct={handleAddProduct} 
                                                 handleRemoveProduct={handleRemoveProduct}
                                                 setProducts={setProducts}
                                                 cartItems={cartItems}
                                                 loadProducts={loadProducts}/>}
            />
            <Route path="/details/:id" element={<Detail cartItems={cartItems} 
                                                        handleAddProduct={handleAddProduct}
                                                        handleRemoveProduct={handleRemoveProduct}/>}
            />
          </Routes>
        </div>
      </div>  
    </BrowserRouter>
  );
}

export default App;
