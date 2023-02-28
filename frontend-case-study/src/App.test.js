import { render, screen } from '@testing-library/react';
import Home from './components/home';
import Detail from './components/detail';
import Navbar from './components/Navbar';
import Cart from './components/cart';

test('renders products', () => {
  render(<Home />);
  const products = screen.getByTestId("productstest");
  expect(products).toBeInTheDocument();
});

test('renders detail content', () => {
  render(<Detail />);
  const detailContent = screen.getByTestId("detailtest");
  expect(detailContent).toBeInTheDocument();
});

test('renders cart', () => {
  render(<Cart />);
  const cartContent = screen.getByTestId("carttest");
  expect(cartContent).toBeInTheDocument();
});




