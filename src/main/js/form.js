'use strict';



const React = require('react');
const ReactDOM = require('react-dom');

console.log('scripts are loaded');

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        imgStr : null,
        imgState : true
    };
    this.uploadAction = this.uploadAction.bind(this);
  }

  uploadAction() {
    var self = this;
  var data = new FormData();
  var imagedata = document.querySelector('input[type="file"]').files[0];
  var expireAt = document.querySelector('input[type="text"]').value;
  data.append("image", imagedata);
  data.append("expireAt", expireAt);


  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
	  if(this.readyState===4 && this.status===200){
		  console.log(xhr.responseText);
		  self.setState({   imgStr : xhr.responseText , imgState : false });
		  }
    }
	  xhr.open('POST', '/images',true);
	  xhr.send(data);
  }

render() {
  const imgState = this.state.imgState;
  return (
    <div>
        {
          imgState ? (
              <form encType="multipart/form-data" action="">
              <input type="file" name="image" defaultValue="image"></input>
              <input type="text" name="expireAt" defaultValue="30"></input>
              <input type="button" value="upload" onClick={this.uploadAction.bind(this)}></input>
              </form>
            ) : (
              <div>
                <h4>{this.state.imgStr}</h4>
                <a href={'http://localhost:8080/images/id/' + this.state.imgStr}>
                  http://localhost:8080/images/id/{this.state.imgStr}
                </a>
              </div>
            )
        }
    </div>
  );
}
}




ReactDOM.render(
		<Form />,
		document.getElementById('react')
	)
