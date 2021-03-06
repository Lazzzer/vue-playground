const VueSequentialEntrance = {
	install(Vue, options) {
		Vue.component('sequential-entrance', {
			functional: true,
			render(createElement, { props, data, children }) {
				let firstDelay = props.firstDelay || 0;
				let delay = props.delay || 250;
				let tag = props.tag || 'span';
				let animation = props.animation || 'entranceFromRight';

				if (props.fromTop != undefined) animation = 'entranceFromTop';
				if (props.fromRight != undefined)
					animation = 'entranceFromRight';
				if (props.fromBottom != undefined)
					animation = 'entranceFromBottom';
				if (props.fromLeft != undefined) animation = 'entranceFromLeft';

				if (children) {
					children.forEach((child, index) => {
						child.data.staticStyle = {
							opacity: 0,
							animationFillMode: 'forwards',
							animationDelay:
								Number(firstDelay) + index * delay + 'ms'
						};
						child.data.staticClass += ' ' + animation;
					});
				}
				return createElement(
					tag,
					{ class: props.contentClass },
					children
				);
			}
		});
	}
};

export default VueSequentialEntrance;
