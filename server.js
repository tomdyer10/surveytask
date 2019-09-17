const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const PORT = process.env.PORT || 3000;

// import middleware
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const APIKEY = "1A9201EF-B64A-450C-9723-736C294CC621";

app.get("/surveycountries", (req, res) => {
  request(
    {
      url: ` https://sandbox.techops.engineering/Lookup/v1/BasicLookups/BundledLookups/Countries,CountryLanguages`,
      headers: {
        Authorization: APIKEY
      }
    },
    (error, response) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "error" });
      }
      res.json(JSON.parse(response.body));
    }
  );
});

app.post("/questions", (req, res) => {
  const { country } = req.body;
  request(
    {
      method: "GET",
      url: `https://sandbox.techops.engineering/Lookup/v1/QuestionLibrary/AllQuestions/${country}`,
      headers: {
        Authorization: APIKEY,
        "Content-Type": "application/json"
      }
    },
    (error, response) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ error });
      }
      res.json(JSON.parse(response.body));
    }
  );
});

app.post("/addQuestions", (req, res) => {
  const { SurveyNumber, name, id } = req.body;
  const options = {
    method: "POST",
    url: `https://sandbox.techops.engineering/Demand/v1/SurveyQualifications/Create/${SurveyNumber}`,
    headers: {
      Authorization: APIKEY
    },
    body: {
      Name: name,
      QuestionID: id,
      LogicalOperator: "OR",
      IsActive: true,
      NumberOfRequiredConditions: 1,
      Order: 7,
      PreCodes: ["2"]
    },
    json: true
  };

  const callback = (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${response.statusCode}`);
    res.json(response.body);
  };

  request.post(options, callback);
});

app.post("/create", (req, res) => {
  const { name, country, quota } = req.body;
  const options = {
    method: "POST",
    url: `https://sandbox.techops.engineering/Demand/v1/Surveys/Create`,
    headers: {
      Authorization: APIKEY,
      "Content-Type": "application/json"
    },
    body: {
      SurveyName: name,
      CountryLanguageID: country,
      ClientSurveyLiveURL: "https://www.surveyURL.com?rid=[%RID%]",
      Quota: quota
    },
    json: true
  };

  const callback = (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${response.statusCode}`);
    res.json(response.body);
  };

  request.post(options, callback);
});

app.post("/getQuestions", (req, res) => {
  const { surveyNumber } = req.body;
  request(
    {
      method: "GET",
      url: `https://sandbox.techops.engineering/Demand/v1/SurveyQualifications/BySurveyNumber/${surveyNumber}`,
      headers: {
        Authorization: APIKEY,
        "Content-Type": "application/json"
      }
    },
    (error, response) => {
      if (error || response.statusCode !== 200) {
        console.log(response.body);
        return res.status(500).json({ error });
      }
      res.json(JSON.parse(response.body));
    }
  );
});

// run backend
http: app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
