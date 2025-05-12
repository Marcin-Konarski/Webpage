import React from "react";

// Simple utility to join class names
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Label({ className = "", children, ...props }) {
    const baseClasses =
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50";

    return (
        <label
        data-slot="label"
        className={cn(baseClasses, className)}
        {...props}
        >
        {children}
        </label>
    );
}

export { Label };
