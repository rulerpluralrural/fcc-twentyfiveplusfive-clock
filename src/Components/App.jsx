// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faArrowUp,
	faArrowsRotate,
	faCirclePlay,
	faCirclePause,
} from "@fortawesome/free-solid-svg-icons";

const flexCenter = "flex justify-center items-center"

export default class Counter extends React.Component {
	render() {
		return (
			<div className={`bg-slate-800 text-white text-center aspect-auto rounded-full h-[500px] w-[500px] ${flexCenter} flex-col overflow-hidden border-2 border-slate-100`}>
				<h1 className="py-3 text-3xl underline">FreeCodeCamp 25 + 5 Clock</h1>
				<div className="flex justify-around w-full items-center py-3">
					<div>
						<div id="break-label" className="underline text-2xl">Break Length</div>
						<div className={`${flexCenter} gap-3`}>
							<button id="break-decrement">
								<FontAwesomeIcon icon={faArrowDown} className="hover:text-red-400"/>
							</button>
							<p id="break-length">5</p>
							<button id="break-increment">
								<FontAwesomeIcon icon={faArrowUp} className="hover:text-green-400"/>
							</button>
						</div>
					</div>
					<div>
						<div id="session-label" className="underline text-2xl">Session Length</div>
						<div className={`gap-3 ${flexCenter}`}>
							<button id="session-decrement">
								<FontAwesomeIcon icon={faArrowDown} className="hover:text-red-400" />
							</button>
							<p id="session-length">5</p>
							<button id="session-increment">
								<FontAwesomeIcon icon={faArrowUp} className="hover:text-green-400"/>
							</button>
						</div>
					</div>
				</div>
				<div className={`h-[180px] w-[180px] bg-slate-900 rounded-full flex justify-evenly flex-col border-2`}>
					<div id="timer-label" className="underline">Session</div>
					<div id="timer-left">25:00</div>
					<div>
						<button id="start_stop" >
							<FontAwesomeIcon icon={faCirclePlay} className="mr-2 hover:text-green-400" />
							<FontAwesomeIcon icon={faCirclePause} className="hover:text-red-400" />
						</button>
						<button id="reset" className="ml-2">
							<FontAwesomeIcon icon={faArrowsRotate} className="hover:text-gray-400" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}
