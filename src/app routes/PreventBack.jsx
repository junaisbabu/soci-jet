import React from 'react'
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

function PreventBack({children}) {
    if(auth.currentUser) {
        return <Navigate to='/' />
    }
  return children;

}

export default PreventBack