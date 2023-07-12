import axios from 'axios';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Otp() {
  const navigate = useNavigate()
  const [otp ,setOtp]=useState({
    email:localStorage.getItem('mail'),
    otp:0
  })

  const handleChange = (e)=> {
    setOtp((prev)=> ({...prev,[e.target.id]:e.target.value}));
   };

   const handleSubmit=async()=>{
    if (otp.email === '') {
      toast.error('Enter email ', toastoption);
      return;}
      if (otp.otp === 0) {
        toast.error('Enter otp ', toastoption);
        return;}

        const response = await axios.post('http://localhost:7000/verify/otp',otp)
       
        if(response.data.status===1){
          toast.success(response.data.message)
            navigate('/create/new/password')
        }
        if(response.data.status===0){
         toast.error(response.data.message)
        }
   }
   const handleResend = async () => {
    if (otp.email === '') {
      toast.error('Enter email ', toastoption);
      return;}
        const response = await axios.post('http://localhost:7000/forgot/password',otp)
        console.log(response)
        if(response.data.status===1){
          toast.success("Code Send to mail successfully!")
            navigate('/OTPValidation')
        }
        if(response.data.status===0){
          toast.error("Server Error")
          console.log(response.data.message)
        }
      }
   const toastoption = {
    duration: 3000,
    position: 'bottom-right',
    style: {
        color: '#fff',
        background: '#000',
    },
  };
  return (
    <div>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card mt-5">
                <div class="card-body gradient-custom-3 p-5">
                  <h2 class="text-center mb-5">Verify Code</h2>

                 

                    <div class="form-outline mb-4">
                      <label class="form-label" for="otp">Enter 4-Digit verification code</label>
                      <input type="number" id="otp" required class="form-control form-control-sm" onChange={(e)=>handleChange(e)}/>
                    </div>
                  <div className='d-flex'>
                  <button type="button" class="btn btn-success me-2 btn-block btn-sm text-body" onClick={handleSubmit}>Submit</button>
                  <button type="button" class="btn btn-danger btn-block btn-sm text-body" onClick={handleResend}>Resend OTP</button>
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

export default Otp
