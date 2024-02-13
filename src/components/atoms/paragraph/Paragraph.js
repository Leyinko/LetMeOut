import './Paragraph.css';

const paragraph = (text, parentContainer) => {
  // Create
  const paragraph = document.createElement('p');
  paragraph.text = text;

  // Insert
  const parent = document.querySelector(parentContainer);
  parent.append(paragraph);
};

export default paragraph;