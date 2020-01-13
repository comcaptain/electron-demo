import React from 'react';
import './App.css';
import {remote} from 'electron';
const BrowserWindow = remote.BrowserWindow;

class App extends React.Component {
    constructor(props) {
		super(props);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.detectDragStart = this.detectDragStart.bind(this);
		this.handleDragging = this.handleDragging.bind(this);
		this.handleDragEnd = this.handleDragEnd.bind(this);
	}
	
	handleDragStart(event) {
		this._dragStartPosition = {x: event.screenX, y: event.screenY};
		document.removeEventListener("mousemove", this.detectDragStart);
		document.addEventListener("mousemove", this.detectDragStart);
		document.addEventListener("mouseup", this.handleDragEnd);
	}
	handleDragEnd(event) {
		document.removeEventListener("mousemove", this.detectDragStart);
		document.removeEventListener("mousemove", this.handleDragging);
		document.removeEventListener("mouseup", this.handleDragEnd);
	}

	openDragWindow(mousePosition, url) {
		let win = new BrowserWindow({
			width: 800,
			height: 600,
			x: mousePosition.x,
			y: mousePosition.y,
			webPreferences: {nodeIntegration: true, webSecurity: false}
		});
		win.loadURL(url);
		this._popupWindow = win;
		document.removeEventListener("mousemove", this.handleDragging);
		document.addEventListener("mousemove", this.handleDragging);
		return win;
	}

	handleDragging(event) {
		this._popupWindow.setPosition(event.screenX - 100, event.screenY - 20);
	}

	detectDragStart(event) {
		let xDistance = event.screenX - this._dragStartPosition.x;
		let yDistance = event.screenY - this._dragStartPosition.y;
		let distance = Math.pow(xDistance * xDistance + yDistance * yDistance, 0.5);
		if (distance < 50) return;
		delete this._dragStartPosition;
		document.removeEventListener("mousemove", this.detectDragStart);
		let [item] = window.myLayout.root.getItemsByFilter(item => {
			let config = item.config;
			if (!config) return false;
			let props = config.props;
			if (!props) return false;
			return props.label === this.props.label;
		});
		let oldOpen = window.open;
		window.open = url => this.openDragWindow({x: event.screenX, y: event.screenY}, url);
		item.popout();
		window.open = oldOpen;
	}

    render() {
        return (
            <div className="App">
				<button className="drag-as-new-window" onMouseDown={this.handleDragStart}>*</button>	
                {this.props.label}
            </div>
        );
    }
}

export default App;
