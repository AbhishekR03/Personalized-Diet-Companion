const Label = ({ children, className, ...props }) => {
  return (
    <label className={`block text-gray-700 font-bold ${className}`} {...props}>
      {children}
    </label>
  );
};

export { Label };
