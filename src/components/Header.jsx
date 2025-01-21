import React from "react";

export default function Header() {
  return (
    <header className="shadow sticky bg-zinc-800 w-full z-50 top-0">
      <nav className=" flex justify-center align-middle border-b-yellow-600  py-2.5">
        <div className="flex justify-between items-center w-full mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <a href="#">
            <div className="font-bold text-2xl font-lavishly text-gray-500 ml-1">
              <span className="text-3xl text-yellow-600 pr-1">A</span>
              shutosh</div>
          </a>

          

          <div className="flex w-auto">

            <a href="#contact"
              className="bg-zinc-900 text-yellow-600 font-bold py-2 px-6 rounded-lg shadow-sm hover:shadow-yellow-600 transition">
              Get in touch
            </a>
          </div>
        </div>

      </nav>
      <hr className="border-yellow-600" />
    </header>

  );
}
