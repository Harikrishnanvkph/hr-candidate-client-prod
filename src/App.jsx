import { Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import Login from "./LoginPages/Login"
import Register from "./LoginPages/Register"
import { JSHome } from "./Candidate/JSHome"

function App() {

  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/signup" />
        <Route element={<JSHome />} path="js/*" />
      </Routes>
    </>
  )
}

export default App
