import { FaHeart } from "react-icons/fa";
import React, { useState } from "react";

function Footer() {
  return (
    <div>
      <p className="flex items-center gap-1">
        made with <FaHeart className="text-xl mx-2" /> by{" "}
        <a href="https://github.com/malikyakub">malik yakub.</a>
      </p>
    </div>
  );
}

export default Footer;
