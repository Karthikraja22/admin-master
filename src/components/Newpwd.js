import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Newpwd() {
  let navigate = useNavigate()

  const[password,setpassword] = useState({
    newPassword:'',
    confirmPassword:'',
    email:localStorage.getItem('mail')
    
    });
    
  const handleChange = (e)=> {
    setpassword((prev)=> ({...prev,[e.target.id]:e.target.value}));
   };

   const toastoption = {
    duration: 3000,
    position: 'bottom-right',
    style: {
        color: '#fff',
        background: '#000',
    },
  };



  const handleSubmit = async () => {


    if (password.newPassword === '') {
      toast.error('Enter new password', toastoption);
      return
      }
      
      if (password.confirmPassword === '') {
        toast.error('Confirm New password ', toastoption);
        return;}

        if(password.newPassword!==password.confirmPassword){
          toast.error('password not match', toastoption);
          return;
        }

        const response = await axios.post('http://localhost:7000/reset/password', password)
      
        if(response.data.status===1){
          toast.success(response.data.message)
          navigate('/')
        }
        if(response.data.status===0){
          toast.error(response.data.message)
          navigate('/password/reset')
        }
      }


  return (
    <div>
      <div className='container h-100'>
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card mt-5">
              <div class="card-body gradient-custom-3 p-5">
                <h4 class="text-center mb-5">Create a New Password</h4>


                  <div class="form-outline mb-4">
                    <label class="form-label" for="newPassword">New Password</label>
                    <input type="password" placeholder='Enter New Password' onChange={(e)=>handleChange(e)} id="newPassword" class="form-control form-control-sm" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword"  onChange={(e)=>handleChange(e)} placeholder='Confirm New Password' class="form-control form-control-sm" />
                  </div>

                  <div class="d-flex justify-content-center">
                    <button type="button" onClick={handleSubmit} class="btn btn-success btn-block btn-sm text-body">Submit</button>
                  </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default Newpwd
