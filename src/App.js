//jshint esversion: 6
import React, { Component } from 'react';
import './App.css';
import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=8f65c38b9ef6e174dc94f59bd6666310",
    base_url: "https://www.food2fork.com/api/search?key=8f65c38b9ef6e174dc94f59bd6666310",
    details_id: 35380,
    pageIndex: 0,
    search: "",
    query: "&q=",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if(jsonData.recipes.length === 0){
        this.setState(() => {
          return {error: "sorry your search did not match any recipes"}
        });
      } else {
        this.setState(() => {
          return{ recipes: jsonData.recipes }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  displayPage = index => {
    switch (index) {
      case 0: return <RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails} value={this.state.search} handleChange={this.handleChange} handleSubmit={this.handleSubmit}error={this.state.error} />;
      case 1: return <RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />;
      default:
    }
  }

  handleIndex = index => {
    this.setState({ pageIndex: index });
  }

  handleDetails = (index, id) => {
    this.setState({ pageIndex: index, details_id: id });
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {base_url, query, search} = this.state;
    this.setState(() => {
      return { url: `${base_url}${query}${search}`, search: ""};
    }, () => {
      this.getRecipes()
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;
