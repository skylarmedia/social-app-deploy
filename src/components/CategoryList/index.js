import React from 'react';

const CategoryList = (props) => {
    return (
        <div>
            {
                props.colors.map(item => {

                    return item.data().categories.map(innerItem => {
                        let categoryStyle = {
                            background: innerItem.color,
                            width: 50,
                            height: 50
                        }
                        return (
                            <div>
                                <div class="category-color" style={categoryStyle}></div>
                                <p>{innerItem.name}</p>
                            </div>
                        )
                    }

                    )
                })
            }
        </div>
    )
}


export default CategoryList;