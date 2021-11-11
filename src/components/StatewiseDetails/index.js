import './index.css'
import StateDetailsContext from '../StateDetailsContext'

const StatewiseDetails = props => (
  <StateDetailsContext.Consumer>
    {value => {
      const {statesList} = value
      const {statesDataList} = props
      console.log(statesDataList)

      return (
        <div className="states-data-container">
          <div className="titles-container">
            <h1 className="states-ut-title">States/UT</h1>
            <h1 className="confirmed-title">Confirmed</h1>
            <h1 className="active-title">Active</h1>
            <h1 className="recovered-title">Recovered</h1>
            <h1 className="deceased-title">Deceased</h1>
            <h1 className="population-title">Population</h1>
          </div>
          <hr />
          <div className="states-names-container">
            {statesList.map(eachState => (
              <h1 className="state-name">{eachState.state_name}</h1>
            ))}
          </div>

          <hr />
        </div>
      )
    }}
  </StateDetailsContext.Consumer>
)
export default StatewiseDetails
