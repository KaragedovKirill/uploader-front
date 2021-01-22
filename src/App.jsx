import React from 'react';
import './App.css';

class Uploader extends React.Component {
  handleChange = (event) => {
    const { files } = event.target;
    if (!files.length) {
      return;
    }

    const formData = new FormData();
    const fileData = event.target.files[0];
    formData.append('image', fileData);

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData,
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.status === 'OK') {
          this.props.onChange(response.data);
        }
      });
  };

  render() {
    return <input type="file" onChange={this.handleChange} />;
  }
}

class App extends React.Component {
  state = { fileInfo: null };

  onChange = (fileInfo) => {
    this.setState({ fileInfo });
  };

  render() {
    const { fileInfo } = this.state; 
    return (
      <div className="App">
        <Uploader onChange={this.onChange} />
        <br />
        <br />
        {fileInfo && <img src={fileInfo.imageUrl} style={{width: '100px'}} alt="" />}
        {fileInfo &&  <div>image is available at {fileInfo.imageUrl} </div>}
      </div>
    );
  }
}

export default App;
