import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './style/imageViewer.scss';

import ui from '../action/ui';
import user from '../action/user';

let offsetX = 0;
let offsetY = 0;

class ImageViewer extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        image: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            rotate: 0,
        };
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderImageViewer = this.renderImageViewer.bind(this);
    }

    renderImageViewer() {
        const { image } = this.props;
        const { scale, rotate } = this.state;

        return (
            <div className="image-viewer">
                <div onClick={ui.closeImageViewer} />
                <img
                    src={image}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                    draggable
                    onDragStart={event => {
                        offsetX = event.clientX - event.target.offsetLeft;
                        offsetY = event.clientY - event.target.offsetTop;
                    }}
                    onDragOver={event => {
                        event.target.style.left = `${event.clientX - offsetX}px`;
                        event.target.style.top = `${event.clientY - offsetY}px`;
                    }}
                    onClick={event => event.bubbles = false}
                />
                <div
                    onClick={event => event.bubbles = true}
                >
                    <span
                        onClick={() => this.setState({ scale: scale + 0.25 })}
                    >
                        <i className="icon">&#xe60d;</i>
                    </span>
                    <span
                        onClick={() => this.setState({ scale: scale - 0.25 })}
                    >
                        <i className="icon">&#xe60c;</i>
                    </span>
                    <span
                        onClick={() => this.setState({ rotate: rotate + 90 })}
                    >
                        <i className="icon">&#xe60e;</i>
                    </span>
                    <span
                        onClick={() => user.addUserExpression(image)}
                    >
                        <i className="icon">&#xe60f;</i>
                    </span>
                </div>
            </div>
        );
    }

    render() {
        return this.props.show ? this.renderImageViewer() : null;
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showImageViewer']),
        image: state.getIn(['ui', 'imageViewerSrc']),
    })
)(ImageViewer);