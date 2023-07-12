import axios from 'axios';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Edit_product() {

    let navigate = useNavigate()
    let params = useParams()

    const checkToken = () => {
        let token = localStorage.getItem('myapptoken')
        if (!token) {
            navigate('/')
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    //object for saving the data 

    const [product, setProduct] = useState({
        name: '',
        category:'',
        price: '',
        amount: '',
        quantity: '',
        image: ""
    });
    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(
                `http://localhost:7000/get/cracker/${params.id}`, { headers: { Authorization: localStorage.getItem('myapptoken') } }
              );
            setProduct(res.data.response);
          };
        fetchData()    
        },[]);

    const [preview, setPreview] = useState("")

    //handleChange declaration

    const handleChange = (e) => {
        // console.log(e.target.id, e.target.value)

        setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        // e-> event, target.id-> id of the input tag , target.value-> value entered in input tag
    };

  
    // toast options

    const toastoption = {
        duration: 3000,
        position: 'bottom-right',
        style: {
            color: '#fff',
            background: '#000',
        },
    };

    //handleSubmit declaration

    const handleSubmit = async () => {


        if (product.name === '') {
            toast.error('Enter product name', toastoption);
            return;
        }
        if (product.price === '') {
            toast.error('Enter actual price', toastoption);
            return;
        }
        if (product.quantity === '') {
            toast.error('Enter product quantity', toastoption);
            return;
        }
        console.log(product);
        const formData = new FormData()

       
        const res = await axios.put(
            `http://localhost:7000/update/cracker/${params.id}`,
            product, { headers: { Authorization: localStorage.getItem('myapptoken') } }
        );
        console.log(res);
        if (res.data.status === 1) {
            toast.success("Product updated successfully!")
            setTimeout(() => {
                navigate('/product/list')
            })
        }
        if (res.data.status === 0) {
            toast.error(res.data.message)
        }

    }

    console.log(product)

    return (
        <div>
            <div className='container m-auto w-75 rounded-4 mt-5'>


                <div className=' form-outline row mb-4 fw-3'>
                    <div className='col-4'>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="name">Product Name</label>
                            <input type="text"  value={product.name} id="name" placeholder='name of the product' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className='form-outline mb-4'>
                        <label class="form-label" >Category</label>                        
                            <select class="form-select form-select-sm" aria-label="Default select example">
                                <option selected>Choose Category</option>
                                <option value="1">One Sound Crackers</option>
                                <option value="2">Chorsa & Giant Crackers</option>
                                <option value="3">Deluxe Crackers</option>
                                <option value="4">Garlands</option>
                                <option value="5">Bomb</option>
                                <option value="6">Ground Chakkars</option>
                                <option value="7">Flower Pots</option>
                                <option value="8">Rockets</option>
                                <option value="9">Pencil</option>
                                <option value="10">Bijili Crackers</option>
                                <option value="11">Kids Special</option>
                                <option value="12">Novelties</option>
                                <option value="13">Aerial Fancy</option>
                                <option value="14">Multicolor Shots</option>
                                <option value="15">Sparklers</option>
                                <option value="16">Other Items</option>
                                <option value="17">Gift Box</option>

                            </select>
                        </div>

                    </div>

                </div>
                <div className='form-outline row mb-4'>
                    <div className=' col-2'>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="price">Actual Price</label>
                            <input type="number"  value={product.price} id="price" placeholder='Actual Price' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className=' col-2'>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="amount">Amount</label>
                            <input type="number"  value={product.amount} id="amount" placeholder='Amount' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className=' col-2'>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="quantity">Quantity</label>
                            <input type="number"  value={product.quantity} id="quantity" placeholder='Quantity' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className='col-6'>
                        {preview !== "" && <img src={preview} className='img-fluid' />}
                    </div>

                </div>

                <div class="d-flex">
                    <Link to={'/product/list'}><button type="button" class="btn btn-outline-danger btn-block btn-sm text-body me-2" >Cancel </button></Link>
                    <button type="button" class="btn btn-outline-success btn-block btn-sm text-body" onClick={handleSubmit}>Update </button>
                    <Toaster />
                </div>
            </div>
        </div >
    )
}

export default Edit_product
