import './SelectDifficulty.css';

const SelectDifficulty = (title, forAttr) => {
  return `
			<h3 role="label" for="${forAttr}">${title}</h3>
			<div id="difficulty-container">
				<img role="button" src='assets/images/icons/menu/question-mark.svg'>
				<h4 role="selection" >Easy</h4>
				<h4 role="selection" class="selected">Normal</h4>
				<h4 role="selection" >Hard</h4>
			</div>
    `;
};

export default SelectDifficulty;
