import React, { useState } from "react";
import { Layout, Card, Button } from "antd";

const { Content } = Layout;

const heading = {
  fontWeight: "bold",
  padding: "10px 10px"
};

const entry = {
  padding: "5px 15px",
  fontWeight: "400"
};

const ReviewSurvey = ({ callback, questions, surveyName, quota }) => {
  return (
    <div>
      <Layout>
        <Content style={{ padding: "50px" }}>
          <Card title="Review Survey">
            <div style={heading}>Name:</div>
            <p style={entry}>{surveyName}</p>
            <div style={heading}>Participant quota:</div>
            <p style={entry}>{quota}</p>
            <div style={heading}>Questions:</div>
            {questions.map(text => {
              return (
                <p style={entry} key={text}>
                  {text}
                </p>
              );
            })}
          </Card>
          <Button onClick={callback} type="primary" style={{ margin: "20px" }}>
            Create New
          </Button>
        </Content>
      </Layout>
    </div>
  );
};

export default ReviewSurvey;
