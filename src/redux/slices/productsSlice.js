import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk("getProducts", async (_, { rejectWithValue }) => {

    try {
        const response = await axios.get(`https://dummyjson.com/products?limit=100`);
        return response.data.products

    } catch (error) {
       return rejectWithValue(error.message)
    }
    
})

export const getOneProduct = createAsyncThunk("getOneProduct", async ( id , { rejectWithValue }) => {

    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return response.data

    } catch (error) {
       return rejectWithValue(error.message)
    }
    
})

export const addProduct = createAsyncThunk("addProduct", async (data, { rejectWithValue }) =>{

    try {
        const response = await axios.post(`https://dummyjson.com/products/add`, data, {
            headers:{
                'Content-Type':'application/json',
            }
        })

        console.log(response)

        return response.data;

    } catch (error) {
       return rejectWithValue(error.message);
    }
})

export const updateProduct = createAsyncThunk("updateProduct", async ( data,  { rejectWithValue } ) => {
    try {
        const response = await axios.put(`https://dummyjson.com/products/${data.id}`, data)

        toast.success("Product updated successfully!")

        return response.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
    
})



export const deleteProduct = createAsyncThunk("deleteProduct", async ( id,  { rejectWithValue } )=> {
    try {
        const response = await axios.delete(`https://dummyjson.com/products/${id}`, {
            headers:{
                'Content-Type':'application/json',
            }
        })

        toast.success("Product deleted successfully")

        return response.data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
    
})



export const productsSlice = createSlice({
    name:"products",
    initialState:{
        products:  JSON.parse(sessionStorage.getItem("products")) || [],
        loading: false,
        product: {},
        singleProduct: {},
        saved:false,
    },
    reducers: {
        sort: ( state ) => {
            const products = [...state.products];
            const sorted = products.sort(( a, b ) => a.price > b.price ? 1 : -1)
            state.products = sorted
        },
       
        getSingleProduct: ( state, action ) => {
            const product = state.products.find( (product) => product.id === action.payload ) ;

            state.singleProduct = product;
        },
    },
    extraReducers: ( builder ) => {
        builder.addCase(getProducts.pending, ( state ) => {
            state.loading = true
        })
        .addCase(getProducts.fulfilled, ( state, action ) => {
            state.loading = false
            state.products = action.payload
            state.saved = true
            sessionStorage.setItem("products", JSON.stringify(state.products))
            sessionStorage.setItem("saved", JSON.stringify(state.saved))
        })
        .addCase(getProducts.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(addProduct.pending, ( state ) => {
            state.loading = true
        })
        .addCase(addProduct.fulfilled, ( state, action ) => {
            state.loading = false
            state.products = [ ...state.products, action.payload]
            sessionStorage.setItem("products", JSON.stringify(state.products))
        })
        .addCase(addProduct.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(updateProduct.pending, ( state ) => {
            state.loading = true
        })
        .addCase(updateProduct.fulfilled, ( state, action ) => {
            state.loading = false
            const index = state.products.findIndex((value) => value.id === action.payload.id)
            state.products[index] = action.payload
         
        })
        .addCase(updateProduct.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(deleteProduct.pending, ( state ) => {
            state.loading = true
        })
        .addCase(deleteProduct.fulfilled, ( state, action ) => {
            state.loading = false
            state.products = state.products.filter((value) => value.id !== action.payload.id)
           
        })
        .addCase(deleteProduct.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload
        }).addCase(getOneProduct.pending, ( state ) => {
            state.loading = true
        })
        .addCase(getOneProduct.fulfilled, ( state, action ) => {
            state.loading = false
            state.singleProduct = action.payload
        })
        .addCase(getOneProduct.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { sort, getSingleProduct } = productsSlice.actions;
export default productsSlice.reducer;