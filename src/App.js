import React, { Component } from 'react';
import logo from './images/logo.svg';
import status from './images/status.svg';
import status_white from './images/status-white.svg';
import navigation from './images/navigation.png';
import illustration from './images/send-illustration.png';
import './App.css';

// loading, failed & canceled, expired, encrypted

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      file: 'default'
    }
  }
  switchView = (view) => {
    if(view === 'homefiles') {
      this.setState({
        file: 'default'
      })
    }
    this.setState({
      view: view
    })
  }
  switchFileState = (state) => {
    this.setState({
      view: 'homefiles'
    })
    this.setState({
      file: state
    })
  }

  getState = () => {
    return this.state.file;
  }

  render() {
    const viewContainerMapping = {
      'home': <Home view={this.state.view} switchView={this.switchView.bind(this)} />,
      'fabpress': <FabPress view={this.state.view} switchView={this.switchView.bind(this)} />,
      'permission': <Permission view={this.state.view} switchView={this.switchView.bind(this)} />,
      'homefiles': <HomeFiles view={this.state.view} switchView={this.switchView.bind(this)} switchFileState={this.switchFileState.bind(this)} getState={this.getState.bind(this)} />
    }
    let container = viewContainerMapping[this.state.view];
    return (
      <div className="App">
        {container}
        <ul className="white list">
          <li onClick={() => this.switchView('home')}>Home</li>
          <li onClick={() => this.switchView('fabpress')}>FabPress</li>
          <li onClick={() => this.switchView('permission')}>Permission</li>
          <li onClick={() => this.switchView('homefiles')}>Single file</li>
          <ul>
            <li onClick={() => this.switchFileState('password')}>Single file (password protected)</li>
            <li onClick={() => this.switchFileState('multiple')}>Multiple file</li>
            <li onClick={() => this.switchFileState('expand')}>Multiple file (expand)</li>
            <li onClick={() => this.switchFileState('upload')}>File uploading</li>
            <li onClick={() => this.switchFileState('failed')}>Upload failed or canceled</li>
            <li onClick={() => this.switchFileState('expired')}>File expired</li>
          </ul>
        </ul>
      </div>
    );
  }
}

/* Components */
function StatusBar(props) {
  let color = props.color;
  let img = (color === 'white') ? status : status_white
  return (
    <div className={"statusBar bg-"+color}>
      <img src={img} width="96" height="16"/>
    </div>
  )
}
function AppBar() {
  return (
    <div className="appBar">
      <div className="appBar-logo">
        <img src={logo} width="25" height="24"/>
        <h1 className="firaSans">
          <span className="semiBold">Firefox </span><span className="regular">Send</span>
        </h1>
      </div>
      <div className="appBar-icon">
        <i className="material-icons">more_vert</i>
      </div>
    </div>
  )
}
function NavigationBar() {
  return (
    <img className="navigationBar" src={navigation} width="100%"/>
  )
}
function Fab(props) {
  return (
    <div className={"fab bg-"+props.color}>
      <i className="material-icons">{props.icon}</i>
    </div>
  )
}
function FabActions(props) {
  var order = {bottom: 139+56*(props.order-1)+"px"}
  return (
    <div className="fabActions" style={order}>
      <div className="fabActions-label">{props.label}</div>
      <div className="fabActions-button">
        <i className="material-icons">{props.icon}</i> 
      </div>
    </div>
  )
}
function Files(props) {
  let state = props.state;
  let files = 1;
  let file_text1 = "";
  let file_text2 = "";
  let section2 = null;
  let file_size ="14.55 MB";
  let icon = (<i className="material-icons">more_vert</i>);

  let password = (state === 'password') ? (<i className="material-icons lock">lock</i>) : "";
  let status = (<p className="fileStatus">Expired after: <span className="strong"> 10 downloads or 23h 40m</span></p>);

  switch(state) {
    case 'password':
    case 'default':
      section2 = (<div className="fileCard-Section-2 flex-end"><div className="fileAction"><i className="material-icons">link</i><p>Copy Link</p></div></div>);
      break;
    case 'multiple':
      file_text1 = " + 2 files";
      file_text2 = " (3 files)";
      section2 = (<div className="fileCard-Section-2"><i className="material-icons">keyboard_arrow_down</i><div className="fileAction"><i className="material-icons">link</i><p>Copy Link</p></div></div>);
      break;
    case 'expand':
      files = 3;
      section2 = (<div className="fileCard-Section-2"><i className="material-icons">keyboard_arrow_up</i><div className="fileAction"><i className="material-icons">link</i><p>Copy Link</p></div></div>);
      break;
    case 'upload':
      file_size = "7.27 MB/14.55 MB"
      status = (
        <div className="fileProgress">
          <p>50%</p>
          <div className="fileProgressBar"></div>
        </div>
      );
      section2 = (<div className="fileCard-Section-2 flex-end"><div className="fileAction"><p>Cancel</p></div></div>);
      break;
    case 'failed':
      status = (<p className="fileStatus failed"><i className="material-icons">error</i>Sent failed</p>);
      section2 = (<div className="fileCard-Section-2 flex-end"><div className="fileAction"><p>Try Again</p></div></div>);
      break;
    case "expired":
      icon = (<i className="material-icons">delete_outline</i>)
      status = (<p className="fileStatus expired"><i className="material-icons">warning</i>Expired: filename.pdf + 3 files<br/>Time’s up!</p>);
      break;

  }
  let section1 = [];
  for(var i = 0; i < files; i++) {
    section1.push(<div className="fileCard-Section-1">
        <div>
          <figure className="fileImg"></figure>
          <div className="fileName">
            <p>IMG_20180709-50-102.jpg{file_text1}</p>
            <p className="flex aic">{file_size}{file_text2}{password}</p>
          </div>
        </div>
        {icon}
      </div>)
  }

  return (
    <div className="fileCard">
      {section1}
      {status}
      {section2}
    </div>
  )
}

/* Views */
class Home extends Component {
  render() {
    return (
      <div className="mobileContainer envelope">
        <StatusBar color="white"/>
        <AppBar/>
        <div className="appContent" id="home">
          <div>
            <img src={illustration} width="69" height="88"/>
            <h2>Private, Encrypted File Sharing</h2>
            <p>Send files through a safe, private, and encrypted link that automatically expired to ensure your stuff does not remain online forever.</p>
          </div>
        </div>
        <Fab color="light-blue" icon="cloud_upload"/>
        <NavigationBar/>
      </div>
    );
  }
}

class FabPress extends Component {
  render() {
    return (
      <div className="mobileContainer envelope">
        <div className="overlay-gray"></div>
        <StatusBar color="white"/>
        <AppBar/>
        <div className="appContent" id="home">
          <div>
            <img src={illustration} width="69" height="88"/>
            <h2>Private, Encrypted File Sharing</h2>
            <p>Send files through a safe, private, and encrypted link that automatically expired to ensure your stuff does not remain online forever.</p>
          </div>
        </div>
        <FabActions order="1" label="Upload from Camera" icon="add_a_photo"/>
        <FabActions order="2" label="Photos" icon="photo_library"/>
        <FabActions order="3" label="Browse files" icon="attach_file"/>
        <Fab color="dark-gray" icon="close"/>
        <NavigationBar/>
      </div>
    );
  }
}

class Permission extends Component {
  render() {
    return (
      <div className="mobileContainer envelope">
        <div className="overlay-dark">
          <div className="dialog">
            <p>Allow <span className="strong">Send</span> to access photos, media, and files on your device?</p>
            <div className="dialog-button-section light-blue">
              <div className="dialog-button">deny</div>
              <div className="dialog-button">allow</div>
            </div>
          </div>
        </div>
        <StatusBar color="white"/>
        <AppBar/>
        <div className="appContent" id="home">
          <div>
            <img src={illustration} width="69" height="88"/>
            <h2>Private, Encrypted File Sharing</h2>
            <p>Send files through a safe, private, and encrypted link that automatically expired to ensure your stuff does not remain online forever.</p>
          </div>
        </div>
        <Fab color="light-blue" icon="cloud_upload"/>
        <NavigationBar/>
      </div>
    );
  }
}

class HomeFiles extends Component {
  render() {
    let filestate = this.props.getState();
    return (
      <div className="mobileContainer envelope">
        <StatusBar color="white"/>
        <AppBar/>
        <div className="appContent hasFiles">
          <Files state={filestate}/>
        </div>
        <Fab color="light-blue" icon="cloud_upload"/>
        <NavigationBar/>
      </div>
    );
  }
}

export default App;
