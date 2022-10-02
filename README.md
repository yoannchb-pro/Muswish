# Muswish

> This project still in construction !

Muswish is a new templating language writted in javascript without any dependencies

## Inspiration

The README is inspired from [mustache.js](<[mustache.js](https://github.com/janl/mustache.js/)>)

## Where to use ?

You can use it to render muswish templates anywhere you can use JavaScript. This includes web browsers, server-side environments such as [Node.js](http://nodejs.org/), and [CouchDB](http://couchdb.apache.org/) views.

## Install

```bash
$ npm install muswish --save
```

## Usage

Below is a quick example how to use:

```js
const muswish = require("muswish");

const view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  },
};

const output = muswish("{{title}} spends {{calc}}", view);
```

In this example, the `muswish` function takes two parameters: 1) the template and 2) the data needed to render the template.

## Templates

There are several techniques that can be used to load templates and hand them to muswish.js, here are two of them:

#### Include Templates

If you need a template for a dynamic part in a static website, you can consider including the template in the static HTML file to avoid loading templates separately. Here's a small example:

```js
// file: render.js

const template = document.querySelector("#template").innerHTML;
const output = muswish(template, { name: "Yoann" });
document.querySelector("#target").innerHTML = output;
```

```html
<html>
  <body>
    <div id="target">Loading...</div>
    <script id="template" type="x-tmpl-muswish">
      Hello {{ name }}!
    </script>
  </body>
  <script src="https://unpkg.com/muswish@latest"></script>
  <script src="render.js"></script>
</html>
```

#### Load External Templates

If your templates reside in individual files, you can load them asynchronously and render them when they arrive. Another example using [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch):

```js
//render.js

fetch("template.muswish")
  .then((response) => response.text())
  .then((template) => {
    const output = muswish(template, { name: "Yoann" });
    document.querySelector("#target").innerHTML = rendered;
  });
```

### Variables

The most basic tag type is a simple variable. A `{{name}}` tag renders the value of the `name` key in the current context. If there is no such key, nothing is rendered.

If you want `{{name}}` _not_ to be interpreted as a muswish tag, but rather to appear exactly as `{{name}}` in the output, you can custom the delimiters (see below);

View:

```json
{
  "name": "Yoann",
  "company": "<b>GitHub</b>"
}
```

Template:

```
* {{name}}
* {{age}}
* {{company}}
```

Output:

```
* Yoann
*
* <b>GitHub</b>
```

View:

```json
{
  "name": {
    "first": "Michael",
    "last": "Jackson"
  },
  "age": "RIP"
}
```

Template:

```
* {{name.first}} {{name.last}}
* {{age}}
```

Output:

```
* Michael Jackson
* RIP
```

### If statement

#### False Values or Empty Lists

If the `person` key does not exist, or exists and has a value of `null`, `undefined`, `false`, `0`, or `NaN`, or is an empty string or an empty list, the block will not be rendered.

View:

```json
{
  "person": false
}
```

Template:

```
Shown. {{ [if] person }} Never shown! {{ [end if] person }}
```

Output:

```html
Shown.
```

### If not statement

View:

```json
{
  "error": false
}
```

Template:

```
{{ [if not] error }} No error! {{ [end if not] error }}
```

Output:

```html
No error!
```

#### Non-Empty Lists

If the `person` key exists and is not `null`, `undefined`, or `false`, and is not an empty list the block will be rendered.

View:

```json
{
  "stooges": [{ "name": "Moe" }, { "name": "Larry" }, { "name": "Curly" }]
}
```

Template:

```html
{{ [for] stooges }}
<b>{{ name }}</b>
{{ [end for] stooges }}
```

Output:

```html
<b>Moe</b>
<b>Larry</b>
<b>Curly</b>
```

When looping over an array of strings, a `this` can be used to refer to the current item in the list.

View:

```json
{
  "musketeers": ["Athos", "Aramis", "Porthos", "D'Artagnan"]
}
```

Template:

```
{{ [for] musketeers }}
* {{this}}
{{ [end for] musketeers }}
```

Output:

```
* Athos
* Aramis
* Porthos
* D'Artagnan
```

If the value of a section variable is a function, it will be called in the context of the current item in the list on each iteration. You can use a function from the original data by using `[>]` operator that refer to the original data and not the current item.

View:

```js
{
  "beatles": [
    { "firstName": "John", "lastName": "Lennon" },
    { "firstName": "Paul", "lastName": "McCartney" },
    { "firstName": "George", "lastName": "Harrison" },
    { "firstName": "Ringo", "lastName": "Starr" }
  ],
  "name": function () {
    return this.firstName + " " + this.lastName;
  }
}
```

Template:

```
{{ [for] beatles}}
* {{ [>] name}}
{{ [end for] beatles }}
```

Output:

```
* John Lennon
* Paul McCartney
* George Harrison
* Ringo Starr
```

### Comments

```
Today{{ [@@] I m a comment }}
Yesterday{{ [@@]
I m a comment
On multiple lines
}}
```

Will render as follows:

```
Today
Yesterday
```

### Custom delimiters

define custom delimiters:

```js
muswish.customDelimiters("<%", "%>");
```

template:

```
{{ something }}
<% something %>
```

width data:

```js
const data = { something: "Hey" };
```

output:

```
{{ something }}
Hey
```

### Adding plugins

You can add custom operation with `muswish.addPlugin` function.

Example for the `for` statement:

```js
muswish.addPlugin("for", {
  open: "FOR",
  close: "END FOR",
  fn: function (
    _m: string,
    template: string, //text content
    content: string, //for content {{ [for] guys }} -> guys
    data: Data, //current data of the item if we are in a for as example
    originalData: Data, //original data
    callback: Function //call muswish function
  ) {
    //allow you to get the element with the path
    const items = getDeepObj(data, content);
    if (!(items instanceof Array)) return "";
    return items
      .map((e: Data) => callback(template, e, originalData))
      .join("\n");
  },
});
```

type

```ts
export type RULE = {
  open: string;
  close?: string;
  multilines?: boolean;
  fn: (
    _m: string,
    template: string,
    content: string,
    data: Data,
    originalData: Data,
    callback: Function
  ) => string;
};
```
