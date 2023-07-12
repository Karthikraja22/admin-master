import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditOrder() {

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


  // checkbox
  const[ischecked, setischecked] = useState(false);
  const handlecheckboxchange = () => {
    setischecked(!ischecked)
    // setischecked(event.target.checked);
  };

  //object for saving the data 

  const [order, setOrder] = useState({

    name: '',
    email: '',
    mobilenumber: '',
    address: '',
    city: '',
    status:"",
    pincode: ''

  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:7000/get/customer/${params.id}`, { headers: { Authorization: localStorage.getItem('myapptoken') } }
      );
      setOrder(res.data.response);
      setischecked(res.data.response.status==="Pending"?false:res.data.response.status==="Delivered"?true:false)
    };
    fetchData()
  }, []);
  //handleChange declaration
console.log(ischecked)
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
    if(ischecked){
     order.status="Delivered"
    }else{
      order.status="Pending"
    }

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
    
    console.log(order)

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

  return (
    <div>
      <div className='container m-auto w-75 rounded-4 mt-5'>


        <div className=' form-outline row mb-4 fw-3'>
          <div className='col-3'>
            <div class="form-outline mb-4">
              <label class="form-label" for="name">Name</label>
              <input type="text" id="name" required class="form-control form-control-sm" value={order.name} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <div className='col-4'>
            <div class="form-outline mb-4">
              <label class="form-label" for="email">Email</label>
              <input type="email" id="email" class="form-control form-control-sm" value={order.email} onChange={(e) => handleChange(e)} />
            </div>
          </div>

          <div className=' col-3'>
            <div class="form-outline mb-4">
              <label class="form-label" for="Phone">Phone number</label>
              <input type="number" id="phone" required class="form-control form-control-sm" value={order.mobilenumber} onChange={(e) => handleChange(e)} />

            </div>
          </div>
        </div>
        <div className='form-outline row mb-4'>


          <div className=' col-2'>
            <div class="form-outline mb-4">
              <label class="form-label" for="address">Address</label>
              <input type="text area" id="address" class="form-control form-control-sm" value={order.address} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <div className=' col-2'>
            <div class="form-outline mb-4">
              <label class="form-label" for="city">City</label>
              <input type="text" id="city" class="form-control form-control-sm" value={order.city} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <div className=' col-2'>
            <div class="form-outline mb-4">
              <label class="form-label" for="Pin">Pin Code</label>
              <input type="number" id="Pin" class="form-control form-control-sm" value={order.pincode} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <div className=' col-2'>
            <div class="form-outline mb-4">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="mycheckbox" checked={ischecked} onChange={(e) => handlecheckboxchange(e)}></input>
                <label class="form-check-label" htmlFor='mycheckbox' >{ischecked ? "Delivered" : "Pending"}</label>
              </div>
              </div>
            </div>


          </div>

          <div class="d-flex">

            <Link to={'/order/details'}><button type="button" class="btn btn-outline-danger btn-block btn-sm text-body me-2" >Cancel </button></Link>
            <button type="button" class="btn btn-outline-success btn-block btn-sm text-body" onClick={handleSubmit}>Update </button>
            <Toaster />
          </div>
        </div>
      </div>
      )
}

      export default EditOrder
