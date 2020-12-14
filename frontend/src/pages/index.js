import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Onboard from "./Onboard";
import Users from "./Users";

const { Content } = Layout;

const AppLayout = styled(Layout)`
  widht: 100%;
  height: 100%;
  background-color: transparent;
`;

const Pages = () => {
  return (
    <AppLayout>
      <Content>
        <Switch>
          <Route path="/" exact component={Onboard} />
          <Route path="/users" exact component={Users} />
        </Switch>
      </Content>
    </AppLayout>
  );
};

export default Pages;
