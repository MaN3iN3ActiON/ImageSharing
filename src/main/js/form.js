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
    this.select = this.select.bind(this);
    this.uploadAnother = this.uploadAnother.bind(this);
  }

  uploadAction() {
    var self = this;
  var data = new FormData();
  var imagedata = document.querySelector('input[type="file"]').files[0];
  var expireSelect = document.getElementById('expireselect');
  var expireAt = expireSelect.options[expireSelect.selectedIndex].value;
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

  select() {
    document.getElementById('generatedURL').select();

  }

  uploadAnother() {
    window.location.reload(true);
  }

render() {
  const imgState = this.state.imgState;
  return (
    <div>
        {
          imgState ? (
              <form className="form-horizontal" encType="multipart/form-data" action="">
                <div id="formbrowse" className="form-group row">
                    <label htmlFor="uploadedfile" className="control-label col-md-4">Select file : </label>
                    <div className="col-md-8">
                      <input type="file" id="fileinput" name="uploadedfile" className="form-control" required="required"></input>
                    </div>
                </div>
              <div id="expire" className="form-group row">
                <label htmlFor="expireselect" className="control-label col-md-4">Consume within:</label>
                <div className="col-md-8">
                  <select name="expire" id="expireselect" className="form-control" defaultValue="1">
                    <option value="1">5 Minutes</option>
                    <option value="2">10 Minutes</option>
                    <option value="3">30 Minutes</option>
                    <option value="4">1 Hour</option>
                    <option value="5">3 Hours</option>
                  </select>
                </div>
              </div>
              <div id="formbottom" className="form-group">
                <div className="col-md-8 ml-auto">
                    <input type="button"  id="uploadbtn" alt="submit" className="btn btn-success" value="Upload" onClick={this.uploadAction}></input>
                </div>
            </div>
              </form>
            ) : (
              <div>
              <div className="form-group row">
                <label htmlFor="generatedURL" className="col-md-2">URL : </label>
                <input type="text" onClick={this.select} id="generatedURL" className="col-md-10" readOnly = "readonly" value={'http://localhost:8080/images/id/' + this.state.imgStr}></input>
              </div>
              <div className="form-group row">
                <div className="col-md-6 ml-auto">
                  <input type="button" id="backbtn" alt="back" className="btn btn-success" value="Upload Another?" onClick={this.uploadAnother}/>
                </div>
              </div>
              </div>
            )
        }
    </div>
  );
}
}




ReactDOM.render(
		<Form />,
		document.getElementById('pagecontent')
	)
