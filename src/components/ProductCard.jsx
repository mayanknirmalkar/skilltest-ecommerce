import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { deleteProduct } from "../redux/slices/productsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateProduct } from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice"
import { Link } from "react-router-dom";


const ProductCard = ( { title, brand, description, price, thumbnail, rating, id } ) => {

  const dispatch = useDispatch();

//state to toggle between inline edit and product view
  const [ isEdit, setIsEdit ] = useState(false);

//States for storing the edited values entered by user
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice ] = useState(price);
  const [newRating, setNewRating] = useState(rating);
  const [newBrand, setNewBrand] = useState(brand); 



  const handleUpdate = () => {

    if(  isNaN(newPrice) || isNaN(newRating)  ){
      return toast.error("Enter a number")
    }

    const object = {
      id: id.toString(),
      title: newTitle,
      description: newDescription,
      price: newPrice.toString(),
      rating: newRating.toString(),
      brand: newBrand
    }

    dispatch( updateProduct(object) )

    setIsEdit(false);
  }

  useEffect(()=>{
      setNewTitle(title)
      setNewBrand(brand)
      setNewDescription(description)
      setNewPrice(price)
      setNewRating(rating)
  },[title, brand, description, price, rating])


  return (
    <>
    {
      isEdit ?
       ( <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 grid grid-cols-1 gap-2">
          
    
          <Input label="Brand" value={newBrand} onChange={(e)=> setNewBrand(e.target.value)}></Input>

          <Input label="Title" value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} ></Input>

          <Input label="Price" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)}></Input>

          <Input label="Description" value={newDescription} onChange={(e)=> setNewDescription(e.target.value)}></Input>

          <Input label="Rating" value={newRating} onChange={(e)=> setNewRating(e.target.value)}></Input>

        </div>

      </CardBody>
      <CardFooter className="pt-0 flex-col">
        <Button
          onClick={handleUpdate}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Update
        </Button>
      </CardFooter>
    </Card> )

    :
        
    (
      
          <Card className="w-96">
            <Link to={`/products/${id}`}>
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          </Link>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium text-wrap">
                  {
                    `${brand} ${title}`
                  }
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  {
                    `Rs. ${price}`
                  }
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75 text-wrap"
              >
                {description}
              </Typography>
            </CardBody>
          <CardFooter className="pt-0 flex-col">
                <Button
                  onClick={() => dispatch(addToCart(id))}
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Add to Cart
                </Button>
                <div className="flex justify-between items-center pt-4" >
                    <div>
                      <Button onClick={() => setIsEdit(true) }
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mr-2">
                        <FaRegEdit size={20}/>
                      </Button>
                      <Button onClick={() => dispatch(deleteProduct(id))} 
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                        <MdDeleteOutline size={20} />
                      </Button>
                    </div>
                    <div className="flex">
                    {
                      Array.from({ length: rating }, (_, index) => (
                        <FaStar key={index} color="gold" />
                      ))    
                    }
                    </div>
                  </div>
            
          </CardFooter>
        </Card>
  
     )
    }
    
    </>
    )
}

export default ProductCard;