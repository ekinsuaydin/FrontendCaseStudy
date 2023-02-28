//import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Form} from 'react-bootstrap';


const Navbar = ({cartItems, filterName}) => {
  //const [searchName, setSearchName] = useState('');

  {/*const handleFilter = (e) => {
      setSearchName(e.target.value);
      filterName(searchName);
  }*/}

  const totalPrice = cartItems?.reduce(
    (price, item) => price + item.quantity * item.price, 0)

    return (
      <nav className="navbar">
        
        <a href="/">
          <h1>Eteration</h1>
        </a>
        {/*<Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={handleFilter}
              aria-label="Search"
            />
        </Form>*/}
        <div className="links">
          <a href="/" >{totalPrice} ₺</a>
          <a href="/">Ekinsu</a>
        </div>
      </nav>
    );
  }
   
  export default Navbar;