import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


// this class name function uses tailwind-merge and allows to combine tailwind
export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}