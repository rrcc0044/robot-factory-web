import * as React from "react";
import { Button, Col, List, Row, Tabs } from 'antd';
import Robot from "./components/Robot"
import Shipment from "./components/Shipment"


interface Configuration {
  color: string;
  hasTracks: boolean;
  hasWheels: boolean;
  hasSentience: boolean;
  numberOfRotors: number;
}

export interface IRobot {
  id: number;
  name: string;
  configuration: Configuration;
  status: Array<String>;
  qa_status?: string | null;
  is_recyclable?: boolean;
}

interface State {
  processRobots: Array<IRobot>;
  recycleRobots: Array<IRobot>;
  shipRobots: Array<IRobot>;
}

export interface Props {
  robots: Array<IRobot>;
  qaPassedRobots: Array<IRobot>;
  factorySecondsRobots: Array<IRobot>;
  getRobotsRequest: any;
  processRobotsRequest: any;
  recycleRobotsRequest: any;
  extinguishFireFromRobotRequest: any;
  shipRobotsRequest: any;
}

const TabPane = Tabs.TabPane;

class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      processRobots: [],
      recycleRobots: [],
      shipRobots: [],
    };
  }

  componentDidMount() {
    this.props.getRobotsRequest();
  }

  handleAddRobotForProcessing = (robot: IRobot) => {
    this.setState({ processRobots: this.state.processRobots.concat(robot) });
  }

  handleRemoveRobotForProcessing = (robot: IRobot) => {
    this.setState({ processRobots: this.state.processRobots.filter((obj) => obj.id !== robot.id) });
  }

  handleAddRobotForRecycling = (robot: IRobot) => {
    this.setState({ recycleRobots: this.state.recycleRobots.concat(robot) })
  }

  handleRemoveRobotForRecycling = (robot: IRobot) => {
    this.setState({ recycleRobots: this.state.recycleRobots.filter(obj => obj.id !== robot.id) })
  }

  handleAddToShipment = (robot: IRobot) => {
    this.setState({ shipRobots: this.state.shipRobots.concat(robot) })
  }

  handleRemoveFromShipment = (robot: IRobot) => {
    this.setState({ shipRobots: this.state.shipRobots.filter((obj) => obj.id !== robot.id) })
  }

  handleExtinguishFireFromRobot = (robot: IRobot) => {
    const configuration = robot.configuration;
    const rotors = robot.configuration.numberOfRotors;
    this.props.extinguishFireFromRobotRequest(robot);

    // check if the robot is still recyclable, else remove it from the list
    let isRecyclable = false;
    if(rotors > 0) {
      if(configuration.color === 'blue' || (rotors < 3 || rotors > 8) ) {
        isRecyclable = true;
      }
    }

    if(configuration.hasWheels){
      if(robot.status.indexOf('rusty') !== -1 || configuration.hasTracks) {
        isRecyclable = true;
      }
    }

    if(configuration.hasSentience && robot.status.indexOf('loose screws') !== -1) {
      isRecyclable = true;
    }

    if (!isRecyclable) {
      this.setState({ recycleRobots: this.state.recycleRobots.filter(obj => obj.id !== robot.id) })
    }
  }

  processRobots = () => {
    const robotIds = this.state.processRobots.map((obj) => obj.id);
    const payload = { processRobots: robotIds };
    this.props.processRobotsRequest(payload);

    this.setState({ processRobots: [] })
  }

  recycleRobots = () => {
    const robotIds = this.state.recycleRobots.map((obj) => obj.id);
    const payload = { recycleRobots: robotIds };
    this.props.recycleRobotsRequest(payload)

    this.setState({ recycleRobots: [] })
  }

  shipRobots = () => {
    const robotIds = this.state.shipRobots.map((obj) => obj.id);
    const payload = { shipRobots: robotIds };
    this.props.shipRobotsRequest(payload);

    this.setState({ shipRobots: [] })
  }

  isRobotInProcessList = (id: number) => {
    return this.state.processRobots.filter((obj) => obj.id === id).length !== 0
  }

  isRobotInRecycleList = (id: number) => {
    return this.state.recycleRobots.filter((obj) => obj.id === id).length !== 0
  }

  renderShipListItems = (robot: IRobot) => {
    return (
      <Robot
        key={`${robot.id}-robot`}
        id={robot.id}
        name={robot.name}
        configuration={robot.configuration}
        status={robot.status}
        action={this.handleRemoveFromShipment}
      />
    );
  }

  render() {
    const { robots, qaPassedRobots, factorySecondsRobots } = this.props

    const robotsForQA = robots.filter(robot => robot.is_recyclable === false && robot.qa_status === null)
    const robotForQAComponents = robotsForQA.map((robot) => (
      <Col span={6} key={robot.id}>
        <Robot
          key={`${robot.id}-robot`}
          id={robot.id}
          name={robot.name}
          configuration={robot.configuration}
          status={robot.status}
          action={this.isRobotInProcessList(robot.id) ? this.handleRemoveRobotForProcessing : this.handleAddRobotForProcessing }
          extinguishFire={this.handleExtinguishFireFromRobot}
        />
      </Col>
    ));

    const robotForRecycleComponents = robots.filter(robot => robot.is_recyclable === true).map((robot) => (
      <Col span={6} key={robot.id}>
        <Robot
          key={`${robot.id}-robot`}
          id={robot.id}
          name={robot.name}
          configuration={robot.configuration}
          status={robot.status}
          action={this.isRobotInRecycleList(robot.id) ? this.handleRemoveRobotForRecycling : this.handleAddRobotForRecycling }
          extinguishFire={this.handleExtinguishFireFromRobot}
        />
      </Col>
    ));

    return(
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab="For QA" key="1">
          <Row style={{ paddingTop: "25px" }}>
            <Button type="primary" block={true} onClick={this.processRobots} disabled={this.state.processRobots.length <= 0}>Process Robots</Button>
          </Row>
          <Row gutter={16} type="flex" justify="start">
            {robotForQAComponents}
          </Row>
        </TabPane>
        <TabPane tab="Recycle" key="3">
          <Row style={{ paddingTop: "25px" }}>
            <Button type="primary" block={true} onClick={this.recycleRobots} disabled={this.state.recycleRobots.length <= 0}>Recycle Robots</Button>
          </Row>
          <Row gutter={16} type="flex" justify="start">
            {robotForRecycleComponents}
          </Row>
        </TabPane>
        <TabPane tab="Shipment" key="4">
          <Row style={{ paddingTop: "25px" }}>
            <Button
              type="primary"
              block={true}
              onClick={this.shipRobots}
              disabled={this.state.shipRobots.length <= 0}
            >
              Ship Robots
            </Button>
          </Row>
          <Row gutter={24} type="flex" justify="start">
            <Col span={24}>
              <List
                size="small"
                header={<div>Shipping Robot List</div>}
                bordered={true}
                dataSource={this.state.shipRobots}
                renderItem={this.renderShipListItems}
              />
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="start">
            <Col span={12}>
              <Shipment
                robots={qaPassedRobots}
                shipRobots={this.state.shipRobots}
                title="QA Passed Robots"
                onAdd={this.handleAddToShipment}
                onRemove={this.handleRemoveFromShipment}
              />
            </Col>
            <Col span={12}>
              <Shipment
                robots={factorySecondsRobots}
                shipRobots={this.state.shipRobots}
                title="Factory Seconds Robots"
                onAdd={this.handleAddToShipment}
                onRemove={this.handleRemoveFromShipment}
              />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    );
  }
}

export default Page;
