import { Link } from "react-router";

const Footer = () => {
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
            <li><Link className="hover:underline" to="/login">Login</Link></li>
            <li><Link className="hover:underline" to="/register">Register</Link></li>
            <li><Link className="hover:underline" to="/dashboard">Dashboard</Link></li>
            <li><Link className="hover:underline" to="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p>📍 Dhaka, Bangladesh</p>
          <p>📧 support@parcelxpress.com</p>
          <p>📞 +880 123 456 789</p>
        </div>
      </div>

      <div className="border-t border-neutral-content/20 text-center py-4 text-sm opacity-70">
        &copy; {new Date().getFullYear()} ParcelXpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
