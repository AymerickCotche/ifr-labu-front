'use client';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AppDispatch, type RootState } from '../../GlobalRedux/store';
import { login, subscribe, setFormLogin, setFormSubscribe } from "../../GlobalRedux/Features/admin/adminSlice";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()

  const formLogin = useSelector((state: RootState) => state.admin.formLogin);
  const formSubscribe = useSelector((state: RootState) => state.admin.formSubscribe);

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login(formLogin));
  }

  const handleInputChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormLogin(e.target))
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-200'>

       
        <form onSubmit={handleSubmitLogin} className='flex-1 flex flex-col items-center align-middle justify-center'>

          <label className='text-center'>
            <p className='mb-1'>Adresse email</p>
            <input
              type="text"
              name="email"
              value={formLogin.email}
              onChange={handleInputChangeLogin}
              required
              placeholder='email@xxx.com'
              className='border border-red-500 rounded-3xl p-2'
            />
          </label>

          <label className='text-center mb-5'>
            <p className='mb-1'>Mot de passe</p>
            <input
              type="password"
              name="password"
              value={formLogin.password}
              onChange={handleInputChangeLogin}
              required className='border border-red-500 rounded-3xl p-2'
              placeholder='mot de passe'
            />
          </label>

          <button className='text-center text-white bg-red-500 border border-red-500 rounded-3xl py-2 px-5' type="submit">Envoyer</button>

        </form>
      
    </div>
    
  )
}
