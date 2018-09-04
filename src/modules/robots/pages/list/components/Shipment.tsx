import * as React from "react";
import { List } from 'antd';
import { IRobot } from "../Page"
import Robot from "./Robot"


export interface Props {
  robots: Array<IRobot>;
  shipRobots: Array<IRobot>;
  title: string;
  onAdd: any;
  onRemove: any;
}

interface State {
  selected: boolean
}


class Shipment extends React.Component<Props, State> {

  handleAddRobotToShipment = (robot: IRobot) => {
    this.props.onAdd(robot);
  }

  handleRemoveRobotFromShipment = (robot: IRobot) => {
    this.props.onRemove(robot)
  }

  isRobotInShipList = (id: number) => {
    return this.props.shipRobots.filter((obj) => obj.id === id).length !== 0
  }

  renderListItem = (robot: IRobot) => {
    return(
      <List.Item>
        <Robot
          key={`${robot.id}-robot`}
          id={robot.id}
          name={robot.name}
          configuration={robot.configuration}
          status={robot.status}
          action={this.isRobotInShipList(robot.id) ? this.handleRemoveRobotFromShipment : this.handleAddRobotToShipment}
        />
      </List.Item>
    );
  }
 
  render() {
    const { robots } = this.props

    const robotList = robots.filter((robot) => !this.isRobotInShipList(robot.id))

    return(
      <List
        size="small"
        header={<div>{this.props.title}</div>}
        bordered={true}
        dataSource={robotList}
        renderItem={this.renderListItem}
      />
    );
  }
}

export default Shipment;
