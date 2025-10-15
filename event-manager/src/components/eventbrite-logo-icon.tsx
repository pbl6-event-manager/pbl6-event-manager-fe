import type React from "react"
import LogoIcon from "../assets/Logo-icon.svg"

const EventbriteLogoIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <img
      src={LogoIcon}
      alt="Eventbrite Logo Icon"
      {...props} 
    />
  );
};

export default EventbriteLogoIcon