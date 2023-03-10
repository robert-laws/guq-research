import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Footer, PrivateRoute } from './components';
import {
  Home,
  Publications,
  Publication,
  AnnualReports,
  ResearchImpact,
  Contact,
  Authors,
  Author,
  Search,
  Profile,
  Login,
  NotFound,
} from './pages';
import {
  CreatePublication,
  UpdatePublication,
  CreateAuthor,
  UpdateAuthor,
} from './pages/admin';
import { DisplayJSON } from './utilities';
import AuthContext from './context/auth/authContext';

function App() {
  const { authenticatedUser, authIsReady } = useContext(AuthContext);

  return (
    <div className='bg-white flex flex-col min-h-screen'>
      {authIsReady && (
        <Router>
          <Navigation />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/publications' element={<Publications />} />
            <Route path='/publications/:id' element={<Publication />} />
            <Route path='/annual-reports' element={<AnnualReports />} />
            <Route path='/research-impact' element={<ResearchImpact />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='/authors' element={<Authors />} />
            <Route path='/authors/:id' element={<Author />} />

            {/* Search */}
            <Route path='/search' element={<Search />} />

            {/* Utilities */}
            <Route path='/json' element={<DisplayJSON />} />

            {/* Login */}
            <Route path='/login' element={<Login />} />

            {/* Private Routes */}
            <Route
              path='/admin/new'
              element={
                <PrivateRoute user={authenticatedUser}>
                  <CreatePublication />
                </PrivateRoute>
              }
            />

            <Route
              path='/admin/edit/:id'
              element={
                <PrivateRoute user={authenticatedUser}>
                  <UpdatePublication />
                </PrivateRoute>
              }
            />

            <Route
              path='/admin/author/new'
              element={
                <PrivateRoute user={authenticatedUser}>
                  <CreateAuthor />
                </PrivateRoute>
              }
            />

            <Route
              path='/admin/author/edit/:id'
              element={
                <PrivateRoute user={authenticatedUser}>
                  <UpdateAuthor />
                </PrivateRoute>
              }
            />

            {/* Profile */}
            <Route
              path='/profile'
              element={
                <PrivateRoute user={authenticatedUser}>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* 404 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
