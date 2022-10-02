const fs = require("fs");
const path = require("path");
const muswish = require("../dist/index");

const content = fs.readFileSync(
  path.resolve(__dirname, "./template.muswish"),
  "utf-8"
);

const output = muswish(content, {
  title: "Template output",
  name: "Muswish",
  love: ["html", "css", "js"],
  error: false,
  items: ["Banana", "Apple"],
  friends: [
    { firstName: "Yoann", lastName: "CHB" },
    { firstName: "Elia", lastName: "AM" },
  ],
  friendNameFn: function () {
    return this.firstName + " " + this.lastName;
  },
});

console.log("-- template --", content, "-- output --", output, "-- end --");

fs.writeFileSync(path.resolve(__dirname, "./output.html"), output, "utf-8");
