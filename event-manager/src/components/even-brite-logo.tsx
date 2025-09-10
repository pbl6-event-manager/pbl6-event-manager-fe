import type React from "react"
import Logo from "../assets/Logo.svg"

const EventbriteLogo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <img
      src={Logo}
      alt="Eventbrite Logo"
      {...props} // cho phép override className, style, v.v
    />
  );
};

export default EventbriteLogo