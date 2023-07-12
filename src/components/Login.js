import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast,{ Toast, Toaster } from 'react-hot-toast';



function Login() {
let navigate = useNavigate()
  const [login, setLogin] = useState({
      email: '',
      password: ''
  });
 
  const handleChange = (e)=> {
   setLogin((prev)=> ({...prev,[e.target.id]:e.target.value}));
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
     if (login.email=== '') {
            toast.error('Enter valid e-mail', toastoption);
            return;
        }
        if (login.password=== '') {
          toast.error('Enter correct password', toastoption);
          return;
      }
      const response = await axios.post('http://localhost:7000/login',login)
      console.log(response)
      if(response.data.status===1){
        toast.success("Logged in Successfully!")
        window.localStorage.setItem('myapptoken',response.data.token)
        setTimeout(()=>{

          navigate('/dashboard')
          window.location.reload()
        },2000)
      }
      if(response.data.status===0){
        toast.error(response.data.message)
      }
    }

  return (
    <div>
      <section class="vh-100">
        <div class="container h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">

            <div class="col-md-9 col-lg-6 col-xl-5">
            </div>
            
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 shadow-lg p-4 mb-4 bg-white gradient-custom-3 rounded-4 ">
              <form>
                <div class="form-outline mb-4">
                  <input type="email" id="email" class="form-control form-control-sm"
                    placeholder="Enter a valid email address" onChange={(e)=>handleChange(e)}/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <div class="form-outline mb-3">
                  <input type="password" id="password" class="form-control form-control-sm"
                    placeholder="Enter password" onChange={(e)=>handleChange(e)}/>
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="form-check mb-0">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label class="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <Link to={'/password/reset'}><a href="#!" class="text-body">Forgot password?</a></Link>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="button" onClick={handleSubmit} class="btn btn-primary btn-sm"
                  >Login</button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </section>
      <Toaster/>
    </div>
  )
}

export default Login
