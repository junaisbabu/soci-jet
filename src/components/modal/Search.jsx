import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./search.css";

function Search(props) {
  const users = useSelector((state) => state.addedUsers.users);
  const currentUser = useSelector((state) => state.loggedUser.currentUser);

  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const debounce = (handleChangeFn, delay) => {
    let timer;
    return (...args) => {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        handleChangeFn.apply(context, args);
      }, delay);
    };
  };

  const betterFunction = useCallback(debounce(handleChange, 300), []);

  const navigateProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <Modal
        {...props}
        className="searchBar-modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <Modal.Body className="search-body p-0">
          <input
            className="form-control searchBox me-2 shadow-none"
            type="search"
            placeholder="Search here"
            aria-label="Search"
            onChange={betterFunction}
          />
          {searchInput && (
            <ul className="list-group">
              {searchInput &&
                users
                  .filter((user) => {
                    if (searchInput === "") {
                      return user;
                    } else if (
                      user.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) &&
                      user.name !== currentUser.name
                    ) {
                      return user;
                    }
                  })
                  .map((val, key) => {
                    return (
                      <li
                        key={key}
                        className="list-group-item"
                        onClick={() => {
                          navigateProfile(val.id);
                          props.setSearchClick(false);
                        }}
                      >
                        <img
                          className="avatar"
                          src={val.avatar}
                          alt={val.name}
                        />
                        <h4 className="name">{val.name}</h4>
                      </li>
                    );
                  })}
            </ul>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Search;
