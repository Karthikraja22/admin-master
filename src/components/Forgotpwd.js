import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Forgotpwd() {

  let navigate = useNavigate()
 
  const[mail,setmail] = useState({
   email:""
  });
    
  const handleChange = (e)=> {
    setmail((prev)=> ({...prev,[e.target.id]:e.target.value}));
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
    if (mail.email === '') {
      toast.error('Enter email ', toastoption);
      return;}
        const response = await axios.post('http://localhost:7000/forgot/password',mail)
        console.log(response)
        if(response.data.status===1){
          toast.success("Code Send to mail successfully!")
            navigate('/OTPValidation')
            localStorage.setItem("mail",mail.email)
        }
        if(response.data.status===0){
          toast.error("Server Error")
          console.log(response.data.message)
        }
      }

  return (
    <div>
                 
      <div class="mask d-flex align-items-center h-100">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card">
                <div class="card-body gradient-custom-3 p-5">
                  <h2 class="text-center mb-5">Enter your e-mail</h2>

                  

                    <div class="form-outline mb-4">
                      <label class="form-label" for="email">Email</label>
                      <input type="email" id="email"  onChange={(e)=>handleChange(e)} placeholder='Enter your E-Mail' required class="form-control form-control-sm" />
                    </div>

                    <div class="d-flex justify-content-center">
                    </div>

                    <button type="button"  onClick={handleSubmit} class="btn btn-success btn-block btn-sm text-body">Send verification code</button>
                 

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgotpwd
