import React from 'react';
import './index.css';

const CategoryList = (props) => (
    <div>
        {

            props.colors.map((item, index) => {
                let categoryStyle = {
                    background: item.categories.color
                }

                return (
                    <div key={index}>
                        <div>
                            <div className="category-color" style={categoryStyle}>
                                {item.categories.name}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
)


export default CategoryList;