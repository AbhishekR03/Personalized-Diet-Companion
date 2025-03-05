const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionsClient();

const chatbotResponse = async (query) => {
  const sessionPath = sessionClient.sessionPath(
    "your-dialogflow-project-id",
    "12345"
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: "en",
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult.fulfillmentText;
};

module.exports = chatbotResponse;
