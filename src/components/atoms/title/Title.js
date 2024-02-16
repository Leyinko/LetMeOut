import './Title.css';

const title = (title, id, parent) => {
  const element = document.createElement('h1');
  element.id = id;
  element.textContent = title;
  parent.append(element);
};

export default title;
