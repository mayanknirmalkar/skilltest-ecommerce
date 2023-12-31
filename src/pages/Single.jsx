import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';



const Single = () => {

  let { id } = useParams();
  
  const dispatch = useDispatch();

  const item = useSelector((state) => state.products.singleProduct)

  useEffect(()=>{
   
    dispatch(getOneProduct(id))

    
  },[])

  return (

    <>
      <Card className="w-full flex-row mt-24">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className='flex-col'>
        <Typography variant="h5" color="gray" className="mb-4 uppercase">
          <span>{item.brand}</span>
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          <span>{item.title}</span>
        </Typography>
        <Typography color="gray" className="mb-8 font-normal text-wrap">
          <span>{item.description}</span>
        </Typography>
        <Typography color="gray" className="mb-8 font-normal text-wrap">
          <span>Rating: {item.rating}</span>
        </Typography>
        <Typography color="gray" className="mb-8 font-normal text-wrap">
          <span>Category: {item.category}</span>
        </Typography>
        <Typography variant='h5' color="gray" className="mb-8 font-normal text-wrap">
         <span>Rs. {item.price}</span> 
        </Typography>
        <a  className="inline-block">
          <Button onClick={() => dispatch(addToCart(item.id))} variant="text" className="flex items-center gap-2">
            Add to Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardBody>
    </Card>
                                      

                         
                
    
    </>
  )
}

export default Single