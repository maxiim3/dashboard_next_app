"use client"

import {Suspense, useEffect, useState} from "react"

function getTime() {
	const date = new Date().toLocaleTimeString()
	return date.toString()
}

export function TimeWidget() {
	const [time, setTime] = useState("")

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = getTime()
			setTime(currentTime.toString())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<Suspense fallback={<></>}>
			<div
				className={
					"z-40 absolute top-0 left-0 w-screen h-screen flex justify-center items-start md:items-center p-[10%] box-border"
				}>
				<span className={"p-8 rounded-xl h-min bg-neutral-400/30 backdrop-blur"}>
					<p
						className={
							"text-4xl sm:text-6xl text-neutral-950 font-mono md:text-7xl lg:text-[120px] xl:text-[180px] tracking-tight"
						}>
						{time}
					</p>
				</span>
			</div>
		</Suspense>
	)
}
