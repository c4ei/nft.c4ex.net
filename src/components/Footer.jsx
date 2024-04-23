import React from 'react'

const Footer = () => {
  return (
    <div className="w-4/5 flex sm:flex-row flex-col justify-between items-center my-4 mx-auto py-5">
      <div className="hidden sm:flex flex-1 justify-start items-center space-x-12">
        {/* <p className="text-white text-base text-center cursor-pointer">
          Artist
        </p>
        <p className="text-white text-base text-center cursor-pointer">
          Features
        </p>
        <p className="text-white text-base text-center cursor-pointer">
          Community
        </p> */}
        {/* <p className="text-white text-base text-center cursor-pointer"><a href="/" className="mx-4 cursor-pointer">Market</a></p>
        <p className="text-white text-base text-center cursor-pointer"><a href="/collections" className="mx-4 cursor-pointer">Collection</a></p> */}
        {/* <p className="text-white text-base text-center cursor-pointer"><a href="https://c4ei.net" target="_blank" rel="noopener noreferrer">AAH Home</a></p>
        <p className="text-white text-base text-center cursor-pointer"><a href="https://c4ex.net" target="_blank" rel="noopener noreferrer">Buy AAH</a></p> */}
      </div>

      {/* <p className="text-white text-right text-xs"> &copy;2024 All rights reserved </p> */}
      <p className="text-white text-base text-center cursor-pointer"><a href="/" className="mx-4 cursor-pointer">Market</a></p>
      <p className="text-white text-base text-center cursor-pointer"><a href="/collections" className="mx-4 cursor-pointer">Collection</a></p>
      <p className="text-white text-base text-center cursor-pointer"><a href="https://c4ei.net/home" className="mx-4 cursor-pointer" target="_blank" rel="noopener noreferrer">AAH</a></p>
      <p className="text-white text-base text-center cursor-pointer"><a href="https://c4ex.net" className="mx-4 cursor-pointer" target="_blank" rel="noopener noreferrer">AAH Buy</a></p>
      <p className="text-white text-base text-center cursor-pointer"><a href="https://docs.google.com/document/d/1S3HcMW2EmzvCEtDeF4JdSrbZOuO0JdPOHl5Stc0lhbE/edit?usp=sharing" target="_blank" className="mx-4 cursor-pointer" rel="noopener noreferrer">사용법(DOC)</a></p>
    </div>
  )
}

export default Footer
