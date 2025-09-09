import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { isActiveLink } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X, Car } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const [user, setUser] = useState<null | {username: string}>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Check for user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Simple logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/calculator", label: "Cost Calculator" },
  ];

  const navbarClass = `dark-glass fixed w-full z-50 px-4 sm:px-6 py-3 transition-all duration-300 ${
    scrolled ? "py-2 shadow-lg" : "py-3"
  }`;

  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-secondary-light" />
          <Link href="/">
            <span className="text-white font-poppins font-semibold text-xl cursor-pointer">
              TransportEase
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <a
                className={`nav-link ${
                  isActiveLink(location, link.path) ? "active text-white" : "text-gray-300 hover:text-white"
                } transition-colors duration-300`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/user/login">
                <Button
                  variant="outline"
                  className="btn-animate bg-transparent border border-white text-white hover:bg-white hover:text-dark rounded-full"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/user/register">
                <Button
                  className="btn-animate bg-secondary hover:bg-secondary-dark text-white rounded-full shadow-md"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-white">Hello, {user.username}</span>
              <Button
                variant="outline"
                onClick={logout}
                className="btn-animate bg-transparent border border-white text-white hover:bg-white hover:text-dark rounded-full"
              >
                Log Out
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white text-xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-3 px-4 py-4 dark-glass"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={`nav-link ${
                    isActiveLink(location, link.path) ? "active text-white" : "text-gray-300 hover:text-white"
                  } transition-colors duration-300`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            
            {!user ? (
              <>
                <Link href="/user/login">
                  <Button
                    variant="outline"
                    className="w-full btn-animate bg-transparent border border-white text-white hover:bg-white hover:text-dark rounded-full"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/user/register">
                  <Button
                    className="w-full btn-animate bg-secondary hover:bg-secondary-dark text-white rounded-full shadow-md"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <span className="text-white">Hello, {user.username}</span>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full btn-animate bg-transparent border border-white text-white hover:bg-white hover:text-dark rounded-full"
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
