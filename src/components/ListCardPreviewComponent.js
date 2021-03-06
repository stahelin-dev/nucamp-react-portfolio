import React from "react";
import { Accordion, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import { SHOWS } from "../shared/shows";
import { USERS } from "../shared/users";
import Match from "./MatchComponent";
import history from "../history";

import { useDispatch } from "react-redux";
import { addList } from "../redux/ActionCreators";

function ListCardPreview(props) {
  const userLogged = useSelector((state) => state.user);
  const isLogged = JSON.stringify(userLogged) !== "{}";

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const displayList = lists.lists.find((list) => list.id === props.list);
  displayList.user = USERS.find(
    (user) => user.id === displayList.userId
  ).username;

  function saveList(list) {
    const newList = { ...list, userId: userLogged.id };
    const newObject = dispatch(addList(newList));
    history.push(
      `/myLists/${userLogged.id}/${newObject.payload.id}?save=success`
    );
  }

  //const showList = SHOWS.filter((show) => displayList.list.includes(show.id));
  const showList = displayList.list.map(
    (id) => SHOWS.filter((show) => show.id === id)[0]
  );
  if (displayList.list.length > 0) {
    return (
      <div className="col-12 col-sm-6 col-lg-3 mb-3">
        <Card className="shadow">
          <Card.Header className="pb-0">
            <h5 className="fw-bold text-truncate">{displayList.name}</h5>
            <Link
              to={`/user/${displayList.userId}`}
              className="text-decoration-none"
            >
              <p className="fs-6 mb-0 text-end">by {displayList.user}</p>
            </Link>
          </Card.Header>
          <Card.Body className="m-0 p-0">
            <div className="row m-0 p-0">
              <div className="col m-0 p-0">
                {showList.length > 0 && (
                  <Link to={`/show/${showList[0].id}`}>
                    <img
                      src={
                        showList[0].image
                          ? showList[0].image.medium
                          : "https://picsum.photos/id/0/210/295?grayscale"
                      }
                      className="d-block w-100"
                      alt="..."
                    />
                  </Link>
                )}

                {showList.length > 2 && (
                  <Link to={`/show/${showList[2].id}`}>
                    <img
                      src={
                        showList[2].image
                          ? showList[2].image.medium
                          : "https://picsum.photos/id/0/210/295?grayscale"
                      }
                      className="d-block w-100"
                      alt="..."
                    />
                  </Link>
                )}
              </div>
              <div className="col m-0 p-0">
                {showList.length > 1 && (
                  <Link to={`/show/${showList[1].id}`}>
                    <img
                      src={
                        showList[1].image
                          ? showList[1].image.medium
                          : "https://picsum.photos/id/0/210/295?grayscale"
                      }
                      className="d-block w-100"
                      alt="...."
                    />
                  </Link>
                )}

                {showList.length > 3 && (
                  <Link to={`/show/${showList[3].id}`}>
                    <img
                      src={
                        showList[3].image
                          ? showList[3].image.medium
                          : "https://picsum.photos/id/0/210/295?grayscale"
                      }
                      className="d-block w-100"
                      alt="..."
                    />
                  </Link>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col ">
                <div>
                  {props.source === "recommendation" ? (
                    <Match match={props.match} />
                  ) : (
                    ""
                  )}
                </div>
                <Accordion flush>
                  <Accordion.Item eventKey={displayList.id}>
                    <Accordion.Header>Preview</Accordion.Header>
                    <Accordion.Body className="px-0">
                      <ListGroup variant="flush">
                        {showList.map((show, index) => (
                          <ListGroup.Item
                            key={show.id}
                            as={Link}
                            to={`/show/${show.id}`}
                            action
                          >
                            {index + 1}. {show.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-evenly px-0">
            <Button
              as={Link}
              to={`/list/${displayList.id}`}
              className="text-decoration-none"
              size="sm"
            >
              <i className="bi bi-card-list"></i> Details
            </Button>
            <Button
              size="sm"
              onClick={() => saveList(displayList)}
              disabled={!isLogged || userLogged.id === +displayList.userId}
            >
              <i className="bi bi-plus-square text-light"></i> Save List
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
  return <div />;
}

export default ListCardPreview;
