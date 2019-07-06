import React from "react";
import "./AddProduct.css";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      title: ""
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.onFormSubmit(this.state);
    // console.log(this.state);
    this.setState(this.initialState);
  }

  render() {
    return (
      <div>
        <h2> Add/Edit Product</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Product Name:
            <input
              className="search-bar"
              type="text"
              name="title"
              placeholder="title"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
