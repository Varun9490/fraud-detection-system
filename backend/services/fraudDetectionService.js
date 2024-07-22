const { PythonShell } = require("python-shell");
const path = require("path");

const options = {
  mode: "text",
  pythonOptions: ["-u"],
  scriptPath: path.join(__dirname, "../fraud detection model"), // Corrected path
  args: [JSON.stringify({ amount: 15000, description: "Large transaction" })],
};

PythonShell.run("fraud_detection_service.py", options, function (err, results) {
  if (err) throw err;
  console.log("results: %j", results);
});
