import React from 'react';
import FoodCard from "./FoodCard";

function MenuList({menus}) {
    return (
        menus.map(menus => {
            return <FoodCard key={menus.id} {...menus} />
        })
    )
}

export default MenuList;