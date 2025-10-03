import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { toast } from "react-toastify";

const Checkout = ({ cartItems, onClearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card"
  });
  const [errors, setErrors] = useState({});

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    return subtotal + tax;
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = "ORD" + Date.now();
    onClearCart();
    toast.success("Order placed successfully!");
    navigate("/order-confirmation", { 
      state: { 
        orderId, 
        orderTotal: calculateTotal(),
        orderDate: new Date().toISOString()
      } 
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? "bg-gradient-to-r from-primary to-orange-600 text-white" : "bg-gray-200"
            }`}>
              1
            </div>
            <span className="font-medium hidden sm:inline">Shipping Details</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? "bg-gradient-to-r from-primary to-orange-600 text-white" : "bg-gray-200"
            }`}>
              2
            </div>
            <span className="font-medium hidden sm:inline">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-danger">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-danger">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="text-sm text-danger">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address *
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    placeholder="Street address, apartment, suite, etc."
                  />
                  {errors.address && (
                    <p className="text-sm text-danger">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <p className="text-sm text-danger">{errors.city}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      State *
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      error={errors.state}
                      placeholder="Maharashtra"
                    />
                    {errors.state && (
                      <p className="text-sm text-danger">{errors.state}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pincode *
                    </label>
                    <Input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      error={errors.pincode}
                      placeholder="400001"
                    />
                    {errors.pincode && (
                      <p className="text-sm text-danger">{errors.pincode}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/cart")}
                    className="flex-1"
                  >
                    <ApperIcon name="ArrowLeft" size={20} />
                    Back to Cart
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Continue to Payment
                    <ApperIcon name="ArrowRight" size={20} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ApperIcon name="CreditCard" size={20} className="text-primary" />
                        <span className="font-semibold">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay securely with your credit or debit card
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ApperIcon name="Smartphone" size={20} className="text-primary" />
                        <span className="font-semibold">UPI</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay using UPI apps like Google Pay, PhonePe, Paytm
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ApperIcon name="Banknote" size={20} className="text-primary" />
                        <span className="font-semibold">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ApperIcon name="ArrowLeft" size={20} />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    <ApperIcon name="CheckCircle" size={20} />
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.Id} className="flex gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-primary">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-primary">
                  ₹{calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;