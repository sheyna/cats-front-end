import React from 'react';
import axios from 'axios';
import './App.css';
import Cats from './Cats';
import { Button, Container, Form } from 'react-bootstrap';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: []
    }
  }

  deleteCat = async (id) => {
    // console.log(id);
    try {
      await axios.delete(`${SERVER}/cats/${id}`);
      // this.getCats();
      let updatedCats = this.state.cats.filter(cat => cat._id !== id )
      this.setState({
        cats: updatedCats
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  getCats = async () => {
    try {
      let results = await axios.get(`${SERVER}/cats`);
      this.setState({
        cats: results.data
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  componentDidMount() {
    this.getCats();
  }

  postCats = async (newCat) => {
    try {
      let createdCat = await axios.post(`${SERVER}/cats`, newCat);
      // console.log(createdCat.data);
      // this.getCats();
      this.setState({
        cats: [...this.state.cats, createdCat.data]
      });
    } catch(error) {
      console.log('we have an error: ', error.response.data);
    }
  }

  handleCatSubmit = (e) => {
    e.preventDefault();
    let cat = {
      name: e.target.name.value,
      color: e.target.color.value,
      // this is how you tell if a box was checked:
      spayNeuter: e.target.spayNeuter.checked,
      location: e.target.location.value
    }
    // console.log(cat);
    this.postCats(cat);
  }

  render() {
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          {
            this.state.cats.length > 0 &&
            <>
              <Cats cats={this.state.cats} deleteCat={this.deleteCat}/>
            </>
          }

          <Container className="mt-5">
            <h3>Add a cat</h3>
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
