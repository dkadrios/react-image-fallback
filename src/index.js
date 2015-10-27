import React, { Component, PropTypes } from "react";

class ReactImageFallback extends Component {
	constructor(props) {
		super(props);
		this.displayImage = new Image();
		this.state = {
			displayImage: props.initialImage
		};
		this.setDisplayImage = this.setDisplayImage.bind(this);
	}

	componentDidMount() {
		this.setDisplayImage(this.props.src, this.props.fallbackImage);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src){
			this.setDisplayImage(nextProps.src, nextProps.fallbackImage);
		}
	}

	componentWillUnmount() {
		this.displayImage.onerror = null;
		this.displayImage.onload = null;
	}

	setDisplayImage(image, fallback) {
		this.displayImage.onerror = () => {
			this.setState({
				displayImage: fallback
			});
		};
		this.displayImage.onload = () => {
			this.setState({
				displayImage: image
			});
		};
		this.displayImage.src = image;
	}

	render() {
		let image = this.state.displayImage ? <img {...this.props} src={this.state.displayImage} /> : null;
		return (
			<span>{image}</span>
		);
	}
}
ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: PropTypes.string.isRequired,
	fallbackImage: PropTypes.string.isRequired,
	initialImage: PropTypes.string
};

ReactImageFallback.defaultProps = {
	initialImage: null
};


module.exports = ReactImageFallback;