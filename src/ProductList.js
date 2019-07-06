import React, { Component } from "react";
import "./ProductList.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      products: []
    };
  }

  //getting list initially..
  componentDidMount() {
    const apiUrl = `http://localhost:8000/posts`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        result => {
          this.setState({ products: result });
        },
        error => {
          this.setState({ error });
        }
      );
  }
  deleteProduct(id) {
    const apiUrl = `http://localhost:8000/posts/${id}`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
      method: "DELETE",
      body: JSON.stringify(id),
      myHeaders
    };

    fetch(apiUrl, options);
    window.location.reload();
  }

  render() {
    const { error, products } = this.state;

    if (error) {
      return <div>Error : {error.message} </div>;
    } else {
      return (
        <div>
          <h2>Product List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    <button>Edit</button>
                    &nbsp;
                    <button onClick={() => this.deleteProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default ProductList;
