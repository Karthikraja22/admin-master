import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function View_product() {

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


  const [product, setProduct] = useState({});

  console.log(params.id)

  const fetchProductList = async () => {
    const res = await axios.get(
      `http://localhost:7000/get/cracker/${params.id}`, { headers: { Authorization: localStorage.getItem('myapptoken') } }
    );

    setProduct(res.data.response);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>


      <div className='container top-0 mt-5'>
        <div class="container-fluid m-auto text-center justify-content-center">
          <div class="card card-sm-4">
            <div class="card-body">
              <h5 class="card-title">{product.name}</h5>
              <div className='row'>
                <div className='col col-6'>
                  <img src={`http://localhost:7000/${product.image}`} className='card-img-top' />
                </div>
                <div className='col text-center col-6'>
                  <div className=' row '>
                    Actual Price : {product.price}
                  </div>
                  <div className=' row '>
                    Amount : {product.amount}
                  </div>
                  <div className=' row '>
                    Quantity : {product.quantity}
                  </div>
                  <div>
                    <Link to={'/product/list'}>
                      <button className='btn btn-outline-danger btn-block btn-sm text-body'> Close </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default View_product
