import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 p-5 md:p-10 text-white flex flex-col md:flex-row justify-center align-middle relative box-border overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-fixed bg-center"
        style={{
          backgroundImage: 'url("/images/rs-logo.png")', // Replace with your image URL
          zIndex: 0,
        }}
      />
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-2 min-h-screen" />

      {/* Dotted Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 z-10 hidden lg:block">
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
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 shadow-lg shadow-red-500/50 rounded-full">
        <Link to="/">
          <img
            src="/images/logo.png" // Replace with your image URL
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          />
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="container w-full px-5 md:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-4 relative z-10">
        {/* Text Content */}
        <div className="w-full flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Modern
              <br />
              Landing
            </h1>
          </div>

          <p className="text-gray-400 max-w-lg">
            Create stunning and impactful web experiences with this modern,
            minimalist design approach.
          </p>

          {/* Date */}
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
              <span className="text-white text-md font-bold">24.02.2025</span>
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
              <span className="text-white text-md font-bold">10:00 AM</span>
            </div>
          </div>

          <a href="/form" className="w-full flex">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 w-full md:w-3/4 rounded-sm
              transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-red-600/50"
            >
              Get Started
            </button>
          </a>
        </div>

        {/* About Section */}
        <div className="w-full flex flex-col justify-center space-y-4 relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <hr className="w-1/6" />
          <p className="text-gray-300 font-semibold text-lg md:text-xl max-w-md">
            This is a modern landing page that is designed to be minimalist and impactful. It is perfect for showcasing your web app or other products.
          </p>
        </div>

        {/* Contact Section */}
        <div className="w-full flex flex-col justify-center space-y-4 relative">
          <hr className="w-1/6" />
          <p className="text-gray-300 font-semibold text-lg md:text-xl max-w-md">
            Contact us on our social media platforms or mail us for any queries.
          </p>
          <div className="flex items-center space-x-4">
            {/* Add social icons */}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full relative z-10 flex justify-center">
          <img
            src="/images/image-1.png" // Replace with your image URL
            alt="Featured"
            className="object-cover rounded-lg shadow-sm hover:shadow-lg shadow-red-200/20 w-2/4 lg:w-3/4 h-48 lg:h-auto border-double border-4 border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;










// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="min-h-screen w-full bg-gray-900 p-10 text-white flex justify-center align-middle
//      relative box-border overflow-x-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-contain bg-no-repeat bg-fixed bg-center"
//         style={{
//           backgroundImage: 'url("/images/rs-logo.png")', // Replace with your image URL
//           zIndex: 0,
//         }}
//       />
//       {/* Glass Effect Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-2 min-h-screen" />

//       {/* Dotted Pattern */}
//       <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 z-10">
//         <div className="grid grid-cols-12 gap-2">
//           {[...Array(48)].map((_, index) => (
//             <div
//               key={index}
//               className="w-2 h-2 bg-red-500 rounded-full shadow-red-500/70 shadow-lg"
//             />
//           ))}
//         </div>
//       </div>





//       {/* Logo */}
//       <div className="absolute top-6 left-6 z-10 shadow-lg shadow-red-500/50 rounded-full">
//       <Link to="/">
//         <img
//           src="/images/logo.png" // Replace with your image URL
//           alt="Logo"
//           className="w-16 h-16 rounded-full"
//         />
//         </Link>
//       </div>



//       {/* Main Content Container */}
//       <div className="container w-full ml-15 px-20 py-16 grid grid-cols-2 gap-x-4 relative z-10">
//         {/* Text Content */}
//         <div className="w-1/2 flex flex-col  justify-center space-y-8">
//           <div className="space-y-4">


//             <h1 className="text-6xl font-bold tracking-tight">
//               Modern
//               <br />
//               Landing
//             </h1>
//           </div>

//           <p className="text-gray-400 max-w-lg">
//             Create stunning and impactful web experiences with this modern,
//             minimalist design approach.
//           </p>
//           {/* date */}
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-white text-md font-bold">24.02.2025</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8a1 1 0 00-1-1H7a1 1 0 100 2h2a1 1 0 001-1zm-1 4a1 1 0 100-2H7a1 1 0 100 2h2z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="text-white text-md font-bold">10:00 AM</span>
//             </div>
//           </div>

