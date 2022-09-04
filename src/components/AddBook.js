import React, {
  useState,
  useEffect,
} from "react";
import {
  Form,
  Alert,
  InputGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("Active");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({
    error: false,
    msg: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({
        error: true,
        msg: "All fields are mandatory!",
      });
      return;
    }
    const newBook = {
      title,
      author,
      date,
      file,
      status,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(
          id,
          newBook
        );
        setBookId("");
        setMessage({
          error: false,
          msg: "Updated successfully!",
        });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({
          error: false,
          msg: "New Task added successfully!",
        });
      }
    } catch (err) {
      setMessage({
        error: true,
        msg: err.message,
      });
    }

    setTitle("");
    setAuthor("");
    setDate("");
    setFile("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap =
        await BookDataService.getBook(id);
      console.log(
        "the record is :",
        docSnap.data()
      );
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setDate(docSnap.data().date);
      setFile(docSnap.data().file);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({
        error: true,
        msg: err.message,
      });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={
              message?.error
                ? "danger"
                : "success"
            }
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBookTitle"
          >
            <InputGroup>
              <InputGroup.Text id="formBookTitle">
                B
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBookAuthor"
          >
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">
                A
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Task Author"
                value={author}
                onChange={(e) =>
                  setAuthor(e.target.value)
                }
              />
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBookAuthor"
          >
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">
                C
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Submision Date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBookAuthor"
          >
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">
                D
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Upload Task"
                value={file}
                onChange={(e) =>
                  setFile(e.target.value)
                }
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup
            aria-label="Basic example"
            className="mb-3"
          >
            <div className="center">
              <Button
                disabled={flag}
                variant="light"
                onClick={(e) => {
                  setStatus("Active");
                  setFlag(true);
                }}
              >
                Active
              </Button>
              <Button
                variant="dark"
                disabled={!flag}
                onClick={(e) => {
                  setStatus("Not Active");
                  setFlag(false);
                }}
              >
                Not Active
              </Button>
            </div>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="Submit"
            >
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
