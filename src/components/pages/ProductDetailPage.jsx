import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "@/services/api/productService";
import ProductDetail from "@/components/organisms/ProductDetail";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { toast } from "react-toastify";

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productData) => {
    onAddToCart(productData);
    toast.success(`${productData.title} added to cart!`);
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