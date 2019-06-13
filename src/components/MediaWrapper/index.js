import React from 'react';

const MediaWrapper = props => {

    const MediaRender = (files) =>
        files.map(file => {
            return (
                <p>TEST</p>
            )
        })

    return (
        <div>{MediaRender(props.media)}</div>
    )
}

export default MediaWrapper;