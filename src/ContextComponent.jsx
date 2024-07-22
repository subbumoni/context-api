//Importing useState to do state management
import { useState } from "react";


////Importing createContext to create context
import { createContext } from "react";

//Importing data which is our source data
import { data } from "./data";

//creating context using createContext method
 const myContext = createContext();

const ContextComponent = ({ children }) => {
  const [cartData, setCartData] = useState(data);
  return (
    // providing the values using Provider
    <myContext.Provider value={{ cartData, setCartData }}>
      {children}
    </myContext.Provider>
  );
};

export default ContextComponent;
