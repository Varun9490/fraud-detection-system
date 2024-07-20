const { exec } = require("child_process");

exports.runFraudDetection = async (req, res) => {
  try {
    exec(
      "python3 path/to/fraud_detection_script.py",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send("Server error");
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return res.status(500).send("Server error");
        }
        res.json({ message: stdout });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
