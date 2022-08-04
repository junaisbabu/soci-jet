import "./App.css";
import AppRoutes from "./app routes/AppRoutes";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/firebaseConfig";
import { onAuth } from "../src/redux/actions/Actions";
import { createContext, useEffect, useState } from "react";
import firestoreSevice from "./firebase/firebaseFirestore";
import useLocalStorage from "use-local-storage";
import Spinner from "./components/loading spinner/Spinner";

export const ThemeContext = createContext();
export const LoadingContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(true);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (auth.currentUser) {
        const docSnap = await firestoreSevice.getDocument(
          "users",
          currentUser.uid
        );
        const currentUserData = docSnap.data();

        dispatch(onAuth(currentUserData));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  setTimeout(() => {
    setTime(false);
  }, 3000);

  return (
    <div className="app" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LoadingContext.Provider value={{ load, setLoad }}>
          {time && (
            <div className="spinner-body">
              <div className="spinner">
                <Spinner />
              </div>
            </div>
          )}
          <AppRoutes />
        </LoadingContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
