import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Footer from './Footer'

const Layout = () => {
    return (
        <main className='App'>
            <div className='page-wrapper'>
                <NavBar />
                    <div className='app-pages'></div>
                <Footer />
            </div>
            <Outlet />
        </main>
    );
};

export default Layout;


    // <>
    //   <Router>
    //     <div className='page-wrapper'>
    //       <NavBar />
    //       <div className='app-pages'>
    //         <Routes>
    //           <Route path="/profile" element={
    //             <PrivateRoute>
    //               <Profile />
    //             </PrivateRoute>
    //           }></Route>
    //           <Route path="/festivals" element={<Festivals />}></Route>
    //           <Route path="/login" element={<Login />}></Route>
    //           <Route path="signup" element={<SignUp />} />
    //           <Route path="/" element={<Home />}></Route>
    //           <Route path="/festivals/:id" element={<Festival />}></Route>
    //         </Routes>
    //       </div>

    //       <Footer />
    //     </div>

    //   </Router>
    // </>
