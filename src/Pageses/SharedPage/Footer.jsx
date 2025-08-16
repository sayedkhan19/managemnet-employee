import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const {user} = useAuth();
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📋 ManageEm</h2>
          <p className="opacity-80 leading-relaxed">
            ManageEm is your all-in-one employee management system — track workloads, monitor contracts, handle payrolls, and empower your HR with intelligent tools.
          </p>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link className="hover:underline" to="/">Home</Link></li>
            
            
            {
              !user && <>
              <li><Link className="hover:underline" to="/login">Login</Link></li>
            <li><Link className="hover:underline" to="/register">Register</Link></li>
              </>
            }
            
            <li><Link className="hover:underline" to="/about">About</Link></li>
            <li><Link className="hover:underline" to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p>📍 Dhaka, Bangladesh</p>
          <p>📧 sayedkhansayed196@gmail.com</p>
          <p>📞 +8801799886487</p>
        </div>
      </div>

      <div className="border-t border-neutral-content/20 text-center py-4 text-sm opacity-70">
        &copy; {new Date().getFullYear()} ParcelXpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
