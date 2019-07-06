import React, { Component } from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      isEditProduct: false,
      error: null,
      product: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    let apiUrl;
    if (!this.state.isAddProduct) {
      apiUrl = `http://localhost:8000/posts/${data.id}`;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const options = {
        method: "PUT",
        body: JSON.stringify(data),
        myHeaders
      };

      fetch(apiUrl, options)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              response: result,
              isAddProduct: false,
              isEditProduct: false
            });
          },
          error => {
            this.setState({ error });
          }
        );
    } else {
      apiUrl = "http://localhost:8000/posts";

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        myHeaders
      };

      fetch(apiUrl, options)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              response: result,
              isAddProduct: false,
              isEditProduct: false
            });
          },
          error => {
            this.setState({ error });
          }
        );
    }
  }

  // editProduct(id) {
  //   const apiUrl = `http://localhost:8000/posts/${id}`;
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const options = {
  //     method: "PUT",
  //     body: JSON.stringify(id)
  //   };

  //   fetch(apiUrl, options)
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           response: result,
  //           isAddProduct: false,
  //           isEditProduct: false
  //         });
  //       },
  //       error => {
  //         this.setState({ error });
  //       }
  //     );
  // }

  render() {
    return (
      <div className="App">
        <nav className="navbar">MySQL DATABASE</nav>

        <ProductList onFormSubmit={this.onFormSubmit} />

        <button className="btn-add" onClick={() => this.onCreate()}>
          Add Product
        </button>

        <AddProduct
          onFormSubmit={this.onFormSubmit}
          product={this.state.product}
        />
      </div>
    );
  }
}

export default App;
