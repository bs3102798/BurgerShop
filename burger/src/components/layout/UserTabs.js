'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
    const path = usePathname()
    return (


        <div className="flex max-auto gap-2 tabs justify-center">

            <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}> Profile</Link>
            {isAdmin && (
                <>
                    <Link
                     className={path === '/categories' ? 'active' : ''}
                        href={'/categories'}>
                        Categories
                    </Link>
                    <Link
                     className={/menu-Item/.test(path) ? 'active' : ''}
                        href={'/menu-Items'}>
                        Menu Items
                    </Link>
                    <Link
                     className={path === '/Users' ? 'active' : ''}
                        href={'/Users'}>
                        Users
                    </Link>
                </>
            )}
        </div>

    )
}