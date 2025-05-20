
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    {name: "Home", to: "/", isNewPage: false, animationDuration: 1000},
    {name: "Events", to: "#events", isNewPage: false, animationDuration: 1000},
    {name: "Create Event", to: "create_event", isNewPage: true, animationDuration: 1000},
    {name: "Log in", to: "login", isNewPage: true, animationDuration: 1000},
    {name: "Register", to: "register", isNewPage: true, animationDuration: 1000},
];

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navBarHeight = 10

    // checks if page is scrolled and modified the navbar's padding and blur accordingly
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > navBarHeight)
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (<>
        <nav 
            className={cn(
                "fixed top-0 left-0 w-full z-40 transition-all duration-300",
                isScrolled ? "py-3 bg-background/40 shadow-xs" : "py-5"
            )}
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 10%, black/90 20%, black/80 30%, black/70 40%, black/60 50%, black/50 60%, black/40 70%, black/30 80%, black/20 90%, black/10 100%)',
                maskImage: 'linear-gradient(to bottom, black 10%, black/90 20%, black/80 30%, black/70 40%, black/60 50%, black/50 60%, black/40 70%, black/30 80%, black/20 90%, black/10 100%)',
                backdropFilter: isScrolled ? 'blur(3px)' : 'none'
            }}
        >

            <div className="container flex items-center justify-between">

                {/* Logo of a page */}
                <a className="text-xl font-bold text-primary flex items-center" href="/">
                    <span className="relative z-10">
                        <span className="text-glow text-foreground"> Venuo </span> {" "} Events
                    </span>
                </a>


                {/* Desktop NavBar */}
                <div className="hidden md:flex space-x-8 mr-10 font-bold">
                    {navItems.map((item) => {

                        return item.isNewPage

                            ? (<NavLink key={item.name} to={item.to} className="group text-foreground/80 transition-colors duration-300">
                                <span className={cn("bg-left-bottom bg-gradient-to-t from-current to-current",
                                    `bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-${item.animationDuration} ease-out`)}>
                                    {item.name}
                                </span>
                            </NavLink>)

                            : (<a key={item.name} href={item.to} className="group text-foreground/80 transition-colors duration-300">
                                <span className={cn("bg-left-bottom bg-gradient-to-t from-current to-current",
                                    `bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-${item.animationDuration} ease-out`)}>
                                    {item.name}
                                </span>
                            </a>)

                    })}
                </div>


                {/* Mobile NavBar */}
                <button onClick={() => setIsMenuOpen((i) => !i)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
                    {isMenuOpen ? <X size={24}/> : <Menu size={24} /> }
                </button>

                <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                    "transition-all duration-300 md:hidden", isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>

                    <div className="flex flex-col space-y-8 text-xl">

                        {navItems.map((item) => {

                            return item.isNewPage
                                ? (<NavLink key={item.name} to={item.to} onClick={() => setIsMenuOpen(false)}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </NavLink>)
                                : (<a key={item.name} href={item.to} onClick={() => setIsMenuOpen(false)}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </a>)

                        })}

                    </div>

                </div>

            </div>

        </nav>
    </>)
}

export default NavBar
