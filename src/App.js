import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Footer } from './components';
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
  NotFound,
} from './pages';
import {
  CreatePublication,
  UpdatePublication,
  CreateAuthor,
  UpdateAuthor,
} from './pages/admin';
import { DisplayJSON } from './utilities';

function App() {
  return (
    <div className='bg-white flex flex-col min-h-screen'>
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

          {/* Publications Refactor */}
          {/* <Route path='/publications-base' element={<PublicationsBase />} />
          <Route path='/publications-sort' element={<PublicationsSort />} />
          <Route path='/publications-filter' element={<PublicationsFilter />} />
          <Route path='/publications-search' element={<PublicationsSearch />} />
          <Route
            path='/publications-unified'
            element={<PublicationsUnified />}
          />
          <Route
            path='/publications-unified-2'
            element={<PublicationsUnifiedTwo />}
          /> */}

          {/* Private Routes */}
          <Route path='/admin/new' element={<CreatePublication />} />
          <Route path='/admin/edit/:id' element={<UpdatePublication />} />
          <Route path='/admin/author/new' element={<CreateAuthor />} />
          <Route path='/admin/author/edit/:id' element={<UpdateAuthor />} />

          {/* 404 */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
