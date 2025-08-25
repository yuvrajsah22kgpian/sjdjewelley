import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className = "", ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`object-contain ${className}`}
      {...props}
    />
  );
};

export default Image;
