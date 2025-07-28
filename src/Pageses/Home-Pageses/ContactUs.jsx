import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import NavBar from '../SharedPage/NavBar';
import Footer from '../SharedPage/Footer';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const res = await axiosInstance.post('/contact', { email, message });
      if (res.data.insertedId) {
        toast.success('Message sent successfully!');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <>
    <div>
        <NavBar></NavBar>
    </div>

    <div>
<div className="max-w-[100vw] w-full px-2 sm:px-4 py-10 sm:py-16 overflow-hidden">
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-blue-500 mb-2 break-words">
        Contact Us
      </h2>
      <p className="text-center text-xs sm:text-base text-gray-600 mb-6 sm:mb-10 px-2">
        Have questions or feedback? We'd love to hear from you.
      </p>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-8 bg-white rounded-xl shadow-md p-3 sm:p-6 overflow-hidden">
        {/* Address Section */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-6 shadow-sm text-xs sm:text-base break-words min-w-0">
          <h3 className="text-base sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-3">Our Address</h3>
          <p className="text-gray-800">📋 ManageEm</p>
          <p className="text-gray-800">Dhanmondi 32</p>
          <p className="text-gray-800">Level 4, Dhaka 1207, Bangladesh</p>
          <p className="text-gray-800 mt-2">
            Email:contact@manageem.com
            
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-xl p-3 sm:p-6 shadow-sm space-y-3 sm:space-y-4 text-xs sm:text-base break-words min-w-0"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-blue-600 transition w-full sm:w-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </div>

    <div>
        <Footer></Footer>
    </div>
    
    
    </>
  );
};

export default ContactUs;
