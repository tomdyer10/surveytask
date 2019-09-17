import React from "react";
import CreateSurvey from "./views/create";
import Qualifications from "./views/qualifications";
import ReviewSurvey from "./views/review";
import { Layout } from "antd";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      survey: "create",
      surveyNumber: null,
      surveyName: null,
      surveyCountry: null,
      questions: [],
      quota: null
    };
  }

  // create survey
  createSurvey = (number, name, country, quota) => {
    this.setState({
      survey: "qualifications",
      surveyNumber: number,
      surveyName: name,
      surveyCountry: country,
      quota: quota
    });
  };

  // save and review survey
  saveAndReview = () => {
    this.setState({
      survey: "review"
    });
  };

  //  update state questions
  setQuestions = incoming => {
    var listed = this.state.questions;
    listed.push(incoming);
    this.setState({
      questions: listed
    });
  };

  // create new
  createNew = () => {
    this.setState({
      survey: "create",
      surveyNumber: null,
      surveyName: null,
      surveyCountry: null,
      questions: []
    });
  };

  render() {
    const {
      survey,
      surveyNumber,
      surveyName,
      surveyCountry,
      questions,
      quota
    } = this.state;
    return (
      <div className="App">
        <Layout background={"white"}>
          <Header></Header>
          <Content style={{ background: "white" }}>
            {survey === "create" ? (
              <CreateSurvey callback={this.createSurvey}></CreateSurvey>
            ) : survey === "qualifications" ? (
              <Qualifications
                number={surveyNumber}
                name={surveyName}
                country={surveyCountry}
                nextPage={this.saveAndReview}
                passQuestions={this.setQuestions}
              ></Qualifications>
            ) : (
              <ReviewSurvey
                surveyNumber={surveyNumber}
                surveyName={surveyName}
                callback={this.createNew}
                questions={questions}
                quota={quota}
              ></ReviewSurvey>
            )}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
