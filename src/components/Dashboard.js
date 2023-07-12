import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Dashboard() {
  let navigate = useNavigate()

  const [totalOrder, setTotalOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [order,setOrder] = useState([]);

  const checkToken = () => {
    let token = localStorage.getItem('myapptoken')
    if (!token) {
      navigate('/')
    }
  }
  useEffect(() => {
    checkToken()
  }, [])
  const fetchOrder = async () => {
    const res = await axios.get('http://localhost:7000/get/all/customer');
    console.log(res)
    if (res.data.status === 1) {
     setOrder(res.data.response)
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrderList = async () => {
    const res = await axios.get('http://localhost:7000/get/all/customer');
    console.log(res)
    if (res.data.status === 1) {
     setTotalOrder(res.data.response)
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const fetchProductList = async () => {
    const res = await axios.get('http://localhost:7000/get/all/crackers');
    console.log(res)
    if (res.data.status === 1) {
     setProduct(res.data.response)
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);
  console.log(product)

  const todayProduct = product.filter((e)=>new Date(e.createdAt).toDateString()===new Date().toDateString())

  const todayOrder = order.filter((e)=>new Date(e.createdAt).toDateString()===new Date().toDateString())

  console.log(todayProduct)
 
  return (

    <>

      <div className='container top-0 mt-5'>
        <div class="row  m-auto">

          {/* card1 */}

          <div class="col-sm-6">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title ">ORDER INFO</h5>
                <div className='row mt-2'>
                  <div className='col fw-3 '> TODAY ORDERS<br/>{todayOrder.length}</div>
                  <div className='col-1'></div>
                  <div className='col fw-3'>TOTAL ORDERS<br/>{totalOrder.length}</div>
                </div>
                <Link to={'/order/details'}><a href="#" class="btn btn-outline-primary mt-2">View</a></Link>
              </div>
            </div>
          </div>

          {/* card2 */}

          <div class="col-sm-6">
            <div class="card  text-center">
              <div class="card-body">
                <h5 class="card-title  ">PRODUCT INFO</h5>
                <div className='row mt-2'>
                  <div className='col fw-3'> NEW PRODUCTS<br/>{todayProduct.length}</div>                  
                  <div className='col fw-3'>TOTAL PRODUCTS<br/>{product.length}</div>

                </div>
                <Link to={'/product/list'}> <a href="#" class="btn mt-2 btn-outline-primary">View</a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard
