/** @format */

import User from './model/user'
const user = new User()
console.log(user.number)
$(`.btn`).on(
	`click`,
	(
		value: JQuery.ClickEvent<
			HTMLElement,
			undefined,
			HTMLElement,
			HTMLElement
		>,
	) => {
		console.log(value.currentTarget.textContent)
	},
)
