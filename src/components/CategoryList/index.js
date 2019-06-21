import React from 'react';

const CategoryList = (props) => (
    <div>
        {
            props.colors.map((item, index) => {
                console.log(item.categories, 'item in color')
                let categoryStyle = {
                    background: item.categories.color,
                    width: 50,
                    height: 50
                }
                return (
                    <div key={index}>
                        {index}
                        <div>
                            <div class="category-color" style={categoryStyle}></div>
                            <p>{item.categories.name}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
)


export default CategoryList;