import {TimeWidget} from "@/app/timeWidget"
import {fetchData} from "@/app/handlers"
import {notFound} from "next/navigation"
import React, {Suspense} from "react"
import Link from "next/link"

export default async function Home() {
	const result = await fetchData()

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
