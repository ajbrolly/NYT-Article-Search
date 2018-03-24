import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem, SaveBtn } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { FormHeader } from "../../components/Form/FormHeader";
import "./Home.css";


class Home extends Component {
    state = {
        searchTerm: '',
        articles: [],
        startYear: '',
        endYear: ''
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
            API.runQuery(this.state.searchTerm)
                .then(res => this.setState({ articles: res.docs }))
                // .then(({ data: { results } }) => res.json(results))
                .catch(err => console.log(err));
        }
    };

    hanleClearResults = event => {
        event.preventDefault();
        this.setState({
            searchTerm: '',
            articles: [],
            startYear: '',
            endYear: ''
        });
    }

    handleSaveArticle = event => {
        event.preventDefault();
        API.postSaved({
            title: this.state.title,
            date: this.state.date,
            url: this.state.url,
            snippet: this.state.snippet
        })
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };

    loadArticles = () => {
        API.getSaved()
          .then(res =>
            this.setState({ articles: res.data })
          )
          .catch(err => console.log(err));
      };


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1><i className="fa fa-newspaper-o"></i> New York Times Article Search</h1>
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
                                <i className="fa fa-search"></i> Search
                            </FormBtn>

                            <FormBtn
                                disabled={!(this.state.searchTerm)}
                                onClick={this.hanleClearResults}
                            >
                                <i className="fa fa-trash"></i> Clear Results
                            </FormBtn>
                        </form>
                    </Col>
                    <Col>
                        <FormHeader>
                            <i className="fa fa-table"></i> Top Articles
                        </FormHeader>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(article => (
                                    <ListItem key={article._id}>
                                        <h3>{article.headline.main}</h3>
                                        <p>{article.pub_date}</p>
                                        <p>{article.snippet}</p>
                                        <a className="btn btn-article" target="_blank" href={article.web_url}>Go to Full Article</a>
                                        <SaveBtn
                                            onClick={this.handleSaveArticle}
                                            type="info"
                                        >
                                            Save Article
                                        </SaveBtn>
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
