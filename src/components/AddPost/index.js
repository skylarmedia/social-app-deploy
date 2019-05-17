import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import FileUploader from 'react-firebase-file-uploader';
import TimePicker from 'react-time-picker';

class AddPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            copy: '',
            values: [],
            time: '10:00'
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.renderAddLinks = this.renderAddLinks.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleTitle(e) {
        console.log(e.target.value, 'event target');
        console.log(e, 'only event');
    }

    renderAddLinks() {
        document.getElementById('link-container');
        console.log('clicked add post');

        this.setState(prevState => ({ inputs: [...prevState.inputs, ''] }))
    }

    componentDidMount() {
        console.log(this.props, 'addpost');
    }


    createUI() {
        return this.state.values.map((el, i) =>
            <div key={i}>
                <input type="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
            </div>
        )
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    handleUpload = (e) => {
        console.log(e, 'file upload');
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.values.join(', '));
        event.preventDefault();
    }

    handleSuccess = (file) => {
        console.log(file, 'success');
    }

    onUploadStart = (file) => {
        console.log(file);
    }

    onChange = time => this.setState({ time })

    render() {

        console.log(this.props.firebase.getStorage, 'storage');
        return (
            <div>
                <form>
                    <label>Title
                        <input name="title" value={this.state.value} onChange={this.handleTitle} />
                    </label>
                    <br />
                    <label>Copy
                        <textarea name="copy" value={this.state.value} onChange={this.handleCopy} />
                    </label>
                    <label>Hashtags
                        <input name="hashtags" value={this.state.value} onChange={this.handleHashtags} />
                    </label>
                    {this.createUI()}
                    <input type='button' value='add more' onClick={this.addClick.bind(this)} />
                    <FileUploader accept="image/*" name="fileupload " storageRef={this.props.firebase.getStorage().ref("images")} onUploadSuccess={this.handleUploadSuccess} onProgress={this.handleProgress} onUploadStart={this.handleUploadStart} />
                    <input type="submit" value="Submit" />
                    <TimePicker
                        onChange={this.onChange}
                        value={this.state.time}
                    />
                </form>
            </div>
        )
    }
}

export default compose(
    withFirebase(AddPost)
)