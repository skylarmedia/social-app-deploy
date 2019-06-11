import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import FileUploader from 'react-firebase-file-uploader';
import TimePicker from 'react-time-picker';
import { SketchPicker } from 'react-color';
import ShowCategory from '../ShowCategory';
import * as ROUTES from '../../constants/routes';
import { bigIntLiteral } from '@babel/types';

class AddPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            copy: '',
            values: [],
            time: '10:00',
            hashtags: [],
            filesArr: [],
            image: '',
            imageURL: '',
            progress: 0,
            showCategoryState: false,
            pushColor: '',
            pushColorText: '',
            clientId: '',
            calendarDay: 0,
            calendarMonth: 0,
            calendarYear: 2019,
            postId: '',
            file: [],
            metaImageFiles: ["No Files"]
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.renderAddLinks = this.renderAddLinks.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        // this.customOnChangeHandler = this.customOnChangeHandler.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.showCategory = this.showCategory.bind(this);
        this.handleColorText = this.handleColorText.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.addFile = this.addFile.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }


    componentDidMount() {
        console.log(this.props, 'addpost');

        var url_string = window.location.href  //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("clientId");
        const day = parseInt(url.searchParams.get('day'));
        const month = parseInt(url.searchParams.get('month'));
        console.log(c, ' this is the client Id after it has mounted');

        this.setState({
            clientId: c,
            calendarDay: day,
            calendarMonth: month
        })
    }

    handleTitle(e) {
        console.log(e.target.value, 'event target');
    }

    renderAddLinks() {
        document.getElementById('link-container');

        this.setState(prevState => ({ inputs: [...prevState.inputs, ''] }))
    }

    fileChangeHandler = (event) => {
        const { target: { files } } = event;
        const filesToStore = this.state.filesArr

        this.setState({ files: filesToStore });
    }

    handleChangeText(i, event) {
        let colors = [...this.state.colors];
        colors[i] = event.target.value;
        this.setState({ colors });
    }

    handleColorText = e => {
        this.setState({
            pushColorText: e.target.value
        })
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

    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.values.join(', '));
        event.preventDefault();
    }

    handleSuccess = (file) => {

    }

    onChange = time => this.setState({ time });

    submitFile(e) {
        e.preventDefault();
        // console.log('send file');
        this.props.firebase.getStorage.child('images');
    }

    showCategory = e => {
        e.preventDefault();

        this.setState({
            showCategoryState: !this.state.showCategoryState
        });
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    handleCopy = (e) => {
        this.setState({
            copy: e.target.value
        });
    }

    handleHashtags = (e) => {
        this.setState({
            hashtags: e.target.value
        });
    }


    onChangeTime = e => {
        this.setState({
            time: e
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        console.log(this.state.metaImageFiles, 'state after event');





        const formMonth = this.state.calendarMonth;
        const clientId = this.state.clientId;
        this.props.firebase.addPost(
            this.state.clientId,
            this.state.title,
            this.state.copy,
            this.state.hashtags,
            this.state.time,
            this.state.calendarDay,
            this.state.calendarMonth,
            this.state.values,
            this.state.metaImageFiles
        );

        this.props.history.push(`${ROUTES.CALENDAR}/?month=${formMonth}&year=2019&clientId=${clientId}`);

    }


    // File upload methods

    addFile = event => {
        const file = Array.from(event.target.files);

        if (file.length === 1) {
            this.setState({
                file: [...this.state.file], file
            });
        }
        else if (file.length > 1) {
            const emptyFileArr = []
            file.map(innerFile => {
                emptyFileArr.push(innerFile)
            })

            this.setState({
                file: emptyFileArr
            });
        }
    }

    uploadFiles = (e) => {
        e.preventDefault();
        const firestorageRef = this.props.firebase.storage;
        alert(this.state.file.length)
        const imageRefs = [];
        this.state.file.forEach(file => {
            console.log(file, 'file upload')
            var type;

            switch (file.type) {
                case 'video/mp4':
                    type = 'video';
                    break;
                case 'image/png':
                    type = 'image';
                    break;
                case 'image/jpeg':
                    type = 'image';
                    break;
                default:
                    type = '';
            }
            var encodedURL = encodeURIComponent(this.state.clientId) + encodeURIComponent('/') + this.state.calendarMonth + encodeURIComponent('-') + this.state.calendarDay + encodeURIComponent('/') + file.name + '?alt=media&type=' + type;
            var imageUrl = `https://firebasestorage.googleapis.com/v0/b/skylar-social-17190.appspot.com/o/${encodedURL}`
            imageRefs.push(imageUrl);
            console.log(imageRefs);


            firestorageRef.ref().child(`${this.state.clientId}/${this.state.calendarMonth}-${this.state.calendarDay}/${file.name}`)
                .put(file)
        });
        this.setState({
            metaImageFiles: imageRefs
        })
    }

    showState = (e) => {
        e.preventDefault();
        console.log(this.state);
    }




    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <label>Title
                        <input name="title" value={this.state.value} onChange={this.handleTitle} />
                    </label>
                    <br />
                    <br />
                    <label>Copy
                        <textarea name="copy" value={this.state.value} onChange={this.handleCopy} />
                    </label>
                    <br />
                    <br />
                    <label>Hashtags
                        <input name="hashtags" value={this.state.value} onChange={this.handleHashtags} />
                    </label>
                    <br />
                    {this.createUI()}
                    <br /><br />
                    <input type='button' value='Add More' onClick={this.addClick.bind(this)} />
                    <input type="submit" value="Submit" />
                    <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.time}
                    />

                    <input type="file" multiple onChange={this.addFile} />
                    <button onClick={this.uploadFiles}>Upload Files</button>


                </form>
                {this.state.showCategoryState ?
                    <ShowCategory />
                    : ''}

                <button onClick={this.showState.bind(this)}>Show State</button>
            </div>
        )
    }
}

export default compose(
    withFirebase(AddPost)
)