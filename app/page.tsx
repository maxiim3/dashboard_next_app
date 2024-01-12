import {TimeWidget} from "@/app/timeWidget"
import {fetchData} from "@/app/handlers"
import {notFound} from "next/navigation"
import React, {Suspense} from "react"
import Link from "next/link"
import {tursoClient} from "@/lib/tursoClient"
import {Visitors} from "@/lib/schemas"

async function getVisitors(month?:string) {
	"use server"
	try {
		const res = await tursoClient().execute(`select * from visitors where month=\"${month}\";`)
        
		return {
			visitors: res.rows[0] as unknown as Visitors,
		}
	} catch (error) {
		console.error(error)
		return {
			visitors: {} as Visitors,
		}
	}
}

function getTodaysDate() {
	const today = new Date()
	const isoDate = today.toISOString().split("T")
	return `${isoDate[0]} ${isoDate[1].split(".")[0]}`
}

async function updateVisitors() {
	try {

		const query = `update visitors set counter=counter+1 where month="2024-01";`
		const res = await tursoClient().execute(query)
		// return {
		console.log(res.rows)
		// 	visitors: res.rows as unknown as Visitors[],
		// }
	} catch (error) {
		console.error(error)
		// return {
		// 	visitors: [],
		// }
	}
}


export default async function Home() {
	const result = await fetchData()
    await updateVisitors()
    const {visitors} = await getVisitors("2024-01")!

console.log("HOME : ", visitors);

	if (!result) {
		notFound()
	}

	const {photo, photograph} = result

	return (
		<main
			id={"app"}
			className="relartive bg-neutral-50 w-screen h-screen m-0 p-0 ">
			<Suspense fallback={<></>}>
				<figure
					id="img-container"
					className={"w-full h-full m-0 p-0 overflow-hidden"}>
					<img
						className={"w-full h-screen object-cover object-center"}
						src={photo.urls.full}
						alt={photo.alt_description}
					/>
				</figure>
                <div className='bg-slate-400/50 text-info-500 p-8'>Visitors: {visitors.counter}</div>
				<aside
					id="information"
					className={
						"absolute flex-col md:flex-row gap-1 text-sm md:text-base bottom-0 flex-wrap right-0 px-4 z-50 py-5 m-5 bg-neutral-900/80 rounded-2xl flex md:gap-3 shadow-2xl"
					}>
					<p>Credits: {photograph.name}</p>
					{photograph?.portfolio && (
						<Link
							className={"underline underline-offset-2"}
							prefetch={false}
							href={photograph.portfolio}>
							Portfolio
						</Link>
					)}
					{photograph?.profilPage && (
						<Link
							className={"underline underline-offset-2"}
							prefetch={false}
							href={photograph.profilPage}>
							Unsplash profil
						</Link>
					)}
				</aside>
			</Suspense>
			<TimeWidget />
		</main>
	)
}
