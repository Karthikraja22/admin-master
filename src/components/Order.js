import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Pagination from 'react-js-pagination';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Order() {
  const [OrderList, setOrderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [activePage,setActivePage]=useState(1)
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState()
  const [orders,newOrder] = useState([]);
 

  const [aggregate,setaggregate] =useState({
    search:"",
    status:"",
    skip:0,
    limit:5,
    pincode:""
  })

  const paginate =(data)=>{
    console.log(data)
    const limit = aggregate.limit;
    if(data){
      setActivePage(data)
      setCurrentPage(limit)
      setaggregate((state)=>{
        return {
          ...state,
          skip:data*limit-limit
        }
      })
    }
  }

  const delivered = totalOrder.filter((e)=>e.status==="Delivered")
  const pending = totalOrder.filter((e)=>e.status==="Pending")



  const [order, setOrder] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    order: '',
    city: '',
    pincode: '',
    list: ''
  });

  const fetchOrder = async () => {
    const res = await axios.get('http://localhost:7000/get/all/customer');
    console.log(res)
    if (res.data.status === 1) {
     newOrder(res.data.response)
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const todayOrder = orders.filter((e)=>new Date(e.createdAt).toDateString()===new Date().toDateString())

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

  // delete

  const handleDelete = async (id) => {
    console.log(id)
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, it can not be recovered!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:7000/delete/customer/${id}`, { headers: { Authorization: localStorage.getItem('myapptoken') } })
          .then(() => {
            fetchOrderList();
          });
        swal('Deleted SuccessFully!');
      } else {
        swal('Your  file is safe!', "success");
      }
    });
  };

  const fetchOrderAggregate = async () => {
    const res = await axios.post('http://localhost:7000/aggregate/order',aggregate);
   
    if (res.data.status === 1) {
      setOrderList(res.data.response.result)
      setPages(res.data.response.fullcount)
    }else{
      setOrderList([])
    }
  }


  useEffect(()=>{
      fetchOrderAggregate()
  },[aggregate])

  return (
    <>
      <div className='container top-0 mt-5'>

        {/* card1 */}
        <div class="row m-auto text-center justify-content-center">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">ORDERS PLACED</h5>
                <div className='row mt-2'>
                  <div className='col fw-3'> TODAY ORDERS<br />{todayOrder.length}</div>
                  <div className='col fw-3'>TOTAL ORDERS<br />{totalOrder.length}</div>
                </div>
              </div>
            </div>
          </div>
          {/* card2 */}
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">DELIVERED ORDERS</h5>
                <div>
                  <h6>{delivered.length}</h6>
                  </div>
              </div>
            </div>
          </div>
          {/* card3 */}
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">PENDING ORDERS</h5>
                <div>
                  <h6>{pending.length}</h6>
                  </div>
              </div>
            </div>
          </div>

          {/* table */}
          <div className='row mt-5'>
            <div className='col-4'>
              <div class="form-outline ">
                <input type="text" id="search" placeholder='Search' class="form-control form-control-sm" onChange={(e)=>setaggregate({...aggregate,search:e.target.value})}/>
              </div>
            </div>
            <div className='col-4'>
              <div class="form-outline ">
                <select class="form-select" aria-label="Default select example" onClick={(e)=>setaggregate({...aggregate,status:e.target.value})}>
                  <option selected>Select Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className='col-4'>
              <div class="form-outline ">
                <input type="number" id="pincode" placeholder='Pincode' class="form-control form-control-sm" onChange={(e)=>setaggregate({...aggregate,pincode:parseInt(e.target.value)})}/>
              </div>
            </div>
          </div>
          
          <table class="table table-bordered table-hover " >
            <thead>
              <tr>


                <th>Name</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {OrderList.map((order) => {
                return (
                  <tr>

                    <td>{order.name}</td>
                    <td>{order.mobilenumber}</td>
                    <td>{order.email}</td>
                    <td className='overflow-x-hidden'>{order.address}</td>
                    <td>{order.city}</td>
                    <td>{order.pincode}</td>

                    <td>
                      <Link to={`/view/order/${order._id}`}>
                        <i
                          class="fa fa-eye m-1"
                          style={{ cursor: 'pointer', width: "12px", height: "12px" }}
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <Link to={`/edit/order/${order._id}`}>
                        <i
                          class="fa fa-pencil m-1 text-warning"
                          style={{ cursor: 'pointer', width: "12px", height: "12px" }}
                          aria-hidden="true"
                        ></i>
                      </Link>

                      <span onClick={() => handleDelete(order._id)}>
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
          <Pagination
          prevPageText={<i className='fa fa-angle-left'></i>}
          nextPageText={<i className='fa fa-angle-right'></i>}
          firstPageText={<i className='fa fa-angle-double-left'></i>}
          lastPageText={<i className='fa fa-angle-double-right'></i>}
          activePage={activePage}
          itemsCountPerPage={aggregate.limit}
          totalItemsCount={pages}
          onChange={paginate}
          itemClass='page-item'
          linkClass='page-link'
          />
        </div>

      </div>
    </>
  )
}

export default Order
