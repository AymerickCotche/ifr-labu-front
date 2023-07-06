'use client';

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, type RootState } from './GlobalRedux/store';
import { useEffect } from "react";
import { fetchComputers } from "./GlobalRedux/Features/computer/computerSlice";
import { fetchUsers, toggleModal, setFormUser, addUser } from "./GlobalRedux/Features/user/userSlice";
import Login from "./components/Login";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  const isConnected = useSelector((state: RootState) => state.admin.isConnected);

  const computers = useSelector((state: RootState) => state.computer.computers)
  const users = useSelector((state: RootState) => state.user.users)

  const showModalUser = useSelector((state: RootState) => state.user.showModal)
  
  const userForm = useSelector((state: RootState) => state.user.userForm)

  const handleAddUser = () => {
    dispatch(toggleModal())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormUser(e.target))
  }

  const handleSubmitUserForm = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addUser(userForm))
  }

  const jsxComputers = computers.map((computer) => (
    <div key={computer.id} className="grid grid-cols-7 gap-2">

      <p>{computer.id}</p>
      <p>{computer.name}</p>
      <p>{computer.cpu}</p>
      <p>{computer.gpu}</p>
      <p>{computer.ram}</p>
      <p>{computer.attribued_to}</p>
      <div>
        <p>Modifier</p>
        <p>Supprimer</p>
      </div>
    </div>
  ))

  const jsxUsers = users.map((user) => (
    <div key={user.id} className="grid grid-cols-5 gap-2">

      <p>{user.id}</p>
      <p>{user.firstname}</p>
      <p>{user.lastname}</p>
      <p>{user.birth_date}</p>
      <div>
        <p>Modifier</p>
        <p>Supprimer</p>
      </div>
    </div>
  ))

  useEffect(() => {
    dispatch(fetchComputers())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className='min-h-screen flex flex-col bg-gray-200'>

      {
        isConnected &&
        <div>

          <h1>Accueil</h1>

          <div className="border border-gray-500 p-2">
            <div>
              <h2>Gestions des ordinateurs</h2> 
              <p>Ajouter un ordinateur</p>
            </div>
            <div className="grid grid-cols-7 gap-2">
              <p>Id</p>
              <p>name</p>
              <p>cpu</p>
              <p>gpu</p>
              <p>ram</p>
              <p>Attribuer à</p>
              <p>actions</p>
            </div>
            {jsxComputers}
          </div>

          <div className="border border-gray-500 p-2">
            <div>
            <h2>Gestions des utilisateurs</h2>
            <p onClick={handleAddUser}>Ajouter un utilisateur</p>

            </div>
            <div className="grid grid-cols-5 gap-2">
              <p>Id</p>
              <p>Prénom</p>
              <p>Nom</p>
              <p>Date de naissance</p>
              <p>actions</p>
            </div>
            {jsxUsers}
          </div>
  
        </div>
      }
      

      {
        !isConnected &&
          <Login/>
      }

      {showModalUser &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Ajouter un utilisateur</h2>

          <form onSubmit={handleSubmitUserForm}>
            <div className="mb-4">
              <label htmlFor="prenom" className="block font-bold mb-1">
                Prénom :
              </label>
              <input
                type="text"
                id="prenom"
                name="firstname"
                value={userForm.firstname}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nom" className="block font-bold mb-1">
                Nom :
              </label>
              <input
                type="text"
                id="nom"
                name="lastname"
                value={userForm.lastname}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block font-bold mb-1">
                Date de naissance :
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={userForm.date}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddUser}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
      }
    </div>
    
  )
}
