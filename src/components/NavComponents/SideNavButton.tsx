import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';


type Props = {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  isLoading:  boolean; 
};

export default function SideNavLink({ href, children, exact = false , isLoading}: Props) {
  const {data, status} = useSession(); 
    
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  const onclick = ()=>{ 
    console.log('[SESSION STATUS]: ', status); 
  }


  return (
    <Link
      onClick={onclick}
      href={isLoading ? '/login' : href}
      aria-current={isActive ? "page" : undefined}
      className={`
        ${isLoading ? `cursor-not-allowed`: ``}
      text-white font-medium text-[24px] p-2 rounded-md
      hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20
        w-10/12 text-center
        ${isActive ? "bg-white/15 font-medium" : "text-white"}        
      `}
      >
      {children}
    </Link>
  );
}
