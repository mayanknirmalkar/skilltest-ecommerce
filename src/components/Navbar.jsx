
import {
  Button
} from "@material-tailwind/react";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector, useDispatch } from 'react-redux';
import { sort } from "../redux/slices/productsSlice"
import { CiSquareRemove } from "react-icons/ci";
import { getProducts } from "../redux/slices/productsSlice";

const Navbar = () => {

  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.cartItems.length)


  const unsort = () => {
    dispatch(getProducts())
  }

  return (
    <div className='p-4 flex justify-between items-center w-full h-16 bg-black fixed top-0 left-0 z-10'>
        <a href="/"><div className='text-orange-400 font-bold text-2xl border-y-2 p-2'>E-commerce</div></a>

        <a href="/add"><Button variant='outlined' color="orange">Add Product</Button></a>

        <Button variant='outlined' color="orange" onClick={() => dispatch(sort())}>Price</Button>

        <Button variant='outlined' className='flex items-center py-[0.25rem]' color="orange" onClick={() => unsort()}>Price <CiSquareRemove size={30} className='ml-2'/></Button>

        <div className='relative'>
          {
            count > 0 ?
            <span className='bg-white rounded-full p-2 absolute -top-2 -right-1 w-8 h-8 text-center'>{count}</span> : null
          }
          
          <a href="/cart">
          <TiShoppingCart color='orange' className='cursor-pointer' size={50} />
          </a>
        </div>
    </div>
  )
}

export default Navbar