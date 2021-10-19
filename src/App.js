import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useState } from 'react';


function App() {

  initializeAuthentication(); // call function from firebase.init.js

  const[name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);


  const auth = getAuth();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
    })
  }

  const handleRegistration = (e) =>{
    e.preventDefault();

    if(password.length < 6){
      setError('Password must be 6 character long');
      return;
    }
    
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Password must contain 2 upper case');
      return;
    }

    isLogin ?  processLogin(email, password) : registerNewUser(email, password);

  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      setError('');
      verifyEmail();
      setUserName();
    })

    .catch((error) => {
      setError(error.message);
    });
  }

  //verify email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then((result) => {
      console.log(result);
    });
  }

  //login user
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      setError('');
    })
    .catch((error) => {
      setError(error.message);
    });
  }

  const toggleLogin = (e) => { 
    setIsLogin(e.target.checked); //checkbox value
  }

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  const handleResetPassword = () =>{
    sendPasswordResetEmail(auth, email)
  .then((result) => {

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  const handleNameChange = (e) =>{
    setName(e.target.value);
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser, 
      {displayName: name} 
    )
    .then((result) => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }
  return (
    
    <div className="mx-5">

      {/* //google sign in button */}
      <div>
        <button className="btn btn-primary "onClick = {handleGoogleSignIn}>Google Log in</button> 
      </div>
      <br/> <br/> <br/>

      <form onSubmit = {handleRegistration}>
        <h3 className="text-primary">Please {isLogin ? 'Login' : 'Register'}</h3>

        {
          !isLogin &&
          <div className="row mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" onBlur={handleNameChange} className="form-control" id="inputName" placeholder="Your Name"/>
            </div>     
          </div>
        }

        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input required onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input required onBlur={handlePasswordChange} type="password" className="form-control " id="inputPassword3"/>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          
          <h6 className="text-danger">{error}</h6>
        </div>
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button> <br/>
        <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Reset Password</button>
      </form>
      
    </div>
  );
}

export default App;
