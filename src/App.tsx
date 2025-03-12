import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram,Facebook, Phone, Mail, Star, Clock, MapPin, Send, Sun, Moon } from 'lucide-react';
import { supabase, Review, GalleryImage, Quote, Service } from './supabase';
import { useTheme } from './ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [newReview, setNewReview] = useState({ name: '', review: '', rating: 5 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 5;

  useEffect(() => {
    fetchReviews();
    fetchImages();
    fetchQuotes();
    fetchServices();

    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  }

  async function fetchQuotes() {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*');
      
      if (error) throw error;
      setQuotes(data || []);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    }
  }

  async function fetchReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReviews(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([newReview]);

      if (error) throw error;

      setNewReview({ name: '', review: '', rating: 5 });
      fetchReviews();
      setError(null);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again later.');
    }
  };

  // Function to handle next page
  const nextPage = () => {
    if ((currentPage + 1) * reviewsPerPage < reviews.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Calculate the current reviews to display
  const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

  // Butterfly component for decoration
  const Butterfly = () => (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        width: '20px',
        height: '20px',
      }}
    >
      <div className="animate-butterfly text-pink-400">🦋</div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-primary-light' : 'bg-gray-900'} theme-transition`}>
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
      >
        {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </motion.button>

      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[600px] group hero-gradient overflow-hidden"
      >
        {/* Decorative butterflies */}
        <div className="absolute inset-0 overflow-hidden">
          <Butterfly />
          <div className="absolute top-1/4 right-1/4">
            <Butterfly />
          </div>
          <div className="absolute bottom-1/4 left-1/3">
            <Butterfly />
          </div>
        </div>

        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1591160958042-798ef1af5c14?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/90 via-pink-200/80 to-pink-100/90 dark:from-pink-900/90 dark:via-pink-800/80 dark:to-pink-900/90" />
        </motion.div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4 animate-float text-pink-800 dark:text-pink-200"
          >
            Esha Henna Hub
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl mb-8 text-pink-700 dark:text-pink-300"
          >
            Creating beautiful memories with traditional & modern henna designs
          </motion.p>
          <motion.a 
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg animate-sparkle"
          >
            Book Now
          </motion.a>
        </div>
      </motion.header>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatePresence mode="wait">
            {quotes[currentQuote] && (
              <motion.div
                key={quotes[currentQuote].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="italic text-xl text-pink-700 dark:text-pink-300"
              >
                "{quotes[currentQuote].text}"
                <p className="mt-2 text-sm text-pink-500 dark:text-pink-400">
                  - {quotes[currentQuote].author}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-pink-800 dark:text-pink-200">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg theme-transition border-2 border-pink-100 dark:border-pink-900"
                >
                  <h3 className="text-xl font-semibold mb-4 text-pink-700 dark:text-pink-300">{service.title}</h3>
                  <p className="text-pink-600 dark:text-pink-400 mb-4">{service.description}</p>
                  <p className="text-pink-800 dark:text-pink-200 font-semibold">{service.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Gallery Section */}
      {images.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800 px-4 theme-transition">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-pink-800 dark:text-pink-200">Our Work</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, i) => (
                <motion.div 
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, zIndex: 1 }}
                  className="aspect-square overflow-hidden rounded-lg shadow-lg"
                >
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-pink-800 dark:text-pink-200">Customer Reviews</h2>
                  {/* Review Form */}
                  <motion.form 
            onSubmit={handleSubmitReview}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto mb-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg theme-transition border-2 border-pink-100 dark:border-pink-900"
          >
            <h3 className="text-xl font-semibold mb-4 text-pink-700 dark:text-pink-300">Share Your Experience</h3>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-pink-700 dark:text-pink-300 text-sm font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 dark:text-pink-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-pink-700 dark:text-pink-300 text-sm font-bold mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 dark:text-pink-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 h-24"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-pink-700 dark:text-pink-300 text-sm font-bold mb-2">
                Rating
              </label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                className="shadow border rounded w-full py-2 px-3 text-pink-700 dark:text-pink-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Review
            </motion.button>
          </motion.form>
          
          {/* Review Slider */}
          <div className="flex overflow-x-auto space-x-4">
            {currentReviews.map((review, i) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg theme-transition border-2 border-pink-100 dark:border-pink-900 flex-shrink-0 w-64"
              >
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-pink-500 fill-current" />
                  ))}
                </div>
                <p className="text-pink-600 dark:text-pink-400 mb-4">"{review.review}"</p>
                <p className="font-semibold text-pink-700 dark:text-pink-300">{review.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {Math.ceil(reviews.length / reviewsPerPage) > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 0} 
                className={`bg-pink-600 text-white px-4 py-2 rounded-l ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>
              <span className="mx-2 text-pink-600 dark:text-pink-300">
                Page {currentPage + 1} of {Math.ceil(reviews.length / reviewsPerPage)}
              </span>
              <button 
                onClick={nextPage} 
                disabled={(currentPage + 1) * reviewsPerPage >= reviews.length} 
                className={`bg-pink-600 text-white px-4 py-2 rounded-r ${((currentPage + 1) * reviewsPerPage >= reviews.length) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 bg-pink-600 dark:bg-gray-800 px-4 theme-transition">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-8">Book Your Appointment</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {[
              { icon: Phone, text: "Phone", href: "tel:+91 63740 44646" },
              { icon: Instagram,text:"Instagram", href: "https://www.instagram.com/esha_henna_hub/?hl=en" },
             // { icon: Mail, text: "book@mehndidesign.com", href: "mailto:book@mehndidesign.com" },
              { icon: Clock, text: "Mon-Sat: 10AM-7PM", href: null },
              { icon: MapPin, text: "Service Available in Madurai", href: "" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.text}</span>
                  </a>
                ) : (
                  <>
                    <item.icon className="w-6 h-6" />
                    <span>{item.text}</span>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row justify-center">
          <p className="text-center">© 2025 Esha Henna Hub ❤️. All rights reserved.</p>
      
        </div>
      </footer>
    </div>
  );
}

export default App;