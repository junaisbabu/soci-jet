import "./App.css";
import AppRoutes from "./app routes/AppRoutes";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../src/firebase/firebaseConfig";
import { onAuth } from "../src/redux/actions/Actions";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { doc, onSnapshot } from "firebase/firestore";

export const ThemeContext = createContext();
export const LoadingContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [load, setLoad] = useState(false);

  const getLoggedUser = async (collection, docId) => {
    const unsub = await onSnapshot(doc(db, collection, docId), (doc) => {
      dispatch(onAuth(doc.data()));
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (auth.currentUser) {
        window.localStorage.setItem("isLoggedIn", true);
        getLoggedUser("users", currentUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="app" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LoadingContext.Provider value={{ load, setLoad }}>
          <AppRoutes />
        </LoadingContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
