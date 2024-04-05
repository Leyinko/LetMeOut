import './SelectDifficulty.css';

const SelectDifficulty = (title, forAttr) => {
  return `
			<h3 role="label" for="${forAttr}">${title}
				<span style="font-family:'JMH'">?</span>
			</h3>
			<div class="difficulty-container">
				<h4>Easy</h4>
				<h4>Normal</h4>
				<h4>Hard</h4>
			</div>
    `;
};

export default SelectDifficulty;
