import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/slices/productsSlice.js"




const Home = () => {

    const saved = JSON.parse(sessionStorage.getItem("saved")) || false

    const products = useSelector(( state ) => state.products.products) 
    
    const dispatch = useDispatch();
  

    useEffect(()=>{

       if(!saved) {

         dispatch(getProducts())

       }
    
            
          
    },[])

  return (
    <>

      <div className="grid grid-cols-1 mt-24 gap-4 justify-items-center ">
      {
       
        products.map((product, index) => (
          <ProductCard key={index} rating={product.rating} id={product.id} title={product.title} brand={product.brand} description={product.description} price={product.price} thumbnail={product.thumbnail} />
        ))
      }
      </div>
    </>
  )
}

export default Home