import React from "react";
import PropTypes from "prop-types";

export default class Session extends React.Component {
	static propTypes = {
		sessionMinutes: PropTypes.number,
		sessionSeconds: PropTypes.number,
	};
	constructor(props) {
		super(props);
	}

	handletime() {
		const minutes =
			this.props.sessionMinutes < 10
				? "0" + this.props.sessionMinutes
				: this.props.sessionMinutes;
		const seconds =
			this.props.sessionSeconds < 10
				? "0" + this.props.sessionSeconds
				: this.props.sessionSeconds;

		return `${minutes}:${seconds}`
	}

	render() {
		return (
			<div
				id="time-left"
				className={`tracking-wider ${
					this.props.sessionMinutes < 1 ? "text-red-600" : "text-white"
				}`}
			>
				{this.handletime()}
			</div>
		);
	}
}
