const BaseInput = ({ placeholder, className, onInputChanged }) => {
  return (
    <input
      placeholder={placeholder}
      className={className}
      onChange={onInputChanged}
    ></input>
  );
};

export default BaseInput;
