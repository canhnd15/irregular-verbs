const BaseButton = ({ text, className, onButtonClicked }) => {
  return (
    <button className={className} onClick={onButtonClicked}>
      {text}
    </button>
  );
};

export default BaseButton;
