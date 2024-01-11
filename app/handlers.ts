import {Data, Photo, Photograph} from "@/app/models"
import {API_PUBLIC_KEY, BASE_URL, COLLECTION_ID} from "@/app/env.variables"
import {mockedData} from "@/app/mockedData"

function dataExtractor(data: Data): {photo: Photo; photograph: Photograph} {
	// console.log("Hi")

	// console.log(data)
	const photo = new Photo(data)
	const photograph = new Photograph(data.user)

	return {photo, photograph}
}
async function unsplashGetRequest(): Promise<Data | Error> {
	const URL = `${BASE_URL}?client_id=${API_PUBLIC_KEY}&collections=${COLLECTION_ID}`

	const response = await fetch(URL, {next: {revalidate: 3600 * 24}})

	if (response.status === 200) {
		const data = response.json()
		return data satisfies Promise<Data>
	} else if (response.status === 403) {
		return mockedData
	} else {
		throw new Error(response.status.toString())
	}
}

export async function fetchData() {
	try {
		const data = await unsplashGetRequest()
		if (data instanceof Error) {
			return
		}
		const {photo, photograph} = dataExtractor(data)
		return {photo, photograph}
	} catch (error) {
		throw error
	}
}
