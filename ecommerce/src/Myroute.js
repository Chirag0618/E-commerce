import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Layout from './pages/Layout'
import Productpage from './pages/Productpage'
import Counterjs from './hooks/Counterjs'
import Productview from './pages/Productview'
import Cartpage from './pages/Cartpage'
import Signuppage from './pages/Signuppage'
import StateManager from './redux/StateManager'
import Verify from './pages/Verify'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import AdminLayout from './components/Admin/AdminLayout'
import AdminDashboard from './components/Admin/AdminDashboard'
import Category from './pages/Admin/Category'
import AddCategory from './pages/Admin/AddCategory'
import EditCategory from './pages/Admin/EditCategory'
import ProductsInAdmin from './pages/Admin/ProductsInAdmin'
import AddProduct from './pages/Admin/AddProduct'
import EditProduct from './pages/Admin/EditProduct'
import AdminRoute from './components/protectedRoutes/AdminRoute'
import ClientRoutes from './components/protectedRoutes/ClientRoutes'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import PaymentForm from './pages/PaymentForm'
import PaymentComplete from './pages/PaymentComplete'
import Orders from './pages/Admin/Orders'
import Users from './pages/Admin/Users'
import Profile from './pages/Profile'


const Myroute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path='/products' element={<Productpage />} />
            <Route path='/productview/:product_id' element={<Productview />} />
            <Route path='/signup' element={<Signuppage />} />
            <Route path='/login' element={<Login />} />



            <Route path='/verify/:token' element={<Verify />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/resetpassword/:token' element={<ResetPassword />} />

            <Route path='/' element={<ClientRoutes />}>
              <Route path='/cart' element={<Cartpage />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='profile' element={<Profile />} />

              <Route path='/payment' element={<Payment />}>
                <Route index element={<PaymentForm />} />
                <Route path='/payment/success' element={<PaymentComplete />} />
              </Route>


            </Route>

          </Route>




          <Route path='/' element={<AdminRoute />}>

            <Route path='/admin' element={<AdminLayout />}>
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='category' element={<Category />} />
              <Route path='category/new' element={<AddCategory />} />
              <Route path='category/:id' element={<EditCategory />} />
              <Route path='product' element={<ProductsInAdmin />} />
              <Route path='product/new' element={<AddProduct />} />
              <Route path='product/:id' element={<EditProduct />} />
              <Route path='orders' element={<Orders />} />
              <Route path='user' element={<Users />} />

            </Route>

          </Route>




          <Route path='/hooks' element={<Counterjs />} />
          <Route path='/redux' element={<StateManager />} />
        </Routes>
      </Router>
    </>
  )
}

export default Myroute
