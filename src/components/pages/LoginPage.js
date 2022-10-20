import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import ContentSection from "../organisms/ContentSection";

import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        let allUsers = data;
        allUsers.forEach((user) => {
          if (user.username === username && user.password === password) {
            dispatch(setUser(user));
            setUserFound(true);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="page">
      {userFound === true && <Navigate to="/profile" />}
      <ContentSection title="Login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__item">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="form__item">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form__item">
            <button type="submit" className="button button--hollow">
              Log in
            </button>
          </div>
        </form>
      </ContentSection>
    </main>
  );
}

export default LoginPage;
