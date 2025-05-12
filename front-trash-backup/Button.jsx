import React from "react";

// Utility to join class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Define the button variants manually
const buttonVariants = {
    base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    variants: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
    },
    sizes: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
    },
};

function Button({
    className = "",
    variant = "default",
    size = "default",
    asChild = false,
    children,
    ...props
}) {
    const Comp = asChild ? React.Fragment : "button";
    const variantClasses = buttonVariants.variants[variant] || buttonVariants.variants.default;
    const sizeClasses = buttonVariants.sizes[size] || buttonVariants.sizes.default;
    const combinedClasses = cn(buttonVariants.base, variantClasses, sizeClasses, className);

    return asChild ? (
        <>{React.cloneElement(children, { className: cn(children.props.className, combinedClasses), ...props })}</>
    ) : (
        <button className={combinedClasses} {...props}>
        {children}
        </button>
    );
}

export { Button };
