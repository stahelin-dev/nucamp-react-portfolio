import { Badge, Form, InputGroup, Button } from "react-bootstrap";
import React, { useState } from "react";
import { SHOWS } from "../shared/shows";
// import { LISTS } from "../shared/lists";
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import { addShowList } from "../redux/ActionCreators";

function ShowDetail(props) {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user);
  const isLogged = JSON.stringify(userLogged) !== "{}";

  const lists = useSelector((state) => state.lists);
  const myLists = lists.lists.filter((list) => list.userId === userLogged.id);

  const show = SHOWS.filter((elem) => elem.id === props.showId)[0];
  const history = useHistory();

  const [selectList, setSelectList] = useState(-1);

  function addToList(showId) {
    dispatch(addShowList(selectList, showId));
    history.push(`/myLists/${userLogged.id}/${selectList}?save=show`);
  }

  function handleSelectList(e) {
    setSelectList(e.target.value);
  }
  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-12 col-md-4 mb-3">
          <img
            src={
              show.image
                ? show.image.original
                : "https://picsum.photos/id/0/800/1200?grayscale"
            }
            className="img-thumbnail shadow"
            alt="..."
          />
        </div>
        <div className="col">
          <div className="container">
            <div className="row featured">
              <div className="col">
                <h1 className="">{show.name}</h1>
              </div>
              <div className="col-2 text-truncate text-end">
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
              <div className="col-12">
                <p>
                  {show.summary
                    ? show.summary.replace(/<[^>]*>?/gm, "")
                    : "We don't have a summary for this show yet."}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  <strong>Official site: </strong>
                  <a href={show.officialSite} target="_blank" rel="noreferrer">
                    {show.officialSite ? show.officialSite : "N/A"}
                  </a>
                </p>
                <p>
                  <strong>Genres: </strong>{" "}
                  {show.genres.map((genre, index, array) =>
                    index + 1 === array.length ? `${genre}` : `${genre} | `
                  )}
                </p>
                <p>
                  <strong>Language: </strong>
                  {show.language}
                </p>
                <p>
                  <strong>Web channel: </strong>
                  {show.webChannel ? show.webChannel.name : "N/A"}
                </p>
                <p>
                  <strong>Network: </strong>
                  {show.network ? show.network.name : "N/A"}
                </p>
                <p>
                  <strong>Premiered: </strong>
                  {show.premiered}
                </p>
                <p>
                  <strong>Status: </strong>
                  <Badge
                    bg={
                      show.status === "Ended"
                        ? "danger"
                        : show.status === "Running"
                        ? "success"
                        : "warning"
                    }
                  >
                    {show.status}
                  </Badge>
                </p>
                <p>
                  <strong>Included in: </strong>
                  <Link to={`/included/${show.id}`}>
                    <Badge bg="primary" className="included">
                      {
                        lists.lists.filter((list) =>
                          list.list.includes(show.id)
                        ).length
                      }{" "}
                      Lists
                    </Badge>
                  </Link>
                  {/* <Badge bg="primary">
                    {LISTS.filter((list) => list.list.includes(show.id)).length}{" "}
                    Own Lists
                  </Badge> */}
                </p>
              </div>
            </div>
            {isLogged && (
              <div className="row">
                <div className="col-12 col-md-10 col-lg-8">
                  <Form>
                    <Form.Group>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="addToList">
                          <i className="bi bi-plus-square"></i>
                        </InputGroup.Text>
                        <Form.Select
                          defaultValue={selectList}
                          onChange={(e) => handleSelectList(e)}
                        >
                          <option value="-1">Select List</option>
                          {myLists.map((list) => (
                            <option
                              key={list.id}
                              value={list.id}
                              disabled={
                                list.list.includes(show.id) ||
                                list.list.length >= 10
                              }
                            >
                              {list.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Button
                          variant="primary"
                          onClick={(e) => addToList(show.id)}
                        >
                          Add to List
                        </Button>
                        {/* <Button variant="success" className="ms-1">
                        Create List
                      </Button> */}
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetail;
