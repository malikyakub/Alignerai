import React from "react";

function Header() {
  return (
    <div className="navbar justify-between px-2 py-4 border-b-gold-100 border-b-[1px]">
      <a href="/">
        <img src="SVG/horizantallogo.svg" alt="logo" width={200} />
      </a>
      <a href="#" className="rounded-full shadow-orange-shadow">
        <img
          src="images/users/user1.jpg"
          alt="user1"
          width={50}
          className="rounded-full"
        />
      </a>
    </div>
  );
}

export default Header;
