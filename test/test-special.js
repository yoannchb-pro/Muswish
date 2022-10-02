const muswish = require("../dist");

console.log(
  muswish(
    `Hi! My name is {{ name }} and I love {{ love }}
    {{ notShow }}

    {{ [if] error }}
    Oh no something went wrong !
    {{ [end if] error }}

    {{ [@@] comment }}
    {{ [@@] 
        We are testing for
        See below
    }}

    I also love:
        {{ [for] items }}
        {{ this }}
        {{ [end for] items }}

    And my friends are:
    {{ [for] friends }}
        {{ [>] friendNameFn }}
    {{ [end for] friends }}`,
    {
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
    }
  )
);

console.log(
  muswish(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
</head>
<body>
    <h1>Hi! My name is {{ name }} and I love {{ love }}</h1>
    {{ notShow }}
    {{ [if] error }}
    <h2>Oh no something went wrong !</h2>
    {{ [end if] error }}
    {{ [if not] error }}<h2>No error !</h2>{{ [end if not] error }}
    {{ [@@] comment }}
    {{ [@@] 
        We are testing for
        See below
    }}
    <p>I also love:</p>
    <ul>
        {{ [for] items }}
        <li>{{ this }}</li>
        {{ [end for] items }}
    </ul>

    <p>And my friends are:</p>
    <textarea style="height: 20rem">
    {{ [for] friends }}
        {{ [>] friendNameFn }}
    {{ [end for] friends }}
    </textarea>
</body>
</html>`,
    {
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
    }
  )
);
