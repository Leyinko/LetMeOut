import './Menu.css';

const Menu = (title, className, parent) => {
  const select = document.createElement('h3');
  select.setAttribute('role', 'menu-select');
  select.className = className;
  select.textContent = title;
  parent.appendChild(select);
};

export default Menu;
