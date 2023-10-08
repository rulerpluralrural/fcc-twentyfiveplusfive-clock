// eslint-disable-next-line no-unused-vars
import React, { createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faArrowUp,
	faArrowsRotate,
	faCirclePlay,
	faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import Session from "./Session";
import Break from "./Break";

const flexCenter = "flex justify-center items-center";

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPaused: true,
			breakLength: 5,
			sessionLength: 25,
			sessionMinutes: 25,
			sessionSeconds: 0,
			isSessionFinished: false,
			breakMinutes: 5,
			breakSeconds: 0,
			isBreakFinished: true,
		};
		this.audioRef = createRef();

		this.increaseBreak = () => {
			if (this.state.breakLength >= 60) return;
			if (!this.state.isPaused) return;
			this.setState((state) => ({
				breakLength: state.breakLength + 1,
				breakMinutes: state.breakLength + 1,
				breakSeconds: 0,
			}));
		};

		this.decreaseBreak = () => {
			if (this.state.breakLength <= 1) return;
			if (!this.state.isPaused) return;
			this.setState((state) => ({
				breakLength: state.breakLength - 1,
				breakMinutes: state.breakLength - 1,
				breakSeconds: 0,
			}));
		};

		this.increaseSession = () => {
			if (this.state.sessionLength >= 60) return;
			if (!this.state.isPaused) return;
			this.setState((state) => ({
				sessionLength: state.sessionLength + 1,
				sessionMinutes: state.sessionLength + 1,
				sessionSeconds: 0,
			}));
		};

		this.decreaseSession = () => {
			if (this.state.sessionLength <= 1) return;
			if (!this.state.isPaused) return;
			this.setState((state) => ({
				sessionLength: state.sessionLength - 1,
				sessionMinutes: state.sessionLength - 1,
				sessionSeconds: 0,
			}));
		};

		this.resetClock = () => {
			this.audioRef.current.pause();
			this.audioRef.current.currentTime = 0;
			this.setState({
				isPaused: true,
				sessionLength: 25,
				sessionMinutes: 25,
				sessionSeconds: 0,
				breakLength: 5,
				breakMinutes: 25,
				breakSeconds: 0,
				isBreakFinished: true,
				isSessionFinished: false,
			});
		};

		this.startSession = () => {
			this.setState((state) => ({
				isPaused: !state.isPaused,
			}));
		};

		this.stopSession = () => {
			this.setState((state) => ({
				isPaused: !state.isPaused,
			}));
		};

		this.startSessionCount = () => {
			if (this.state.isPaused) return;
			if (!this.state.isBreakFinished) return;
			if (this.state.sessionMinutes === 0 && this.state.sessionSeconds === 0) {
				this.setState((state) => ({
					isSessionFinished: true,
					isBreakFinished: false,
					sessionMinutes: state.sessionLength,
				}));
				this.audioRef.current.play();
				return;
			}
			if (this.state.sessionSeconds <= 0) {
				this.setState((state) => ({
					sessionSeconds: 59,
					sessionMinutes: state.sessionMinutes - 1,
				}));
				return;
			}
			this.setState((state) => ({
				sessionSeconds: state.sessionSeconds - 1,
			}));
		};

		this.startBreakCount = () => {
			if (this.state.isPaused) return;
			if (!this.state.isSessionFinished) return;
			if (this.state.breakMinutes === 0 && this.state.breakSeconds === 0) {
				this.setState((state) => ({
					isBreakFinished: true,
					isSessionFinished: false,
					breakMinutes: state.breakLength,
				}));
				this.audioRef.current.play();
				return;
			}
			if (this.state.breakSeconds <= 0) {
				this.setState((state) => ({
					breakSeconds: 59,
					breakMinutes: state.breakMinutes - 1,
				}));
				return;
			}
			this.setState((state) => ({
				breakSeconds: state.breakSeconds - 1,
			}));
		};
		setInterval(this.startSessionCount, 1000);
		setInterval(this.startBreakCount, 1000);
	}

	render() {
		return (
			<div
				className={`bg-slate-800 text-white text-center rounded-full h-[500px] w-[500px] flex items-center flex-col overflow-hidden border-2 border-slate-100`}
			>
				<h1 className="py-3 text-3xl underline mt-28">
					FreeCodeCamp 25 + 5 Clock
				</h1>
				<div className="flex justify-around w-full items-center py-3">
					<div>
						<div id="break-label" className="underline text-2xl">
							Break Length
						</div>
						<div className={`${flexCenter} gap-3 text-2xl mt-2`}>
							<button id="break-decrement">
								<FontAwesomeIcon
									icon={faArrowDown}
									className="hover:text-red-400"
									onClick={this.decreaseBreak}
								/>
							</button>
							<p id="break-length">{this.state.breakLength}</p>
							<button id="break-increment">
								<FontAwesomeIcon
									icon={faArrowUp}
									className="hover:text-green-400"
									onClick={this.increaseBreak}
								/>
							</button>
						</div>
					</div>
					<div>
						<div id="session-label" className="underline text-2xl">
							Session Length
						</div>
						<div className={`gap-3 ${flexCenter} text-2xl mt-2`}>
							<button id="session-decrement">
								<FontAwesomeIcon
									icon={faArrowDown}
									className="hover:text-red-400"
									onClick={this.decreaseSession}
								/>
							</button>
							<p id="session-length">{this.state.sessionLength}</p>
							<button id="session-increment">
								<FontAwesomeIcon
									icon={faArrowUp}
									className="hover:text-green-400"
									onClick={this.increaseSession}
								/>
							</button>
						</div>
					</div>
				</div>
				<div
					className={`h-[180px] w-[180px] bg-slate-900 rounded-full flex justify-evenly flex-col border-2 text-2xl`}
				>
					<div id="timer-label" className="underline">
						{this.state.isSessionFinished ? "Break" : "Session"}
					</div>
					<div>
						{!this.state.isSessionFinished ? (
							<Session
								sessionMinutes={this.state.sessionMinutes}
								sessionSeconds={this.state.sessionSeconds}
							/>
						) : (
							<Break
								breakMinutes={this.state.breakMinutes}
								breakSeconds={this.state.breakSeconds}
							/>
						)}
					</div>
					<div>
						<button id="start_stop">
							<FontAwesomeIcon
								icon={faCirclePlay}
								className="mr-2 hover:text-green-400"
								onClick={this.startSession}
							/>
							<FontAwesomeIcon
								icon={faCirclePause}
								className="hover:text-red-400"
								onClick={this.stopSession}
							/>
						</button>
						<button id="reset" className="ml-2">
							<FontAwesomeIcon
								icon={faArrowsRotate}
								className="hover:text-gray-400"
								onClick={this.resetClock}
							/>
						</button>
					</div>
				</div>
				<div>
					<audio
						id="beep"
						ref={this.audioRef}
						src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
					></audio>
				</div>
			</div>
		);
	}
}
