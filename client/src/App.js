import logo from './logo.svg';
import react, {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accessToken, setAccessToken] = useState("")

  const urlDev = 'http://localhost:8000/'
  const urlProd = 'https://unisach-dev.onrender.com/'

  const handleCallbackResponse = async (e) => {
    e.preventDefault()
    try {
      console.log('clicked')
      const result = await axios.post(`${urlProd}api/users/auth/login`, {email, password}, {withCredentials: true, credentials: true})
    console.log(result.data.data.accessToken)
    setAccessToken(result.data.data.accessToken)
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async (e) => {
    e.preventDefault()
    try {
      console.log('clicked')
      const config = {
        headers: {Authorization: `Bearer ${accessToken}`},
      }
      const result = await axios.get(`${urlProd}api/users/me`, config)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const getRefreshToken = async (e) => {
    e.preventDefault()
    try {
      // const config = {
      //   headers: {Authorization: `Bearer ${accessToken}`}
      // }
      console.log('clicked')
      const result = await axios.get(`${urlProd}api/users/auth/refreshtoken`,  {withCredentials: true, credentials: true})
    setAccessToken(result.data.accessToken)
    console.log(result.data)
    // console.log(result.data.accessToken)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  // }, [])
  return (
    <div className="App">
      Hello World
      <div id='signInDiv'></div>

      <div>
        <form >
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='******' />
          <button onClick={handleCallbackResponse}>login</button>
        </form>
      </div>
      <div>
        <br />
        <button onClick={getUser}>get User</button>
        <div>

        </div>
        <button onClick={getRefreshToken}>refresh Token</button>
        <div>

        </div>
      </div>
    </div>
  );
}

export default App;
