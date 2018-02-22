import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/materialColor";
import {Link} from "react-router";
import config from "../config";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};
class MaterialExample extends React.Component {

	constructor(props, context) {
	    super(props, context);

	    this.handleRequestClose = this.handleRequestClose.bind(this);
	    this.handleTouchTap = this.handleTouchTap.bind(this);
	    this.handleToggle = this.handleToggle.bind(this);
	    this.handleClose = this.handleClose.bind(this);

	    this.state = {
	    	open: false,
	    	openDrawer: false,
	    };
	}

	handleRequestClose() {
		this.setState({
		  	open: false,
		});
	}

	handleTouchTap() {
		this.setState({
		  	open: true,
		});
	}

	handleToggle() {
		this.setState({
		  	openDrawer: !this.state.openDrawer,
		});
	}

	handleClose() {
		this.setState({
		  	openDrawer: false,
		});
	}


	render() {
		const standardActions = (
		      <FlatButton
		        label="Ok"
		        primary={true}
		        onClick={this.handleRequestClose}
		      />
		    );
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(colors)}>
		        <div style={styles.container}>
		        	<AppBar title="My AppBar" onClick={this.handleToggle} />
		        	<Drawer
			        	open={this.state.openDrawer} >
			        	<MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
			        	<MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
			        </Drawer>
			        <Dialog
			        	open={this.state.open}
			        	title="Super Secret Password"
			        	actions={standardActions}
			        	onRequestClose={this.handleRequestClose}>
			        	1-2-3-4-5
			        </Dialog>
		        	<h1>Material-UI</h1>
		        	<h2>example project</h2>
		        	<RaisedButton
		        		label="Super Secret Password"
		        		secondary={true}
		        		onClick={this.handleTouchTap}
		        	/>
		        	<div>
		        		<TextField hintText="Hint Text" />

		        	</div>

		        </div>
		    </MuiThemeProvider>
		);
	}


};

export default MaterialExample;