//           <a href="/form" className='w-full flex'>
//             <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 w-3/4 rounded-sm
//             transition duration-300 ease-in-out transform hover:-translate-y-1 
//             shadow-lg shadow-red-600/50"

//             >
//               Get Started
//             </button>
//           </a>
//         </div>
//         {/* a about section where there are some information */}
//         <div className="w-full flex flex-col p-1 justify-center space-y-4 relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
//           <hr className='w-1/6 ' />
//           <p className="text-gray-300 font-semibold text-xl max-w-md">
//             This is a modern landing page that is designed to be minimalist and impactful. It is perfect for showcasing your web app or other products.This is a modern landing page that is designed to be minimalist and impactful. It is perfect for showcasing your web app or other products.
//           </p>
//         </div>

//         {/* Contact section where instagram , website , twitter , mail links will be in a tag with the icons and some animations */}
//           <div className="w-full flex flex-col p-1 justify-center space-y-4 relative transition duration-500 ease-in-out transform hover:-translate-y-1 ">
//             <hr className='w-1/6 ' />
//             <p className="text-gray-300 font-semibold text-xl max-w-md">
//               Contact us on our social media platforms or mail us for any queries.
//             </p>

//             <div className="flex items-center space-x-4">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition duration-300
//               hover:shadow-lg hover:shadow-red-500/50"
//               >
//                 <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//                 >
//             <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-3.5 19h-2.5v-6.5h2.5v6.5zm-1.25-7.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm6.25 7.5h-2.5v-3.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v3.5h-2.5v-6.5h2.5v1.25c.828-.828 2.172-1.25 3.5-1.25 2.485 0 4.5 2.015 4.5 4.5v2.5z"/>
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition duration-300
//               hover:shadow-lg hover:shadow-red-500/50"
//               >
//                 <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//                 >
//             <path d="M12 2.163c-5.468 0-9.837 4.369-9.837 9.837 0 4.354 2.82 8.065 6.73 9.387-.092-.8-.175-2.03.035-2.91.19-.82 1.23-5.23 1.23-5.23s-.31-.62-.31-1.54c0-1.44.835-2.52 1.87-2.52.88 0 1.31.66 1.31 1.45 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.51 1.85 1.81 0 3.2-1.91 3.2-4.67 0-2.44-1.75-4.15-4.25-4.15-2.9 0-4.6 2.17-4.6 4.41 0 .88.34 1.82.77 2.33.08.1.09.19.07.29-.08.32-.25 1.02-.28 1.16-.04.18-.14.22-.32.13-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.82 6.35-5.82 3.33 0 5.92 2.37 5.92 5.54 0 3.31-2.08 5.98-4.97 5.98-1.02 0-1.98-.53-2.31-1.15 0 0-.55 2.1-.68 2.62-.2.75-.6 1.5-.96 2.08.72.22 1.48.34 2.27.34 5.468 0 9.837-4.369 9.837-9.837 0-5.468-4.369-9.837-9.837-9.837z"/>
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition duration-300
//               hover:shadow-lg hover:shadow-red-500/50"
//               >
//                 <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//                 >
//             <path d="M12 12.713l11.985-7.213c-.021-.011-11.985-7.5-11.985-7.5s-11.964 7.489-11.985 7.5l11.985 7.213zm0 2.287l-12-7.25v11.75c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-11.75l-12 7.25z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Image Section */}
//         <div className="w-full relative z-10 ">
//           <img
//             src="/images/image-1.png" // Replace with your image URL
//             alt="Featured"
//             className="object-cover rounded-lg shadow-sm hover:shadow-lg hover:shadow-red-900/70 shadow-red-200/20 w-2/4 h-3/4 border-double border-4 border-gray-600"
//           />


//         </div>
//       </div>

//       {/* Social Links */}
//       {/* <div className="absolute bottom-8 left-6 space-x-4 z-10">
//         <a
//           href="#"
//           className="text-gray-400 hover:text-white transition duration-300 
//           hover:shadow-lg hover:shadow-red-500/50"
//         >
//           Facebook
//         </a>
//         <a
//           href="#"
//           className="text-gray-400 hover:text-white transition duration-300 
//           hover:shadow-lg hover:shadow-red-500/50"
//         >
//           Instagram
//         </a>
//       </div> */}
//     </div>
//   );
// };

// export default Home;
