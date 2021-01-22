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
    return (
      <div className="App">
        <Uploader onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
