import React, { useState } from 'react'
import { cn } from '@/lib/utils'


const CategoryButton = ({ category }) => {
    const [selected, setSelected] = useState();
    return (
        <div className={cn("min-w-fit h-full px-2 border border-white rounded-md overflow-hidden",
                            selected ? "bg-white backdrop-blur-lg backdrop-brightness-150"
                                    : "bg-white/30 backdrop-blur-lg backdrop-brightness-150")}>
            <span>{category}</span>
        </div>
    )
}

export default CategoryButton