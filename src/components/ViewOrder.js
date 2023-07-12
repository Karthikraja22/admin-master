import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ViewOrder() {

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


  const [order,setOrder] = useState({});

  console.log(params.id)

  const fetchOrderList = async () => {
    const res = await axios.get(
      `http://localhost:7000/get/customer/${params.id}`, { headers: { Authorization: localStorage.getItem('myapptoken') } }
    );

    setOrder(res.data.response);
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  console.log(order)

  return (
    <div>
      <div className='container top-0 mt-5'>
        <div class="container-fluid m-auto text-center justify-content-center">
          <div class="card card-sm-4">
            <div class="card-body">
              <h5 class="card-title">{order.name}</h5>
              <div className='row'>

                <div className='col align-items-center col-6'>
                  <div className=' row '>
                    Name : {order.name}
                  </div>
                  <div className=' row '>
                    Phone number : {order.phone}
                  </div>
                  <div className=' row '>
                    Email : {order.email}
                  </div>
                  <div className=' row '>
                    Address : {order.address}
                  </div>
                  <div className=' row '>
                    City : {order.city}
                  </div>
                  <div className=' row '>
                    Pin Code : {order.pincode}
                  </div>

                  <div>


                  </div>
                </div>
                <div className='col col-6'>
                <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>QUANTITY</th>
              <th>COST</th>
            </tr>
          </thead>
          <tbody>
              {order?.crackerItems?.map((list)=>{

              return (
                <tr>
                  <td> {list.name}</td>
                  <td>{list.itemQuantity}</td>
                  <td>&#8377;{list.cost}</td>
                </tr>
              );
            })}
          </tbody>
        </table> 
                </div>
                <Link to={'/order/details'}>
                  <button className='btn btn-outline-danger btn-block btn-sm text-body'> Close </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewOrder
