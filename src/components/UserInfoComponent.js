import React from "react";
// import { LISTS } from "../shared/lists";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import history from "../history";

import ListCardPreview from "./ListCardPreviewComponent";

function UserInfo(props) {
  const lists = useSelector((state) => state.lists);

  const userLists = lists.lists.filter((list) => list.user === props.username);
  return (
    <div className="container mt-4">
      <div className="row featured mb-3">
        <div className="col">
          <h1>
            <i className="bi bi-person-badge"></i>
            {props.username} Lists
          </h1>
        </div>
        <div className="col-2 col-md-1 text-truncate">
          <h3>
            <Link
              to=""
              onClick={() => history.goBack()}
              className="text-decoration-none"
            >
              <i className="bi bi-backspace"></i> <h6>back</h6>
            </Link>
          </h3>
        </div>
      </div>
      <div className="row">
        {userLists.map((list) => (
          <ListCardPreview key={list.id} list={list.id} />
        ))}
      </div>
    </div>
  );
}

export default UserInfo;
