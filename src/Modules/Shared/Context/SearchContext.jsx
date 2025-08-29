import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "../../Auth/Context/authContext";

const NavContext = createContext();

export function NavProvider({ children }) {
  const { user, savedToken, backendUrl } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [filterChoice, setFilterChoice] = useState("Users");
  const [searchResults, setSearchResults] = useState([]);

  async function searchValueFunc(searchValue, filterChoice, admin) {
    try {
      const res = await axios.get(
        `${backendUrl}/api/feed/getSearchFeed/${filterChoice}`,
        {
          params: { search: searchValue, admin: admin }, // 👈 query params go here
        }
      );

      setSearchResults(res.data.results);
      console.log("workingggg");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <NavContext.Provider
      value={{
        searchValue,
        setSearchValue,
        filterChoice,
        setFilterChoice,
        searchResults,
        searchValueFunc,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
export const useNav = () => useContext(NavContext);
