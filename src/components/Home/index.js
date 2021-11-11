import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'

import StateDetailsContext from '../StateDetailsContext'
import StatewiseDetails from '../StatewiseDetails'
import './index.css'

class Home extends Component {
  state = {
    totalConfirmedCount: 0,
    totalActiveCount: 0,
    totalRecoveredCount: 0,
    totalDeceasedCount: 0,
    statesDataList: [],
  }

  componentDidMount() {
    this.getCovidDetails()
  }

  getCovidDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const statesDataList = [data]

    const totalCovidValuesList = Object.values(data)

    const totalCovidConfirmedList = totalCovidValuesList.map(
      eachItem => eachItem.total.confirmed,
    )

    const totalConfirmedCount = totalCovidConfirmedList.reduce(
      (a, b) => a + b,
      0,
    )

    const totalCovidRecoveredList = totalCovidValuesList.map(
      eachItem => eachItem.total.recovered,
    )

    const totalRecoveredCount = totalCovidRecoveredList.reduce(
      (a, b) => a + b,
      0,
    )

    const totalActiveCount = totalConfirmedCount - totalRecoveredCount

    const totalCovidDeceasedList = totalCovidValuesList.map(
      eachItem => eachItem.total.recovered,
    )

    const totalDeceasedCount = totalCovidDeceasedList.reduce((a, b) => a + b, 0)

    this.setState({
      totalConfirmedCount,
      totalActiveCount,
      totalRecoveredCount,
      totalDeceasedCount,
      statesDataList,
    })
  }

  renderSuccessView = () => (
    <StateDetailsContext.Consumer>
      {value => {
        const {
          totalConfirmedCount,
          totalActiveCount,
          totalRecoveredCount,
          totalDeceasedCount,
          statesDataList,
        } = this.state
        const {statesList} = value

        return (
          <div className="home-bg-container">
            <div className="search-container">
              <BiSearch className="search-icon" />
              <input
                type="search"
                className="search"
                placeholder="Enter the state"
              />
            </div>
            <div className="statistics-container">
              <div className="confirmed-container">
                <p className="confirmed-text">Confirmed</p>
                <div className="round">
                  <img src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636638667/Vectorright_1_jj48g9.png" />
                </div>

                <p>{totalConfirmedCount}</p>
              </div>
              <div className="active-container">
                <p className="active-text">Active</p>

                <img
                  src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636638409/protection_1active_yjy72v.png"
                  className="statistics-img"
                />

                <p>{totalActiveCount}</p>
              </div>
              <div className="recovered-container">
                <p className="recovered-text">Recovered</p>
                <img
                  src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636639291/recovered_1_glek4z.png"
                  className="statistics-img"
                />
                <p>{totalRecoveredCount}</p>
              </div>
              <div className="deceased-container">
                <p className="deceased-text">Deceased</p>
                <img
                  src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1636639364/breathing_1_hst8zn.png"
                  className="statistics-img"
                />
                <p>{totalDeceasedCount}</p>
              </div>
            </div>
            <StatewiseDetails statesDataList={statesDataList} />
          </div>
        )
      }}
    </StateDetailsContext.Consumer>
  )

  render() {
    return this.renderSuccessView()
  }
}

export default Home
