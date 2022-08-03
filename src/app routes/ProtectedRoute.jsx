import React from 'react'
import {Navigate} from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig';


function ProtectedRoute({children}) {
    if(!auth.currentUser) {
        return <Navigate to='/login' />
    }
  return children;
}

export default ProtectedRoute