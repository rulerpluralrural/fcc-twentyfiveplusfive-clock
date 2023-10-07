import React from "react";
import PropTypes from "prop-types";

export default class Break extends React.Component {
	static propTypes = {
		breakMinutes: PropTypes.number,
		breakSeconds: PropTypes.number,
	};
	/**@param {{breakMinutes: number, breakSeconds: number}} props*/
	constructor(props) {
		super(props);
	}

	handletime() {
		const minutes =
			this.props.breakMinutes < 10
				? "0" + this.props.breakMinutes
				: this.props.breakMinutes;
		const seconds =
			this.props.breakSeconds < 10
				? "0" + this.props.breakSeconds
				: this.props.breakSeconds;

		return `${minutes}:${seconds}`
	}

	render() {
		return (
			<div
				id="time-left"
				className={`tracking-wider ${
					this.props.breakMinutes < 1 ? "text-red-600" : "text-white"
				}`}
			>
				{this.handletime()}
			</div>
		);
	}
}
