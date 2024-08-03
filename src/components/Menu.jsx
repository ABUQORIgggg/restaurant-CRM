import React, { useEffect, useState } from "react";
import items from "../../src/data";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

const Menu = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkout , setCheckout] = useState([])
  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const handleCategoryClick = (categoryIndex, category) => {
    filterItems(category);
    setCurrentCategory(categoryIndex);
  };

  const handleBuyClick = (id) => {
    setCheckoutItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem = items.find((item) => item.id === id);
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const handleDeleteClick = (id) => {
    setCheckoutItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCheckoutItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCheckoutItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleClearAll = () => {
    setCheckoutItems([]);
  };

  useEffect(() => {
    const totalCount = checkoutItems.reduce((count, item) => count + item.quantity, 0);
    localStorage.setItem('checkout', totalCount);
  }, [checkoutItems]);
  console.log("chekout", checkoutItems)

  return (
    <main className="container mx-auto w-full flex max-h-adaptive gap-5">
      <section className="w-4/6 overflow-hidden overflow-y-auto flex flex-col gap-10 py-5">
        <div className="title text-center">
          <h2 className="text-3xl font-semibold text-primary">Our Menu</h2>
          <div className="" />
        </div>

        <div className="btn-container flex justify-center gap-3">
          {allCategories.map((category, index) => (
            <button
              type="button"
              className={`filter-btn px-3 py-1 border border-transparent rounded-md text-primary hover:bg-blue-400 hover:text-white transition-all duration-300 ${
                index === currentCategory ? "bg-blue-500 text-white" : ""
              }`}
              key={index}
              onClick={() => handleCategoryClick(index, category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-[2%] gap-y-5">
          {menuItems.map((menuItem) => {
            const { id, title, img, price } = menuItem;
            return (
              <article
                key={id}
                className="menu-item bg-slate-300 rounded-lg shadow-lg overflow-hidden flex-1 min-w-44 relative"
              >
                <img
                  src={img}
                  alt={title}
                  className="photo w-full h-48 object-cover border-b border-yellow-500"
                />
                <div className="item-info p-2 flex flex-col absolute bottom-0 left-0 w-full bg-base-300 bg-opacity-60">
                  <header className="flex justify-between items-center border-b border-primary pb-2 mb-2">
                    <h4 className="text-xs font-semibold text-primary">
                      {title}
                    </h4>
                    <h4 className="price text-accent">${price}</h4>
                  </header>
                  <button
                    className="w-full py-2 btn btn-primary btn-sm"
                    onClick={() => handleBuyClick(id)}
                  >
                    Add product
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-base-200 w-2/6 relative overflow-y-auto flex flex-col justify-between">
        <p className="text-primary text-center">Checkout</p>
        <div className="h-96 flex-1 my-2 border-y border-opacity-400 border-primary overflow-y-auto">
          {checkoutItems.length > 0 ? (
            <div className="">
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b gap-2 border-primary py-2"
                >
                  <div className="w-4/12">
                    <h4 className="text-xs font-semibold text-primary">
                      {item.title}
                    </h4>
                    <p className="text-xs text-accent">${item.price}</p>
                  </div>
                  <div className="flex w-4/12 justify-center items-center">
                    <button
                      className="btn btn-xs btn-primary flex-1 rounded-r-sm h-7"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <p className="flex-1 flex items-center justify-center text-xs border border-primary px-3 h-7">
                      {item.quantity}
                    </p>
                    <button
                      className="btn btn-xs btn-primary flex-1 rounded-l-sm h-7"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <div className="text-xs text-accent w-2/12 text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="w-2/12">
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-accent text-opacity-60">
              Checkout is empty
            </div>
          )}
        </div>
        <div className="py-5 px-4 bg-base-300 flex flex-col justify-between w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p>
                Price: $
                {checkoutItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <p>Product length: {checkoutItems.length}</p>
            </div>

            <button className="btn btn-error mb-3" onClick={handleClearAll}>Clear All</button>
          </div>
          <div className="w-full">
            <button className="btn btn-primary px-20 w-full" onClick={() => setCheckout(checkoutItems)}>Checkout</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;
