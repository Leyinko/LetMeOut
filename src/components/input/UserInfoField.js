import './UserInfoField.css';

const UserInfoField = (title, forAttr) => {
  return `
        <h3 role="label" for="${forAttr}">${title}</h3>
				<input type="text" name="${forAttr}" id="${forAttr}">
    `;
};

export default UserInfoField;
