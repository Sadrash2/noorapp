import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import ReactSwipe from "react-swipe";
import {Link} from "react-router";
import functions from "../scss/styleFunctions";

class Timeline extends React.Component {

	constructor() {
		super();

		this.state = {
			milestones: [
				{title: "h1eey", content: "daaaaaaa"},
				{title: "hee2y", content: "daaaaaaa"},
				{title: "hee3y", content: "daaaaaaa"},
				{title: "hee4y", content: "daaaaaaa"},
				{title: "hee5y", content: "daaaaaaa"},
				{title: "hee6y", content: "daaaaaaa"},
			]
		};
		
	}

render() {

		let mobileLine = this.props.desktop ? "" : (
			<div className="o-timeline-line"></div>
		);

		let desktopLine = this.props.desktop ? (
			<div className="o-timeline-line"></div>
		) : "";

		let leftMilestones = this.props.desktop ? this.state.milestones.map(
			function(milestone, i){
				if(i%2 == 0) return;
				return (<div className="o-milestone" key={"milestone-" + i}>
					<div className="c-milestone-circle"></div>
					<div className="c-milestone-header">{milestone.title}</div>
					<div className="c-milestone-content">{milestone.content}</div>
				</div>);
			}) : "";



		let roadmap = this.props.desktop ? (
			<div className="roadmap">
				Roadmap
			</div>) : "";

		return (
			<InlineCss namespace="timeline" stylesheet={Timeline.css(this.props.arabic)}>
				{mobileLine}
				<div className="o-timeline-content">
					<h2>NOOR is still at the beginning</h2>
					<p>NOOR wurde explizit gestaltet um das Leben von Muslime zu vereinfachen. Dazu haben wir einige Features ausgebaut.</p>
					

					{roadmap}
					<div className="o-milestones">
						<div className="o-timeline-left">
							{leftMilestones}
						</div>
						{desktopLine}
						<div className="o-timeline-right">

							{this.state.milestones.map(function(milestone, i){
								if(i%2 != 0 && this.props.desktop) return;
								return (<div className="o-milestone" key={"o-milestone-"+i}>
									<div className="c-milestone-circle"></div>
									<div className="c-milestone-header">{milestone.title}</div>
									<div className="c-milestone-content">{milestone.content}</div>
								</div>);
							}.bind(this))}
						</div>
					</div>	

				</div>

			</InlineCss>
		);
	}


	static css(arabicToggle) {
		const base = `
			& {
				display: flex;
				position: relative;
				align-items: stretch;
				padding: 0 23px;
			}

			& .o-milestone {
				-webkit-box-shadow: 2px 2px 0 1px rgba(219,211,198,0.18);
				box-shadow: 2px 2px 0 1px rgba(219,211,198,0.18);
				width: 257px;
				border: 1px solid ${colors.dirtBackground};
				margin-bottom: 30px;
				position: relative;
			}

			& .c-milestone-circle {
				width: 22px;
				height: 22px;
				position: absolute;
				left: -34px;
    			top: 7px;
				border-radius: 11px;
				background-color: ${colors.orange};
			}

			& .o-milestone .c-milestone-header{
				height: 42px;
				background-color: ${colors.orange};
				
			}

			& .o-milestone .c-milestone-content{
				padding: 15px 7px;
				
			}

			& .o-timeline-content {
				padding-left: 20px;
				padding-top: 40px;
			}

			& .o-timeline-line {
				width: 4px;
				flex-shrink: 0;
				background-color: ${colors.orange};
			}

			@media (min-width: 768px) {

				#timeline {
					display: block;
				}

				#timeline .o-milestones {
					display: flex;
					justify-content: center;
				}

				#timeline .o-milestones .o-timeline-right {
					width: 257px;
				}

				#timeline .o-milestones .o-timeline-left {
					width: 257px;
				}

				#timeline .o-timeline-line {
					margin: 0 20px;
				}

				#timeline .o-timeline-left .c-milestone-circle {
					left: initial;
					right: -34px;
				}

				#timeline .o-milestone {
					margin-bottom: 200px;
				}

				#timeline .o-timeline-right .o-milestone:first-child{
					margin-bottom: 200px;
				}

				#timeline .o-timeline-left .o-milestone:first-child{
					margin-top: 150px;
				}

				#timeline .roadmap {
					width: 165px;
					height: 45px;
					margin: 0 auto;
					background-color: ${colors.orange};
					color: white;
					text-align: center;
					padding-top: 12px;
					border-radius: 5px;
				}

				#timeline .o-timeline-left, #timeline .o-timeline-right {
					padding-top: 150px;
				}

				#timeline .o-timeline-content {
					padding-left: 0;
				}

				#timeline .o-timeline-content > h2 {
					text-align: center;
					margin-bottom: 15px;
				}

				#timeline .o-content > p {
					width: 50%;
					margin: 0 auto;
					margin-bottom: 50px;
				}

			}

		`;

		const arabic = ``;

		return arabicToggle ? base + arabic : base;
	}

};

export default Timeline;