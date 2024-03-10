import './Version.css';

const Version = (textContent, parent) => {
  const span = document.createElement('span');
  span.className = 'version';
  span.textContent = textContent;
  parent.appendChild(span);
};

export default Version;
