import * as React from "react";
import { Spin, Icon } from 'antd';

export interface Props {
  isLoading: boolean;
  error: boolean;
}

function LoadingComponent({ isLoading, error }: Props) {
  const icon = <Icon type="loading" style={{ fontSize: "5em", color: "#D20F84" }} spin={true} />

  if(isLoading) {
    // Handle loading state
    return (
      <div className="loading">
        <Spin spinning={isLoading} indicator={icon} />
      </div>
    );
  } else if(error) {
    // Handle error state
    return (
      <div>Sorry, there was a problem loading the page.</div>
    );
  }

  return null;
}

export default LoadingComponent;
