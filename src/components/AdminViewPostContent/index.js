import React from 'react';

const AdminViewPostContent = props => {

    // const categoryName = props.post.selectedCategory.split('|||')[0];
    // const categoryColor = props.post.selectedCategory.split('|||')[1];

    // const categoryStyleColor = {
    //     background: categoryColor,
    //     width: "50px",
    //     height: "50px"
    // }

    return (
        <React.Fragment>
            Title: <p>{props.post.title}</p>
            Copy: <p>{props.post.copy}</p>
            Hashtags: <p>{props.post.hashtags}</p>
            Time: <p>{props.post.time}</p>
            {/* Category: <p>{categoryName}</p><div style={categoryStyleColor}></div> */}
            Approved: <p>
                {props.post.approve ? 'Appoved' : 'Not Approved'}
            </p>
        </React.Fragment>
    )
}

export default AdminViewPostContent;