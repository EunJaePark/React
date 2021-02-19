import React, { useEffect } from 'react';

const RecipeList = (props) => {

    const category = props.category;

    useEffect(() => {
        console.log(props);
    });

    return (
        <div>
           recipe List
           {category} 
        </div>
    );
};

export default RecipeList;