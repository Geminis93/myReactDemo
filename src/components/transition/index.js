import React, { Component } from 'react';
import { Button } from 'antd';
import {
	CSSTransition,
	TransitionGroup,
} from 'react-transition-group';
import { Motion, spring, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import './index.scss';

class Transition extends Component {
	state = {
		showList: [],
		items: [],
		moveStyle: {
			top: spring(0),
			left: spring(0),
			scale: spring(1),
			opacity: spring(1),
		},
	};

	onChange() {
		const list = [
			{
				name: 'a',
				id: 1,
			},
			{
				name: 'b',
				id: 2,
			},
			{
				name: 'c',
				id: 3,
			},
		];
		const { showList } = this.state;
		this.setState({
			showList: showList.length > 0 ? [] : list,
		})
	}

	clickHandler() {
		const { items } = this.state;
		this.setState({
			items: items.length > 0 ? [] : [
				{ key: 'a', size: 100, },
				{ key: 'b', size: 200, },
				{ key: 'c', size: 300, },
			],
		});
	}

	willEnter() {
		return { width: 0, height: 0 };
	}
	
	willLeave() {
		return { width: spring(0), height: spring(0) };
  }

	onMouseEnter(event) {
		const top = event.clientY - this.mouseDiv.offsetTop;
		const left = event.clientX - this.mouseDiv.offsetLeft;

		this.setState({
			moveStyle: {
				top: spring(top - 25, presets.gentle),
				left: spring(left - 25, presets.gentle),
				scale: spring(0, presets.gentle),
				opacity: spring(0.2),
			}
		})
	}

	onMouseMove(event) {
		const top = event.clientY - this.mouseDiv.offsetTop;
		const left = event.clientX - this.mouseDiv.offsetLeft;

		this.setState({
			moveStyle: {
				top: spring(top - 25 < 0 ? 0 : top - 25, presets.gentle),
				left: spring(left - 25 < 0 ? 0 : left - 25, presets.gentle),
				scale: spring(0, presets.gentle),
				opacity: spring(0.2),
			}
		})
	}

	render() {
		const { showList, moveStyle } = this.state;
		const boxes = new Array(10).fill({ scale: 0 });
		const mouseItems = new Array(10).fill({
			top: 0,
			left: 0,
			scale: 0,
		});
		return (
			<div>
				<h3>react-transition-group <Button onClick={() => this.onChange()}>切换状态</Button></h3>
				<ul>
					<TransitionGroup>
						{
							showList.map(item => (
								<CSSTransition
									key={item.id}
									timeout={1000}
									classNames="style">
									<li key={item.id}>{item.name}</li>
								</CSSTransition>
							))
						}
					</TransitionGroup>
				</ul>

				<h3>Animate.css</h3>
				<div>
					<div className="animated fadeInLeftBig" style={{ 'background': '#CCC' }}>aaaaa</div>
				</div>

				<h3>React Motion</h3>
				<div style={{ 'position': 'relative' }}>
					<p>Motion</p>
					<Motion defaultStyle={{ x: 0, w: 1000 }} style={{ x: spring(1000), w: spring(200) }}>
						{value => <div style={{
							width: `${value.w}px`,
							textAlign: 'right',
							background: '#CCC',
							position: 'absolute',
							top: 0,
							left: `${value.x}px`
						}}>{value.x}</div>}
					</Motion>
				</div>
				<div>
					<p>StaggeredMotion</p>
					{
						<StaggeredMotion defaultStyles={boxes}
							styles={prevStyles => prevStyles.map((item, i) => {
								return i === 0
									? { scale: spring(1) }
									: prevStyles[i - 1]
							})}>
							{interpolatingStyles =>
								<div>
									{interpolatingStyles.map((item, i) => {
										return (
											<div
												key={i}
												style={{
													width: '100px',
													height: '100px',
													background: '#000',
													marginRight: '10px',
													display: 'inline-block',
													color: '#FFF',
													transform: `scale(${item.scale}, ${item.scale})`
												}}>{i}</div>
										)
									})}
								</div>
							}
						</StaggeredMotion>
					}
				</div>
				<div>
					<p>TransitionMotion</p>
					<div>
						<button onClick={this.clickHandler.bind(this)}>run</button>
						<TransitionMotion
							willEnter={this.willEnter}
							willLeave={this.willLeave}
							styles={this.state.items.map((item, i) => ({
								key: item.key,
								style: {
									width: spring(item.size),
									height: spring(item.size),
								},
							}))}>
							{interpolatedStyles =>
								<div>
									{interpolatedStyles.map(config => {
										return <div 
											key={config.key} style={{ ...config.style, border: '1px solid' }} />
									})}
								</div>
							}
						</TransitionMotion>
					</div>
				</div>

				<div>
					<h3>Mouseover</h3>
					<div
						className="mouse"
						ref={refs => this.mouseDiv = refs}
						onMouseEnter={event => this.onMouseEnter(event)}
						onMouseMove={event => this.onMouseMove(event)}>
						{
							<StaggeredMotion defaultStyles={mouseItems}
								styles={prevStyles => prevStyles.map((item, i) => {
									const index = i - 1 < 0 ? 0 : i - 1;
									return i === 0
										? moveStyle : {
											top: prevStyles[index].top < 0 ? 0 : prevStyles[index].top,
											left: prevStyles[index].left < 0 ? 0 : prevStyles[index].left,
											scale: i * 0.1,
											opacity: i * 0.2 > 1 ? 1 : i * 0.2,
										}
								})}>
								{
									interpolatingStyles =>
									<div>
										{interpolatingStyles.map((item, i) => {
											return (
												<div
													className="mouse-item"
													key={i}
													style={{...item, transform: `scale(${item.scale}, ${item.scale})` }} />
											)
										})}
									</div>
								}
							</StaggeredMotion>
						}
					</div>
				</div>
			</div>
		);
	}
};

export default Transition;