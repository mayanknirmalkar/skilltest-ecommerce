import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { toast } from "react-toastify";
  import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addProduct } from "../redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";

const Add = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products)
    const count = products.length;
    
    //States for storing the edited values entered by user
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [price, setPrice ] = useState(0);
      const [rating, setRating] = useState(0);
      const [brand, setBrand] = useState(""); 
      const [thumbnail, setThumbnail] = useState("")

    
    
      const handleAdd = () => {
    
        if(  isNaN(price) || isNaN(rating)  ){
          return toast.error("Enter a number")
        }
    
        const object = {
          id: count + 1,
          thumbnail,
          title,
          description,
          price,
          rating,
          brand,
        }
    
        dispatch( addProduct(object) )
        
        navigate("/");
      }




  return (
    <div className="flex justify-center items-center mt-24">
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add Product
      </Typography>


      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Brand
          </Typography>
          <Input
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            size="lg"
            placeholder="Brand"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Title
          </Typography>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            size="lg"
            placeholder="Title"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Description
          </Typography>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            size="lg"
            placeholder="Description"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Price
          </Typography>
          <Input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            size="lg"
            placeholder="Price"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Image Url
          </Typography>
          <Input
           onChange={(e) => setThumbnail(e.target.value)}
           value={thumbnail}
            size="lg"
            placeholder="URL"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Rating
          </Typography>
          <Input
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="lg"
            placeholder="Rating"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        
        <Button onClick={handleAdd}  className="mt-6" fullWidth>
          Add
        </Button>
      </form>
    </Card>
    </div>
  )
}

export default Add