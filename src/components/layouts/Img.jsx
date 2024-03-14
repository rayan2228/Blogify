const Img = ({ src, alt, className, ...attributes }) => {
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        {...attributes}
      />
    </picture>
  );
};

export default Img;
