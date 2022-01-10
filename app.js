const express = require("express");
const html = require("html");
const client = require("@mailchimp/mailchimp_marketing");

let app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

client.setConfig({
  apiKey: "85fe888f74e0e853c8f34edeb7cc4486-us20",
  server: "us20",
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  const run = async () => {
    const listID = "b2afc1a1db";
    const response = await client.lists.addListMember(listID, {
      email_address: email,
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
      status: "pending",
    });
    res.sendFile(`${__dirname}/success.html`);
  };
  run();
});

app.listen(3000, () => {
  console.log("Server is running on localhost3000");
});
