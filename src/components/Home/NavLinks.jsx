import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, className, children }) => {
    const path = usePathname();
    const active = href === path;

    return (
        <Link 
            href={href} 
            className={`
                ${className} 
                ${active ? "text-slate-900 font-semibold border-b-3 border-b-indigo-600 rounded-sm" : "text-slate-500"}
            `}
        >
            {children}
           
        </Link>
    );
};

export default NavLink;