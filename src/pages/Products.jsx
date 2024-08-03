import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productlist } from "../redux/Slices/productsList";

const Products = () => {
  const dispatch = useDispatch();
  const { data: productsList, loading, error } = useSelector((state) => state.productsList);

  useEffect(() => {
    dispatch(productlist());
  }, [dispatch]);

  useEffect(() => {
    if (productsList) {
      console.log("Products fetched:", productsList); // Logging products to console
    }
  }, [productsList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {productsList && productsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsList.map((product) => (
            <div key={product.id} className="rounded-lg shadow-md p-4 bg-blue-700 bg-opacity-50 hover:bg-blue-600 font-mono transition duration-150">
               <div className="bg-slate-300 rounded-lg">
               <img src={product.images} alt="" />
               </div>
              <h2 className="text-xl font-bold mb-2 text-white">{product.name}</h2>
              <p className="text-white">{product.description}</p>
              <p className="text-white">{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
};

export default Products;
