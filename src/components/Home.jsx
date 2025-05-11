import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gray-900 p-5 md:p-10 text-white flex flex-col md:flex-row justify-center align-middle relative box-border overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-fixed bg-center"
        style={{
          backgroundImage: 'url("/images/rs-logo.png")',
          zIndex: 0,
        }}
      />
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/30  backdrop-blur-md z-2 min-h-screen" />

      {/* Dotted Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-40 z-10 hidden lg:block">
        <div className="grid grid-cols-12 gap-2">
          {[...Array(48)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-red-500 rounded-full shadow-red-500/70 shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex  gap-4">
        <Link to="/" className="shadow-lg shadow-red-500/50 rounded-full">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          />
        </Link>

        {/* Mobile Social Links - Only visible on mobile */}
        <div className="flex items-center space-x-4 ml-4 md:hidden ">
          <a
            href="https://vssutrobotics.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-green-500 text-2xl transition duration-300"
            title="Home"
          >
            <i className="fas fa-home"></i>
          </a>
          <a
            href="https://www.facebook.com/vssutrobotics/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-600 text-2xl transition duration-300"
            title="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com/societyrobotics?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 text-2xl transition duration-300"
            title="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/vssut_robotics/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-400 text-2xl transition duration-300"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/vssutrobotics/mycompany/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-700 text-2xl transition duration-300"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:your-email@example.com"
            className="text-gray-300 hover:text-red-500 text-2xl transition duration-300"
            title="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container w-full px-5 md:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-4 relative z-30">

        {/* Text Content  */}
          <div className="w-full flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                RoboXplore
              </h1>
            </div>

            <h4 className="text-gray-200 text-xl font-semibold max-w-md">
              Design. Develop. Dominate.
            </h4>

             Date 
            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
                >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
              clipRule="evenodd"
            />
                </svg>
                <span className="text-white text-md font-bold">8 Feb - 9 Feb</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
                >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8a1 1 0 00-1-1H7a1 1 0 100 2h2a1 1 0 001-1zm-1 4a1 1 0 100-2H7a1 1 0 100 2h2z"
              clipRule="evenodd"
            />
                </svg>
                <span className="text-white text-md font-bold">9:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="w-full flex">
              <button
                onClick={() => navigate('/form')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 w-full md:w-3/4 rounded-sm
              transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-red-600/50 z-30"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* About Section */}
        <div className="w-full flex flex-col items-start md:items-center justify-center space-y-4 relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <hr className="w-16 border-gray-500" />
          <p className="text-gray-300 font-semibold text-lg md:text-xl text-left md:text-center max-w-lg">
            Are you ready to step into the future of technology and innovation? At VSSUT Robotics Society, we
            bring you an unparalleled opportunity to dive into the world of robotics and automation through our
            Technical Workshop and Hands-On Competitions.
          </p>
        </div>

        

        <div className="w-full flex-col justify-center space-y-4 relative hidden md:flex">
          <hr className="w-1/6" />
          <p className="text-gray-300 font-semibold text-lg md:text-xl max-w-md">
            Contact us on our social media platforms or mail us for any queries.
          </p>
          <div className="flex items-center space-x-4">
            
            <a
              href="https://vssutrobotics.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-500 text-3xl transition duration-300 relative group"
            >
              <i className="fas fa-home"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                Home
              </span>
            </a>

           
            <a
              href="https://www.facebook.com/vssutrobotics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-600 text-3xl transition duration-300 relative group"
            >
              <i className="fab fa-facebook"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                Facebook
              </span>
            </a>

            
            <a
              href="https://twitter.com/societyrobotics?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 text-3xl transition duration-300 relative group"
            >
              <i className="fab fa-twitter"></i>
              <span className="hidden md:absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-300 rounded-lg bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                Twitter
              </span>
            </a>

            <a
              href="https://www.instagram.com/vssut_robotics/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 text-3xl transition duration-300 relative group"
            >
              <i className="fab fa-instagram"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                Instagram
              </span>
            </a>
            <a
              href="https://www.linkedin.com/company/vssutrobotics/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-700 text-3xl transition duration-300 relative group"
            >
              <i className="fab fa-linkedin"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                LinkedIn
              </span>
            </a>

            <a
              href="mailto:your-email@example.com"
              className="text-gray-300 hover:text-red-500 text-3xl transition duration-300 relative group"
            >
              <i className="fas fa-envelope"></i>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                Email
              </span>
            </a>
          </div>
        </div>

        
        <div className="w-full relative z-10 flex justify-center">
          <img
            src="/images/line following.png"
            alt="Featured"
            className="object-cover rounded-lg shadow-sm hover:shadow-lg shadow-red-200/20 w-2/5 lg:w-1/2 h-36 lg:h-auto border-double border-4 border-gray-600"
          />
        </div>
      </div>
      {/* <div className='w-3/4 flex flex-col  items-center justify-center h-min p-10 bg-white/70 rounded-lg my-auto transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-black font-bold tracking-tight">We have reached our maximum limit of participants. Stay tuned for more events.</h1>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-red-900 font-bold tracking-tight'>
            Website is closed for further registrations.
          </h1>
        </div> */}
    </div>
    
    
  );
};
export default Home