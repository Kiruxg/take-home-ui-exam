import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import FadeIn from "react-fade-in"
import UserProfile from "./user_profile"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      search: "",
      users: [
        {
          user_name: "Jack",
          email_address: "jack312@hotmail.com",
          phone_number: "3029108640",
          department: "Marketing",
          favorite_color: "673AB7",
          isOnline: true,
          toggled: false
        },
        {
          user_name: "Will",
          email_address: "will86@hotmail.com",
          phone_number: "4162056120",
          department: "Human Resource",
          favorite_color: "228C22",
          isOnline: false,
          toggled: false
        },
        {
          user_name: "Ashley",
          email_address: "ashley@hotmail.com",
          phone_number: "9053182216",
          department: "Finance",
          favorite_color: "FF5722",
          isOnline: true,
          toggled: false
        }
      ]
    }
  }

  updateCheckbox = event => {
    event.preventDefault()
    //update toggle state
    let newUsers
    if (!this.state.filteredData) {
      newUsers = this.state.users.map(user => {
        if (user.user_name.toLowerCase() != event.target.textContent.toLowerCase()) return user
        return {
          ...user,
          toggled: !user.toggled
        }
      })
      this.setState({ users: newUsers })
    } else {
      newUsers = this.state.filteredData.map(user => {
        if (user.user_name != event.target.textContent) return user
        return {
          ...user,
          toggled: !user.toggled
        }
      })
      this.setState({ filteredData: newUsers })
    }
  }
  handleChange = event => {
    const name = event.target.name
    const value = event.target.value

    this.setState(
      {
        [name]: value
      },
      () => {
        this.filteredData()
      }
    )
  }
  filteredData() {
    let newData = this.state.users.filter(({ user_name, email_address }, index) => {
      let userName = user_name.toLowerCase()
      let emailAddress = email_address.toLowerCase()
      var searchText = this.state.search.toLowerCase()
      let userMatch = userName.includes(searchText)
      let emailMatch = emailAddress.includes(searchText)
      if (userMatch || emailMatch) {
        return true
      }
    })
    this.setState(
      {
        filteredData: newData
      },
    )
  }
  render() {
    return (
      <div className="user">
        <div className="user__table">
          <section id="search">
            <input onChange={this.handleChange} className="search" name="search" value={this.state.search} type="text" placeholder="Search for Users.." />
          </section>
          {/* <div className="user__details">{this.loopItems()}</div> */}
          <div className="user__details">
            {!this.state.filteredData
              ? this.state.users.map(({ user_name, email_address, phone_number, department, isOnline, favorite_color, toggled }, index) => {
                  return (
                    <FadeIn key={index}>
                      <UserProfile user_name={user_name} email_address={email_address} phone_number={phone_number} favorite_color={favorite_color} department={department} isOnline={isOnline} toggled={toggled} updateCheckbox={this.updateCheckbox} />
                    </FadeIn>
                  )
                })
              : this.state.filteredData.map(({ user_name, email_address, phone_number, department, isOnline, favorite_color, toggled }, index) => {
                  return (
                    <FadeIn key={index}>
                      <UserProfile user_name={user_name} email_address={email_address} phone_number={phone_number} favorite_color={favorite_color} department={department} isOnline={isOnline} toggled={toggled} updateCheckbox={this.updateCheckbox} />
                    </FadeIn>
                  )
                })}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
