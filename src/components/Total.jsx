//Importing useContext hook to get data from our created context "myContext"
import { useContext } from "react";

//Importing myContext to use inside useContext to get data
import { myContext } from "../ContextComponent";





const Total = () => {
  //fetching data using useContext hook
  const { cartData } = useContext(myContext);

  //through the fetched data, we are getting the total products quantity value by using the reduce method
  let totalQuan = cartData.reduce(
    (initVal, cart) => initVal + (cart.quantity || 1),
    0
  );

  //through the fetched data, we are getting the total products Amount value by using the reduce method
  let totalAmount = cartData.reduce(
    (initVal, cart) => initVal + cart.price * (cart.quantity || 1),
    0
  );

  return (
    <>
      <div className="row bg-secondary py-2 text-light fw-bold sticky-div mb-4">
        <div className="col-4 text-center d-flex justify-content-center align-items-center">
          Total Quantity : {totalQuan}
        </div>
        <div className="col-4 text-center d-flex justify-content-center align-items-center">
          Total Amount : $ {totalAmount}.00
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <a type="button" className="btn btn-success">
            Proceed to Pay
          </a>
        </div>
      </div>
    </>
  );
};

export default Total;
