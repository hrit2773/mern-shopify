import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import {Route,createBrowserRouter,RouterProvider, createRoutesFromElements} from 'react-router-dom'
import Layout1 from "./layouts/Layout1"
import Layout2 from "./layouts/Layout2"
import Checkout from "./components/pages/Checkout"
import ProductdetailPage from "./components/pages/ProductdetailPage"
import Protected from "./components/Protected"
import OrderSuccess from "./components/OrderSuccess"
import OrderDetails from "./components/pages/OrderDetails"
import AdminOrdersPage from "./components/pages/AdminOrdersPage"
import ForgotPassword from "./components/pages/ForgotPassword"
import ResetPassword from "./components/pages/ResetPassword"
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout1/>}>
      <Route path="" element={<Protected><Home/></Protected>}/>
      <Route path="Signup" element={<Signup/>}/>
      <Route path="Login" element={<Login/>}/>
      <Route path="Cart" element={<Protected><Layout2/></Protected>}/>
      <Route path="Checkout" element={<Protected><Checkout/></Protected>}/>
      <Route path="Product-detail/:id" element={<Protected><ProductdetailPage/></Protected>}/>
      <Route path="OrderSuccess" element={<Protected><OrderSuccess/></Protected>}/>
      <Route path="OrderDetails" element={<Protected><OrderDetails/></Protected>}/>
      <Route path="AdminOrders" element={<Protected><AdminOrdersPage/></Protected>}/>
      <Route path="ForgotPassword" element={<ForgotPassword></ForgotPassword>} />
      <Route path="reset-password/:resetToken" element={<ResetPassword></ResetPassword>}/>
    </Route>
  )
)
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
