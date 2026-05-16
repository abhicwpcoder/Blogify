import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import UpdateBlog from './pages/UpdateBlog';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/:id/update" element={<UpdateBlog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
