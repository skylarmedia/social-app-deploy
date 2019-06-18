import React from 'react';

const CategoryList = (props) => {
    return (
        <div>
            {
                props.colors.map(item => {
                    return item.data().categories.map(innerItem => (
                        <div>{innerItem.name}TEST</div>
                    ))
                })
            }
        </div>
    )
}


export default CategoryList;