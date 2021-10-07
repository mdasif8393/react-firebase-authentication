import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function App() {

  initializeAuthentication();

  const auth = getAuth();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {

      const user = result.user;
      console.log(user);
    })
  }

  return (
    
    <div className="App">
      <button onClick = {handleGoogleSignIn}>Google Log in</button>
    </div>
  );
}

export default App;
