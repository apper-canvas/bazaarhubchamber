import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productService from "@/services/api/productService";
import ProductDetail from "@/components/organisms/ProductDetail";
import { CartContext } from "@/components/organisms/Layout";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(id);
      if (!data) {
        setError('Product not found');
      } else {
        setProduct(data);
      }
    } catch (err) {
      setError(err?.message || 'Failed to load product');
      console.error('Product fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = (productData) => {
    if (addToCart && productData) {
      addToCart(productData);
      toast.success(`${productData.title} added to cart!`);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading type="details" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={error} onRetry={loadProduct} />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <ProductDetail
      product={product}
      onAddToCart={handleAddToCart}
      onClose={handleClose}
    />
  );
};

export default ProductDetailPage;