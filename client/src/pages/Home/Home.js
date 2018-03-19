import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { FormHeader } from "../../components/Form/FormHeader";

class Home extends Component {
    state = {
        searchTerm: '',
        articles: [],
        startYear: '',
        endYear: '',
        title: '',
        date: '',
        url: ''
    };

    componentDidMount() {
        this.loadArticles();
      }
    
      loadArticles = () => {
        API.getAllArticles()
          .then(res =>
            this.setState({ books: res.data, title: "", date: "", url: "" })
          )
          .catch(err => console.log(err));
      };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.searchTerm) {
            API.saveArticle({
                title: this.state.title,
                author: this.state.date,
                synopsis: this.state.url
            })
                .then(res => this.loadBooks())
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1><i class="fa fa-newspaper-o"></i> New York Times Search</h1>
                        </Jumbotron>
                        <form>
                            <FormHeader>
                                <i className="fa  fa-list-alt"></i> Search Parameters
                            </FormHeader>

                            <Input
                                value={this.state.searchTerm}
                                onChange={this.handleInputChange}
                                name="searchTerm"
                                placeholder="Article Search (required)"
                            />
                            <Input
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                name="startYear"
                                placeholder="Start Year (optional)"
                            />
                            <Input
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                name="endYear"
                                placeholder="End Year (optional)"
                            />
                            <FormBtn
                                disabled={!(this.state.searchTerm)}
                                onClick={this.handleFormSubmit}
                            >
                                <i class="fa fa-search"></i> Search
                            </FormBtn>

                            <FormBtn
                                disabled={!(this.state.searchTerm)}
                                onClick={this.handleFormSubmit}
                            >
                                <i class="fa fa-trash"></i> Clear Results
                            </FormBtn>
                        </form>
                    </Col>
                    <Col>
                        <FormHeader>
                            <i className="fa fa-table"></i> Top Articles
                        </FormHeader>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(book => (
                                    <ListItem key={book._id}>
                                        {/* <Link to={"/books/" + book._id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </Link> */}
                                        {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h5>No Results to Display</h5>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
