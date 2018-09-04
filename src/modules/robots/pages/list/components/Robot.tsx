import * as React from "react";
import { FaFireExtinguisher } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Tree } from 'antd';
import { IRobot } from "../Page"


export interface Props extends IRobot {
  action: any;
  process?: string;
  extinguishFire?: any;
}

const TreeNode = Tree.TreeNode;

class Robot extends React.Component<Props> {

  onSelect = () => {
    this.props.action(this.props);
  }

  extinguishFireFromRobot = () => {
    this.props.extinguishFire(this.props);
  }

  render() {
    const { id, name, configuration, status} = this.props;
    const isOnFire = status.indexOf('on fire') !== -1 && configuration.hasSentience;
    const fireIcon = (
      <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
        <div>
          <FaFireExtinguisher />
        </div>
      </IconContext.Provider>
    )

    return(
      <Tree
          onSelect={this.onSelect}
          onRightClick={isOnFire ? this.extinguishFireFromRobot : undefined}
          showIcon={true}
        >
        <TreeNode
          title={`${id}-${name}`}
          key="0-0"
          id={id}
          icon={isOnFire ? fireIcon : ""}
        >
          <TreeNode
            title={`color: ${configuration.color ? configuration.color : "n/a"}`}
            key="0-0-0"
            selectable={false}
          />
          <TreeNode
            title={`hasTracks: ${configuration.hasTracks ? "yes" : "n/a"}`}
            key="0-0-1"
            selectable={false}
          />
          <TreeNode
            title={`hasWheels: ${configuration.hasWheels ? "yes" : "n/a"}`}
            key="0-0-2"
            selectable={false}
          />
          <TreeNode
            title={`hasSentience: ${configuration.hasSentience ? "yes" : "n/a"}`}
            key="0-0-3"
            selectable={false}
          />
          <TreeNode
            title={`hasSentience: ${configuration.numberOfRotors ? configuration.numberOfRotors : "n/a"}`}
            key="0-0-4"
            selectable={false}
          />
        </TreeNode>
      </Tree>
    );
  }
}

export default Robot;
