import React from 'react';
import FoodCard from "./index";

function MenuList({menus}) {
    return (
        menus.map(menus => {
            return <FoodCard key={menus.id} {...menus} />
        })
    )
}

export default MenuList;