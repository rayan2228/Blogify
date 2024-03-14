import React from "react";

const InputField = ({
  label,
  className,
  htmlFor,
  error,
  children,
  labelClassName,
}) => {
  let id = htmlFor || getId(children);
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
};
const getId = (children) => {
  const child = React.Children.only(children);
  if ("id" in child?.props) {
    return child.props.id;
  }
};
export default InputField;
