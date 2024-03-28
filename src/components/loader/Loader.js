import './Loader.css';

const Loader = (parent) => {
  const container = document.createElement('div');
  const loader = document.createElement('img');
  container.className = 'loader';
  loader.src = '/assets/images/logos/Loader.gif';
  container.appendChild(loader);
  parent.appendChild(container);
};

export default Loader;
