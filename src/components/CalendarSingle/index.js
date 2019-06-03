import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import HiddenCalendarSingle from '../HiddenCalendarSingle';

class CalendarSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            showCalendarModule: false
        }

        // this.toggleShowCalendarModule = this.toggleShowCalendarModule.bind
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.props !== nextProps.posts) {
    //         nextProps.posts.map(item => {
    //             console.log(item.data(), 'item in single calendar');
    //         })
    //     }
    // }



    componentDidMount() {

        console.log(this.props, 'props for firebase')

        // this.props.firebase.storage.ref().child(this.props.clientId + '/' + this.props.month + '-' + this.props.day).getDownloadURL().then((url) => {
        //     console.log(url, 'url');
        // }).catch((error) => {
        //     console.log(error, 'error')
        // })


        // const firebaseStorage = ;
        // const awaitStorage = await firebaseStorage;

        // console.log(awaitStorage);

        // const getImages = async () => {
        //     this.props.firebase.storage.ref().child(decodeURI(this.props.clientId + '/' + this.props.month + '-' + this.props.day)).listAll().then(res => {
        //         console
        //     })
        // }

        // getImages();


    }


    toggleShowCalendarModule = () => {

        alert('ran');
        // this.setState({
        //     showCalendarModule: !this.state.showCalendarModule
        // })
    }


    toggleShowCalendarModule = () => {
        alert('clicked');
        this.setState({
            showCalendarModule: !this.state.showCalendarModule
        })
    }

    truncate = (input) => input.length > 200 ? `${input.substring(0, 200)}...` : input;




    render() {



        // const hiddenPost = this.props.posts




        return (
            <div className="calendar-popup-wrapper">
                {this.props.day}<br />

                {this.props.posts.map((item, index) => {
                    if (item.data().day === this.props.day) {
                        return (
                            <div>
                                <HiddenCalendarSingle title={item.data().title} copy={item.data().copy} time={item.data().time} hashtags={item.data().hashtags} links={item.data().links} day={item.data().day} month={item.data().month} itemId={item.id} />
                            </div>
                        )
                    }
                })}

            </div>
        )
    }
}

export default compose(
    withFirebase(CalendarSingle)
);