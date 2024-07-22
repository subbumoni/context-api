//Importing useContext hook to get data from our created context "myContext"
import { useContext } from "react";

//Importing myContext to use inside useContext to get data
import { myContext } from "../ContextComponent";

//Importing Total component
import Total from "./Total";


//Importing fontawesome to use icons in our project
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@forawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const ProductList = () => {
  //fetching and updating data using useContext hook
  const { cartData, setCartData } = useContext(myContext);

  //through increaseQuantity function, we increase the quantity of a particular product
  const increaseQuantity = (id, qua) => {
    setCartData((prevVal) => {
      return prevVal.map((cart) => {
        if (cart.id === id && (cart.quantity || qua) < cart.stock) {
          return { ...cart, quantity: (cart.quantity || qua) + 1 };
        } else {
          return cart;
        }
      });
    });
  };

  //through decreaseQuantity function, we decrease the quantity of a particular product
  const decreaseQuantity = (id, qua) => {
    setCartData((prevVal) => {
      return prevVal.map((cart) => {
        if (cart.id === id && (cart.quantity || qua) > 0) {
          return { ...cart, quantity: (cart.quantity || qua) - 1 };
        } else {
          return cart;
        }
      });
    });
  };

  //through removeCart function, we remove the particular product from the cartData
  const removeCart = (id) => {
    let deletedCartData = cartData.filter((cart) => cart.id !== id);
    setCartData(deletedCartData);
  };

  return (
    <>
      <div className="container pt-5 product-container position-relative">
        <div className="row d-flex justify-content-center mb-4">
          {/* If cartData empty means it shows the Your Cart is Empty, else it will show the card,
          as per the product count */}
          {cartData.length === 0 ? (
            <h3 className="h3 text-center py-3">Your Cart is Empty</h3>
          ) : (
            cartData.map((item) => {
              return (
                <div
                  className="col-sm-12 col-md-6 col-lg-10 col-xl-10 mb-4"
                  key={item.id}
                >
                  <div className="card p-3 h-100">
                    <div className="row h-auto">
                      <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 d-flex justify-content-center align-items-center">
                        <div
                          id={`carouselExampleControls${item.id}`}
                          className="carousel carousel-dark slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {item.images.map((img, index) => (
                              <div
                                key={index}
                                className={`carousel-item ${
                                  index === 0 ? "active" : ""
                                }`}
                              >
                                <img
                                  src={img}
                                  className="d-block"
                                  alt="Product-Img"
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselExampleControls${item.id}`}
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselExampleControls${item.id}`}
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7">
                        <div className="card-body">
                          <h2 className="card-title">{item.title}</h2>
                          <p className="card-text mb-0">
                            <b>Brand : </b>
                            {item.brand}
                          </p>
                          <p className="card-text mb-0">
                            <b>Description : </b>
                            {item.description}
                          </p>
                          <p className="card-text text-danger">
                            In Stock :&nbsp;
                            {`${
                              item.quantity === item.stock
                                ? "Out of Stock"
                                : item.stock - (item.quantity || 1)
                            }`}
                          </p>
                          <div className="border border-dark d-inline-block mb-3">
                            <button
                              className="btn btn-secondary px-2"
                              onClick={() =>
                                decreaseQuantity(item.id, item.quantity || 1)
                              }
                            >
                              -
                            </button>
                            <span className="px-3">{item.quantity || 1}</span>
                            <button
                              className="btn btn-secondary px-2"
                              onClick={() =>
                                increaseQuantity(item.id, item.quantity || 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <p className="card-text mb-0">
                            <b>
                              <FontAwesomeIcon
                                icon={faDollarSign}
                                flip
                              ></FontAwesomeIcon>
                              &nbsp;
                              {item.price}.00
                            </b>
                          </p>
                          <p className="card-text sm-text mb-0">
                            <span>M.R.P: </span>
                            <s>
                              {(
                                item.price /
                                (1 - item.discountPercentage / 100)
                              ).toFixed(2)}
                            </s>{" "}
                            <span className="text-white bg-info px-2 py-1 fw-bold rounded-pill">
                              {item.discountPercentage}% off
                            </span>
                          </p>
                          <div className="ratings my-2">
                            {(() => {
                              const stars = [];
                              for (
                                let starIndex = 0;
                                starIndex < 5;
                                starIndex++
                              ) {
                                stars.push(
                                  <FontAwesomeIcon
                                    key={starIndex}
                                    icon={
                                      starIndex < Math.round(item.rating)
                                        ? solidStar
                                        : regularStar
                                    }
                                    className={
                                      starIndex < Math.round(item.rating)
                                        ? "text-warning"
                                        : ""
                                    }
                                  />
                                );
                              }
                              return stars;
                            })()}
                          </div>
                          <p className="my-4 text-center">
                            <a
                              className="btn btn-danger w-75"
                              type="button"
                              onClick={() => removeCart(item.id)}
                            >
                              Remove
                            </a>
                          </p>
                          <div className="row border-top mt-3 py-2">
                            <div className="col-6 text-muted text-start">
                              <p className="card-text mb-0">SHIPPING : </p>
                              <p className="card-text mb-0">SUB-TOTAL : </p>
                            </div>
                            <div className="col-6 text-end">
                              <p className="card-text mb-0">
                                <b>FREE</b>
                              </p>
                              <p className="card-text mb-0">
                                <b>
                                  <FontAwesomeIcon
                                    icon={faDollarSign}
                                    flip
                                  ></FontAwesomeIcon>
                                  &nbsp;
                                  {(item.quantity || 1) * item.price}.00
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <Total />
      </div>
    </>
  );
};

export default ProductList;
