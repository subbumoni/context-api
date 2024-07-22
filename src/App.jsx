//Importing Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//app component's style sheet
import './App.css'
import ContextComponent from './ContextComponent';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

//Importing other child components


function App() {


  return (
    <>
      {/*wrapping the child component which gonna use context*/}
     
      <ContextComponent>
        <Header />
        <ProductList />
        </ContextComponent>
     <Footer/>
    </>
  )
}

export default App
