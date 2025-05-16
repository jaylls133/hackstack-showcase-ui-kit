
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HackStack
            </span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/pricing-toggle" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/testimonial-carousel" className="hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link to="/todo-priority" className="hover:text-primary transition-colors">
              To-Do
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} HackStack. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
