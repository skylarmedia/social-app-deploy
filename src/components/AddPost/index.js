import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from "redux";
import FileUploader from 'react-firebase-file-uploader';
import TimePicker from 'react-time-picker';
import { SketchPicker } from 'react-color';
import ShowCategory from '../ShowCategory';
import * as ROUTES from '../../constants/routes';

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
            calendarYear: 2019
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.renderAddLinks = this.renderAddLinks.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.customOnChangeHandler = this.customOnChangeHandler.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.showCategory = this.showCategory.bind(this);
        this.handleColorText = this.handleColorText.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
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

    // runGetSocialPosts(id){


    //     console.log('snapshot');
    // }

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

    fileChangeHandler = (event) => {
        // console.log(event, 'file upload');
        const { target: { files } } = event;
        const filesToStore = this.state.filesArr

        this.setState({ files: filesToStore });
        // console.log(this.state, 'state after upload');
    }

    handleChangeText(i, event) {
        let colors = [...this.state.colors];
        colors[i] = event.target.value;
        this.setState({ colors });
        // console.log(this.state, 'state change text');
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
        console.log(values);
 

        // this.setState({
        //     values:[...this.state.values, event.target.value]
        // })
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
        // console.log(file, 'success');
    }

    onUploadStart = (file) => {
        // console.log(file);
    }

    onChange = time => this.setState({ time });

    submitFile(e) {
        e.preventDefault();
        // console.log('send file');
        this.props.firebase.getStorage.child('images');
    }

    customOnChangeHandler = (event) => {
        const { target: { files } } = event;
        const filesToStore = [];

        files.forEach(file => filesToStore.push(file));

        this.setState({ files: filesToStore });
    }

    showCategory = e => {
        e.preventDefault();

        this.setState({
            showCategoryState: !this.state.showCategoryState
        });



    }


    /**
    * Start download handler using the file uploader reference
    */
    // startUploadManually = () => {
    //     const { files } = this.state;
    //     files.forEach(file => {
    //         this.fileUploader.startUpload(file)
    //     });
    // }

    // handleUploadStart = (filename) => {

    //     this.setState({
    //         progress:0
    //     });
    //     this.setState({
    //         image:filename,
    //         progress:0,
    //     });
    // }

    // handleUploadSuccess = filename => {


    // }

    //     customOnChangeHandler = (event) => {
    //         const { target: { files } } = event;
    //         const filesToStore = [];

    //         files.forEach(file => filesToStore.push(file));

    //         this.setState({ files: filesToStore });
    //     }

    //   console.log(files, 'files after upload');
    //   console.log(event, 'event file upload');





    // startUploadManually = () => {
    //     // const { files } = this.state;
    //     // console.log(this.state, 'after upload');
    //     // files.forEach(file => {
    //     //   this.fileUploader.startUpload(file)
    //     // });
    //   }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        });
        // console.log(this.state.title);
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

    onSubmitForm = (e) => {
        e.preventDefault();

        console.log(this.state, 'state on form submission')

        // const formMonth = this.state.calendarMonth;
        // const clientId = this.state.clientId;

        // this.props.firebase.addPost(this.state.clientId, this.state.title, this.state.copy, this.state.hashtags, this.state.time, this.state.calendarDay, this.state.calendarMonth, this.state.calendarYear, this.state.values);

        // this.props.history.push(`${ROUTES.CALENDAR}/?month=${formMonth}&year=2019&clientId=${clientId}`);
    }

    onChangeTime = e => {
        // console.log(e, 'time')
        this.setState({
            time: e
        })
        // console.log(this.props, 'props')/
    }

    handleChangeComplete = e => {
        this.setState({
            pushColor: e.hex
        })
        // console.log(this.state, 'hex');
    }




    render() {
        console.log(this.state, 'state file');
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
                    {/* <input type="text" value={this.state.pushColorText} onChange={this.handleColorText} />Categories */}
                    {/* <button onClick={this.showCategory}>Show Category</button><br/> */}
                    {/* <SketchPicker onChangeComplete={ this.handleChangeComplete } color={ this.state.pushColor }/><br /> */}
                    <input type='button' value='Add More' onClick={this.addClick.bind(this)} />
                    {
                    /* <FileUploader
                        accept="images/*"
                        name="image"
                        storageRef={this.props.firebase.storage.ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadSuccess={this.handleUploadSuccess}
                    />


                    {/* <FileUploader

                        onChange={this.customOnChangeHandler} // ⇐ Call your handler
                        ref={instance => { this.fileUploader = instance; }}  // ⇐ reference the component
                    /> */}



                    {/* <input type="file" name="image" onChange={this.handleFileChange} /> */}
                    {/* <button onClick={this.startUploadManually}>Upload all the things</button> */}
                    <input type="submit" value="Submit" />
                    <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.time}
                    />

                    {/* /* <button onClick={this.submitFile}>Send File</button> */}
                </form>
                {this.state.showCategoryState ?
                    <ShowCategory />
                    : ''}
            </div>
        )
    }
}

export default compose(
    withFirebase(AddPost)
)