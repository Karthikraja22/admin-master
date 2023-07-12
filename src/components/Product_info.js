import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Product_info() {
  let token = localStorage.getItem('myapptoken')
  const [productList, setProductList] = useState([]);
  // const [modal, setModal] = useState(false);
  // const [editId, setEditId] = useState('');
  // const [editDetails, setEditDetails] = useState({});

  const fetchProductList = async () => {
    const res = await axios.get(
      'http://localhost:7000/get/all/crackers', { headers: { Authorization: token } }
    );

    if (res.data.status === 1) {
      setProductList(res.data.response)
    }
    if (res.data.status === 0) {
      toast.error(res.data.message)
    }


  };

  useEffect(() => {
    fetchProductList();
  }, []);

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

  
  const handleDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Product Details!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:7000/delete/cracker/${id}`,{ headers: { Authorization: localStorage.getItem('myapptoken') } })
          .then(() => {
            fetchProductList();
          });
        toast.success('deleted SuccessFully');
      } else {
        swal('Your  file is safe!');
      }
    });
  };

 
  return (
    <div>
      <div class="container top-0 mt-5">
        <div className='d-flex justify-content-between mb-5'>
          <h5>PRODUCT LIST</h5>
          <Link to={'/add/new/product'}><button className='btn btn-sm btn-outline-dark'>+Add new Product</button></Link>
        </div>

        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th className='table-head-size'>IMAGE</th>
              <th>PRODUCT NAME</th>
              <th>CATEGORY</th>
              <th>CONTENT</th>
              <th>ACTUAL PRICE</th>
              <th>AMOUNT</th>
              <th>QUANTITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => {
              return (
                <tr>
                  <td className='overflow-x-hidden'>{product.image && <img width={"50px"} height={"50px"} src={`http://localhost:7000/${product.image}`} />}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.content}</td>
                  <td>{product.price}</td>
                  <td>{product.amount}</td>
                  <td>{product.quantity}</td>

                  <td>
                    <Link to={`/view/product/${product._id}`}>
                      <i
                        class="fa fa-eye m-1"
                        style={{ cursor: 'pointer', width: "12px", height: "12px" }}
                        aria-hidden="true"
                      ></i>
                    </Link>
                   
                     <Link to ={`/edit/product/${product._id}`}>
                     <i
                        class="fa fa-pencil m-1 text-warning"
                        style={{ cursor: 'pointer', width: "12px", height: "12px" }}
                        aria-hidden="true"
                        ></i>
                     </Link>
                   
                    <span onClick={() => handleDelete(product._id)} >
                      <i
                        class="fa fa-trash m-1 text-danger"
                        style={{ cursor: 'pointer', width: "12px", height: "12px" }}
                        aria-hidden="true"
                      ></i>
                    </span>


                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
      <Toaster />
    
    </div>
  )
}

export default Product_info
