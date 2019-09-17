import React, { useState, useEffect } from "react";
import { Form, Input, Cascader, InputNumber, Button, Layout } from "antd";

const defaultQuota = 250;

const CreateSurvey = ({ callback }) => {
  // create states for API call
  const [countries, setCountries] = useState();
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [quota, setQuota] = useState(defaultQuota);

  // get country options from API call
  useEffect(() => {
    try {
      fetch("http://localhost:3000/surveycountries", {
        method: "get"
      })
        .then(response => response.json())
        .then(data =>
          setCountries(
            data.AllCountryLanguages.map(country => {
              return { value: country.Id, label: country.Name };
            })
          )
        );
    } catch (e) {
      console.log(e);
    }
  }, []);

  // submit and create survey - save survey ID
  const createSurvey = () => {
    try {
      fetch(" http://localhost:3000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          country: parseInt(country[0]),
          quota: quota
        })
      })
        .then(response => response.json())
        .then(response =>
          callback(
            response.Survey.SurveyNumber,
            response.Survey.SurveyName,
            response.Survey.CountryLanguageID,
            quota
          )
        );
    } catch (e) {
      console.log(e);
    }
  };

  const formItemLayout = {
    labelCol: { span: 6, offset: 1 },
    wrapperCol: { span: 10, offset: 1 }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 16,
      offset: 8
    }
  };

  return (
    <div>
      <Layout>
        <Form {...formItemLayout}>
          <Form.Item label="Survey Name" style={{ padding: "20px" }}>
            <Input
              placeholder="Enter your survey's name"
              size="default"
              onChange={e => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Survey Country">
            <Cascader
              options={countries}
              placeholder="Select Country"
              onChange={e => setCountry(e)}
            />
          </Form.Item>
          <Form.Item label="Number of Participants">
            <InputNumber
              min={50}
              max={5000}
              defaultValue={defaultQuota}
              onChange={setQuota}
            ></InputNumber>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              disabled={!name || !country}
              onClick={createSurvey}
            >
              Create Survey
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </div>
  );
};

export default CreateSurvey;
