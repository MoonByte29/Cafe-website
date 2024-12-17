import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="bg-gray-800">

      {/* Footer Content */}
      <footer className="text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">Cafe Delight</h3>
              <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Cafe Delight. All Rights Reserved.</p>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
