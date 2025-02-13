import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import logo from './logo.svg';
import './App.css';

import recipes from './HebbarsRecipes';

class App extends Component {
  constructor(props){
    super(props);

    this.state =  {
      selectedCategory: "dessert"
    }

    this.handleRecipeChange = this.handleRecipeChange.bind(this);
  }
  // Get a Random number between 0 and max
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // Get an array of recipes of the chosen category
  getChosenRecipe() {
    return Object.values(recipes).filter(
      (recipe) => recipe.Course.toLowerCase() === this.state.selectedCategory
    );
  }

  // Get all unique categories
  getCategory() {
    const categories = Object.values(recipes).map((recipe) =>
      recipe.Course.toLowerCase()
    );
    return categories.filter((a, b) => categories.indexOf(a) === b);
  }

  // Get a random recipe from the chosen categories
  getRandomRecipe() {
    const randomRecipeNumber = this.getRandomInt(this.getChosenRecipe().length);
    return this.getChosenRecipe()[randomRecipeNumber];
  }

  // Handles change in recipe
  handleRecipeChange(e) {
    this.setState({
      selectedCategory: e.target.value
    })
  }

  render() {
    const randomRecipe = this.getRandomRecipe();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <select name="recipeDropdown" id="recipe" value={this.state.selectedCategory} onChange={this.handleRecipeChange}>
            {this.getCategory().map((recipe) => <option key={recipe} value={recipe}>{recipe}</option>)}
          </select>
          <a
            className="Random-Recipe"
            href={randomRecipe.URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {randomRecipe.Name}
          </a>
          
        </header>
      </div>
    );
  }
}

export default hot(App);
