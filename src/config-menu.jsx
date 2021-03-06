import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import docCookies from './cookies_min.js';

/*
  Description:
    Settings menu, nothing special.
  Used in:
    ./index.jsx
  Props:
    config - Configuration object. See more in index.js.
    handleSubmit(<config: {}> or null) - Sends config to MainPanel. Send null to close ConfigMenu.
    open - Boolean value received from Mainpanel that opens/closes ConfigMenu.
*/
class ConfigMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slideableTabs: true,
      APIClient: 'YAHOO',
      model: 'BSM',
      contractMultiplier: false,
    };
  }
  
  componentWillReceiveProps(nextProp) {
    this.setState({
      slideableTabs: nextProp.config.slideableTabs,
      APIClient: nextProp.config.APIClient,
      model: nextProp.config.model,
      contractMultiplier: nextProp.config.contractMultiplier,
    });
  }
  
  handleSwipeToggle = () => {
    this.setState({
      slideableTabs: !this.state.slideableTabs,
    });
  };

  handleContractToggle = () => {
    this.setState({
      contractMultiplier: !this.state.contractMultiplier,
    });
  };
  
  handleSubmit = () => {
    if ((this.state.contractMultiplier !== this.props.config.contractMultiplier)
        || (this.state.slideableTabs !== this.props.config.slideableTabs)
        || (this.state.model !== this.props.config.model)
        || (this.state.APIClient !== this.props.config.APIClient)) {
      // Being lazy here, since I cannot find if being blocked from accessing cookies 
      // will throw an error or not.
      
      docCookies.setItem('slide', this.state.slideableTabs);
      docCookies.setItem('hundo', this.state.contractMultiplier);
      
      this.props.handleSubmit({...this.state});
    } else {
      this.props.handleSubmit();  
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {this.props.handleSubmit()}}
      />,
      <FlatButton
        label="Okay"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];
    
    return (
      <Dialog
        actions={actions}
        contentStyle={{maxWidth: '20em'}}
        onRequestClose={() => {this.props.handleSubmit()}}
        open={this.props.open}
        title="Settings"
        >
        <Toggle
          name="slideableTabs"
          label="Enable Tab Swiping"
          onToggle={this.handleSwipeToggle}
          defaultToggled={this.state.slideableTabs}
        />
        
        <Toggle
          name="contractMultiplier"
          label="100 Shares Multiplier"
          onToggle={this.handleContractToggle}
          defaultToggled={this.state.contractMultiplier}
        />
      </Dialog>
    );
  }
}

export default ConfigMenu;