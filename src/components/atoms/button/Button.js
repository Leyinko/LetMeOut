import './Button.css';

const Button = (title, className, role, type, parent) => {
  let button = document.createElement('button');
  button.setAttribute('role', role);
  button.type = type;
  button.className = className;
  button.textContent = title;
  parent.appendChild(button);
};

export default Button;
