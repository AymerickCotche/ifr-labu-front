'use client'
 
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../GlobalRedux/store';
import Image from "next/image"
import { toggleMobileMenu } from '@/app/GlobalRedux/Features/display/displaySlice';
import Link from 'next/link';

export default function Header() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.admin.isConnected);
  const mobileMenu = useSelector((state: RootState) => state.display.mobileMenu);

  const handleClickMenu = () => {
    dispatch(toggleMobileMenu(!mobileMenu))
  }

  return (
    <header className="flex justify-around">
      <div className='hidden md:block'>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href='/'>Accueil</Link>
            </li>
            {/* <li>
              <Link href='/#'>Gestion pensionnaire</Link>
            </li>
            <li>
              <Link href='/#'>Gestion des paiements</Link>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className="">
        <h1>labu</h1>
      </div>
      
      {isConnected &&
        <div>
          <div className='hidden lg:block'>
            <span className="font-bold text-2xl">Bienvenue</span>
            <span className="text-lg"> administrateur</span>

          </div>
          <div className=' md:hidden flex flex-col justify-between h-5 z-30' onClick={handleClickMenu}>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>

            <nav className={mobileMenu ?
                'absolute top-[12%] bg-white text-black  left-0 right-0 w-full ease-in duration-300'
              :
                'absolute top-[12%] bg-white text-black  left-[-100%] right-0 w-full ease-in duration-300'
              }>
              <ul>
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/'>Accueil</Link>
                </li >
                {/* <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion pensionnaire</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion des paiements</Link>
                </li > */}
              </ul>
            </nav>
          </div>
        </div>
      }

      {!isConnected &&
        <div>
          <div className='hidden lg:block'>
            <span className="">Bonjour,</span>
            <span className=""> merci de vous connecter</span>
          </div>

          <div className=' md:hidden flex flex-col justify-between h-5 z-30' onClick={handleClickMenu}>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>

            <nav className={mobileMenu ?
                'absolute top-[12%] bg-white text-black  left-0 right-0 w-full ease-in duration-300'
              :
                'absolute top-[12%] bg-white text-black  left-[-100%] right-0 w-full ease-in duration-300'
              }>
              <ul>
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/'>Accueil</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion pensionnaire</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion des paiements</Link>
                </li >
              </ul>
            </nav>
          </div>
          
        </div>
      }
    </header>
  )
}
