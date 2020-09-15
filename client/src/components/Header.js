import React from "react";
import { Row, Col } from "reactstrap";

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Study Blog</h1>
          <h4>방문해주셔서 감사합니다</h4>
          <h4>訪問してくださってありがとうございます。</h4>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
