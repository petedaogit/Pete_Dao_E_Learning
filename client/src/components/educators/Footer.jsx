import React from "react";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <footer>
      <div className="flex items-center gap-4 ">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          All rights reserved. Copyright @Edemy
        </p>
      </div>
      <div className="flex gap-5 ml-auto mr-10">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.instagram_icon} alt="" />
      </div>
    </footer>
  );
}

export default Footer;
