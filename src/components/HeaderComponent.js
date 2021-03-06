import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../redux/ActionCreators";
import { addUser } from "../redux/ActionCreators";

// import { GENRES } from "../shared/genres";

function Header(props) {
  const history = useHistory();

  const userLogged = useSelector((state) => state.user);
  const isLogged = JSON.stringify(userLogged) !== "{}";

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [listName, setListName] = useState("");

  function handleSubmit(event) {
    const newList = {
      name: listName,
      userId: userLogged.id,
      list: [],
    };
    const createdList = dispatch(addList(newList));
    setListName("");
    event.preventDefault();
    toggleModal();
    history.push(`/myLists/${userLogged.id}/${createdList.payload.id}`);
  }

  function handleSearchSubmit(event) {
    props.onSubmit(event);
    event.preventDefault();
  }

  function handleSearchChange(event) {
    props.onChange(event);
  }

  function logout() {
    dispatch(addUser({}));
    history.push("/login");
  }

  return (
    <React.Fragment>
      <Navbar
        dark="true"
        sticky="top"
        expand="xl"
        className="navbar-dark mt-0 pt-0"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img src="/assets/images/logo.svg" className="logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="p-3">
            <Form className="d-flex mt-3 ms-auto" onSubmit={handleSearchSubmit}>
              <InputGroup>
                <InputGroup.Text className="searchBar">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="searchBar"
                  value={props.searchText}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Form>
            <Nav className="ms-auto mt-3">
              <LinkContainer to="/home">
                <Nav.Link to="/home" className="mx-2 my-auto text-nowrap">
                  <i className="bi bi-house"></i> Home
                </Nav.Link>
              </LinkContainer>
              {isLogged && (
                <LinkContainer to={`/myLists/${userLogged.id}`}>
                  <Nav.Link className="mx-2 my-auto text-nowrap">
                    <i className="bi bi-list-ul"></i> My Lists
                  </Nav.Link>
                </LinkContainer>
              )}
              {isLogged && (
                <Nav.Link
                  className="mx-2 my-auto text-nowrap"
                  onClick={toggleModal}
                >
                  <i className="bi bi-plus"></i> Create List
                </Nav.Link>
              )}
              {!isLogged && (
                <Nav.Link className="mx-2 my-auto text-nowrap" disabled>
                  <i className="bi bi-plus"></i> Create List
                </Nav.Link>
              )}

              {!isLogged && (
                <LinkContainer to="/login">
                  <Nav.Link href="/login" className="mx-2 my-auto text-nowrap">
                    <i className="bi bi-box-arrow-in-left"></i> Login/SignUp
                  </Nav.Link>
                </LinkContainer>
              )}
              {isLogged && (
                <Nav.Link className="mx-2 my-auto text-nowrap" onClick={logout}>
                  <i className="bi bi-box-arrow-left"></i> Logout
                </Nav.Link>
              )}

              <LinkContainer to="/about">
                <Nav.Link
                  href="/about"
                  className="text-warning mx-2 my-auto small text-nowrap"
                >
                  <i className="bi bi-question-circle"></i> How it works
                </Nav.Link>
              </LinkContainer>
              {isLogged && (
                <LinkContainer to={`/user/${userLogged.id}?own=true`}>
                  <Nav.Link className="text-info mx-2 my-auto large">
                    <h2 className="my-auto">
                      <i className="bi bi-person-badge mb-0"></i>
                    </h2>
                    <p className="small mb-0">{userLogged.username}</p>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="text-light">Quick list creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel
                controlId="ListName"
                label="List Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="listName"
                  placeholder="List Name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            type="submit"
            // disabled="true"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Header;
