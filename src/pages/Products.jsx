import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';
import './Product'; // Import ไฟล์ CSS ที่เราสร้าง

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
  });

  const [error, setError] = useState('');

  const validateProduct = () => {
    const { id, name, price, description } = newProduct;
    if (!id || !name || !price || !description) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddProduct = () => {
    if (validateProduct()) {
      dispatch(addProduct(newProduct));
      setNewProduct({ id: '', name: '', price: '', description: '' });
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Add New Product</h3>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="ID"
        value={newProduct.id}
        onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default Products;