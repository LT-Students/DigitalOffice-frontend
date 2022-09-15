const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const cmd = "ng-openapi-gen -c ";
const configDirectory = path.join(__dirname, "config");

fs.readdir(configDirectory, function(err, files) {
  if (err) {
    return console.log("Unable to scan swagger directory: " + err);
  }
  files.forEach(function(file) {
    exec(cmd + path.join(configDirectory, file), function(error, stdout, stderr) {
      console.log("----" + file.replace(".json", "") + " service generate----");
      if (stderr) {
        console.log(stderr);
      } else {
        console.log("OK!");
      }
    });
  });
});
