import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function Addnewproduct() {

    let navigate = useNavigate()

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
        price: '',
        amount: '',
        quantity: '',
        image: ""
    });
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
    // handlefilechange declaration
    const handleFileChange = (e) => {
        console.log(e.target.files)
        const [file] = e.target.files
        setProduct({ ...product, image: file })

        let imagePreview = URL.createObjectURL(file) //blob
        setPreview(imagePreview)
    }

    //handleSubmit declaration

    const handleSubmit = async () => {


        if (product.name === '') {
            toast.error('Enter Name', toastoption);
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
        if (product.amount === '') {
            toast.error('Enter amount', toastoption);
            return;
        }

        console.log(product);
        const formData = new FormData()

        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value)
        })
        const res = await axios.post(
            'http://localhost:7000/create/new/cracker',
            formData, { headers: { Authorization: localStorage.getItem('myapptoken') } }
        );
        console.log(res);
        if (res.data.status === 1) {
            toast.success(res.data.mesaage)
            setTimeout(() => {
                navigate('/product/list')
            })
        }
        if (res.data.status === 0) {
            toast.error(res.data.message)
        }

    }

    console.log(preview)

  return (
    <div>
         <div className='container m-auto w-75 rounded-4 mt-5'>


<div className=' form-outline row mb-4 fw-3'>
    <div className='col-6'>
        <div class="form-outline mb-4">
            <label class="form-label" for="image">Product Image</label>
            <input type="file" id="image" required class="form-control form-control-sm" onChange={(e) => handleFileChange(e)} />


        </div>
    </div>
    <div className='col-4'>
        <div class="form-outline mb-4">
            <label class="form-label" for="name">Product Name</label>
            <input type="text"  id="name" placeholder='name of the product' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
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
            <input type="number" id="price" placeholder='Actual Price' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
        </div>
    </div>

    <div className=' col-2'>
        <div class="form-outline mb-4">
            <label class="form-label" for="amount">Amount</label>
            <input type="number" id="amount" placeholder='Amount' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
        </div>
    </div>
    <div className=' col-2'>
        <div class="form-outline mb-4">
            <label class="form-label" for="quantity">Quantity</label>
            <input type="number" id="quantity" placeholder='Quantity' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
        </div>
    </div>
    <div className='col-6'>
        {preview !== "" && <img src={preview} className='img-fluid' />}
    </div>

</div>

<div class="d-flex">
    <Link to={'/product/list'}><button type="button" class="btn btn-outline-danger btn-block btn-sm text-body me-2" >Cancel </button></Link>
    <button type="button" class="btn btn-outline-success btn-block btn-sm text-body" onClick={handleSubmit}>Create </button>
    <Toaster />
</div>
</div>
    </div>
  )
}

export default Addnewproduct
