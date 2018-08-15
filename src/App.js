import React, { Component } from 'react';
import logo from './images/logo.svg';
import status from './images/status.svg';
import navigation from './images/navigation.png';
import illustration from './images/send-illustration.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
    }
  }
  switchView = (view) => {
    this.setState({
      view: view
    })
  }

  render() {
    const viewContainerMapping = {
      'home': <Home view={this.state.view} switchView={this.switchView.bind(this)} />
    }
    let container = viewContainerMapping[this.state.view];
    return (
      <div className="App">
        {container}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="mobileContainer envelope">
        <div className="statusBar bg-white">
          <img src={status} width="96" height="16"/>
        </div>
        <div className="appBar">
          <div className="appBar-logo">
            <img src={logo} width="25" height="24"/>
            <h1 className="firaSans">
              <span className="semiBold">Firefox </span><span className="regular">Send</span>
            </h1>
          </div>
          <div className="appBar-icon">
            <i class="material-icons">more_vert</i>
          </div>
        </div>
        <div className="appContent" id="home">
          <div>
            <img src={illustration} width="69" height="88"/>
            <h2>Private, Encrypted File Sharing</h2>
            <p>Send files through a safe, private, and encrypted link that automatically expired to ensure your stuff does not remain online forever.</p>
          </div>
        </div>
        <div className="fab bg-light-blue">
          <i class="material-icons">cloud_upload</i>
        </div>
        <img className="navigationBar" src={navigation} width="100%"/>
      </div>
    );
  }
}

export default App;
