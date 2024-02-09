import './Button.css';

const Button = (title, className, type, parent) => {
  let button = document.createElement('button');
  button.setAttribute('role', 'lobby-buttons');
  button.type = type;
  button.className = className;
  button.textContent = title;
  parent.appendChild(button);
};

export default Button;
