import React, { useContext } from "react";
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import SingInPage from "../modules/auth/SingInPage";
import AuthContext from "../config/context/auth-context";
import AdminLayout from "../modules/admin/AdminLayout";
import UserLayout from "../modules/admin/users/UserLayout";

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      {
        user.signed ? (
        <>
            <Route path='/' element={<AdminLayout/>}>
              <Route path='/' element={<UserLayout/>}/>
              <Route path='users' element={<UserLayout/>}/>
              <Route path='admin' element={<>Admin Home</>}/>
              <Route path='products' element={<>Products</>}/>
            </Route>
            </>
          ) : (
            <Route path='/' element={<SingInPage/>} />
          )
      }
        <Route path='/' element={<>404 Not Found</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
