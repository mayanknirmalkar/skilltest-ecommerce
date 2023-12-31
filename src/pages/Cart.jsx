
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
  import { useSelector, useDispatch } from 'react-redux';
  import { CiSquareRemove } from "react-icons/ci";
  import { removeFromCart } from '../redux/slices/cartSlice';
  import { useEffect } from "react";
import { getProducts } from "../redux/slices/productsSlice";

const Cart = () => {

    const cartItems  = useSelector((state) => state.cart.cartItems) 
    const products = useSelector((state) => state.products.products)
    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(getProducts())

  },[])

  return (
    <div className='grid grid-cols-1 gap-4 justify-items-center mt-24'>
    {
        cartItems.length > 0 ?

       ( <Card className="w-164">
                <List>

            { cartItems.map((item) => (
                    products.filter((product) => product.id === item.id).map((addedItem) => (

                <ListItem key={addedItem.id} className='bg-gray-300 text-wrap'>
                        <ListItemPrefix>
                           <Avatar variant="square" alt="candice" src={addedItem.thumbnail} />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                {addedItem.title}
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                               {addedItem.description}
                            </Typography>
                        </div>
                        <div onClick={() => dispatch(removeFromCart(addedItem.id))}><CiSquareRemove size={30}/></div>
                        <div>{item.quantity}</div>
                    </ListItem>

                    ))

            ))
            }
                </List>
            </Card> )
            :

            ( <Card className="w-96" color='gray'>
                <List>
                <ListItem className='flex justify-center'>
                    <div>
                    <Typography variant="h3" color="orange">
                       CART EMPTY
                    </Typography>
                    <Typography variant="h5" color="orange" className="font-normal">
                        Please add items to view
                    </Typography>
                    </div>
                </ListItem>
                </List>
            </Card> )

    }
    </div>
)}

export default Cart