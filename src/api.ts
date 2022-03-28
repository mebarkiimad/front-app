/** @format */

const getDataByIpCheck = async () => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/character`,
	)
	const res = response.json()
	console.log(res)
	return res
}

export default getDataByIpCheck
