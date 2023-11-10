import React from 'react';

const MenuItem = ({item}) => {
    const {name, price, image, recipe} = item;
    return (
        <div className='flex gap-4 '>
            <img style={{borderRadius: "0 200px 200px 200px"}} className='w-[90px]' src={image} alt="" />
            <div>
                <h2 className='uppercase mb-2'>{name} ----------</h2>
                <p>{recipe}</p>
            </div>
            <p className='text-orange-500'>${price} </p>
        </div>
    );
};

export default MenuItem;