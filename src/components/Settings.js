import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function Settings() {
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
    const [order, setOrder] = useState({

        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pin: ''
    
      });
      useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(
            `http://localhost:7000/get/customer/${params.id}`, { headers: { Authorization: localStorage.getItem('myapptoken') } }
          );
          setOrder(res.data.response);
        };
        fetchData()
      }, []);
      const [preview, setPreview] = useState("")
    
      //handleChange declaration
    
      const handleChange = (e) => {
        // console.log(e.target.id, e.target.value)
    
        setOrder((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
    
    
        if (order.name === '') {
          toast.error('Enter customer name', toastoption);
          return;
        }
        if (order.email === '') {
          toast.error('Enter customer email', toastoption);
          return;
        }
        if (order.phone === '') {
          toast.error('Enter customer Phone number', toastoption);
          return;
        }
        if (order.address === '') {
          toast.error('Enter customer address', toastoption);
          return;
        }
        if (order.city === '') {
          toast.error('Enter city', toastoption);
          return;
        }
        if (order.pin === '') {
          toast.error('Enter pincode', toastoption);
          return;
        }
        console.log(order);
        const formData = new FormData()
    
        const res = await axios.put(
          `http://localhost:7000/update/customer/${params.id}`,
          order, { headers: { Authorization: localStorage.getItem('myapptoken') } }
        );
        console.log(res);
        if (res.data.status === 1) {
          toast.success("Order updated successfully!")
          setTimeout(() => {
            navigate('/order/details')
          })
        }
        if (res.data.status === 0) {
          toast.error(res.data.message)
        }
    
      }
    
      console.log(order)
return (
    <div>
       <div className='container m-auto w-75 rounded-4 mt-5'>
                <form>

                    <div className=' form-outline row mb-4 fw-3'>
                    
                        <div className='col-3'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="name">Name</label>
                                <input type="text" id="name" placeholder='Enter your name' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className=' col-3'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="phone">Phone Number</label>
                                <input type="number" id="phone" placeholder='Phone number'required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="email">email</label>
                                <input type="email" id="email" placeholder='enter your email' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                    </div>
                    
                    <div className='form-outline row mb-4'>
                        <div className=' col-2'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="minimum">Minimum price</label>
                                <input type="number" id="minimum" placeholder='minimum charge' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className=' col-2'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="discount">Discount</label>
                                <input type="number" id="discount" placeholder='Discount' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className=' col-2'>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="Shipping charges">Shipping </label>
                                <input type="number" id="Shipping charges" placeholder='Shipping charges' required class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className='col-6'>
                        <label class="form-label" for="Address">Address</label>
                                <input type="text area" id="Address" placeholder='Address' class="form-control form-control-sm" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div class="d-flex">
                        <button type="button" class="btn btn-outline-danger btn-block btn-sm text-body me-2" >Cancel </button>
                        <button type="button" class="btn btn-outline-success btn-block btn-sm text-body" onClick={handleSubmit}>Update</button>
                        <Toaster />
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Settings
