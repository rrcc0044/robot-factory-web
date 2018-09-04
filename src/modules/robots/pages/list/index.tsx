import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import {actionCreators as robotActionCreators} from "../../reducer";

import Page from "./Page"

const mapStateToProps = (state: any) => {
  return {
    robots: state.robot.robots,
    qaPassedRobots: state.robot.qaPassedRobots,
    factorySecondsRobots: state.robot.factorySecondsRobots
  }
}

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators(robotActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
