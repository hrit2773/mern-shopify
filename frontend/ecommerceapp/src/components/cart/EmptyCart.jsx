import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
      <Link
      to="/"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
