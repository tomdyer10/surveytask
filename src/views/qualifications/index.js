import React, { useState, useEffect } from "react";
import { Layout, List, Spin, Button, Checkbox } from "antd";

const { Content } = Layout;

const Qualifications = ({ number, country, nextPage, passQuestions }) => {
  // create state storing qualifications
  const [questions, setQuestions] = useState([]);
  const [questionBank, setBank] = useState();
  const [loading, setLoading] = useState(true);

  // GET all preset qualifications
  useEffect(() => {
    try {
      fetch(`http://localhost:3000/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: country
        })
      })
        .then(response => response.json())
        .then(data => {
          setBank(data.Questions);
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // add question to list
  const updateQuestions = ID => {
    var qlist = questions;
    if (qlist.includes(ID)) {
      const indx = qlist.indexOf(ID);
      qlist.splice(indx, 1);
      setQuestions(qlist);
    } else {
      qlist.push(ID);
      setQuestions(qlist);
    }
  };

  // POST update of selected qualifications to survey ID
  const createQuestion = question => {
    try {
      fetch("http://localhost:3000/addQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          SurveyNumber: number,
          name: question.Name,
          id: question.QuestionID
        })
      })
        .then(response => response.json())
        .then(console.log("Question created!"));
    } catch (e) {
      console.log(e);
    }
  };

  const createSurvey = () => {
    for (var i = 0; i < questionBank.length; i++) {
      if (questions.includes(questionBank[i].QuestionID)) {
        passQuestions(questionBank[i].QuestionText);
        createQuestion(questionBank[i]);
      }
    }
    nextPage();
  };

  return (
    <div>
      <Layout>
        <Content style={{ padding: "20px 50px 20px 50px" }}>
          <div
            style={{
              fontSize: "20px",
              padding: "0px 0px 10px 0px",
              fontWeight: "bold"
            }}
          >
            Select Questions:
          </div>
          <div
            style={{
              overflow: "auto",
              maxHeight: 400,
              border: "grey 1px solid",
              borderRadius: "3px",
              padding: "10px"
            }}
          >
            {loading ? (
              <Spin></Spin>
            ) : (
              <List
                dataSource={questionBank}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <div style={{ maxWidth: "70%" }}>{item.QuestionText}</div>
                    <Checkbox
                      style={{ position: "absolute", right: "5%" }}
                      onChange={() => updateQuestions(item.QuestionID)}
                    ></Checkbox>
                  </List.Item>
                )}
              ></List>
            )}
          </div>
          <Button
            type="primary"
            onClick={createSurvey}
            style={{ margin: "15px 0px 0px 0px" }}
          >
            View Survey
          </Button>
        </Content>
      </Layout>
    </div>
  );
};

export default Qualifications;
