import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  //OPTION 1 GET INITIAL USERS (NO API KEY)
  // componentDidMount() {
  //   axios.get('https://api.github.com/users')
  //     .then(res => console.log(res.data))
  // }

  // OPTION 2 GET INITIAL USERS
  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const res = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data, loading: false, });
      console.log(res.data);
  }


  //Search Github Users 
  //In arrow functions 'async' goes before the parameter.
  searchUsers = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //res.data.items because that's the way data comes from API
    this.setState({
      users: res.data.items, loading: false, });

  }

  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Search searchUsers={this.searchUsers} />{" "}
          <Users loading={this.state.loading} users={this.state.users} />{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
