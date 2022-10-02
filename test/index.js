const muswish = require("../dist/index");

const test = `{{ [if] error }}
Something went wrong
{{ [end if] error }}
{{ [@@] this is a comment }}
{{ [@@] 
  this is a comment 
  on multiples lines
}}
{{ [if not] error }}
{{ this.noerror }}
{{ [end if not] error }}

{{ name }} has chance to love :
{{ [for] items }}
    - {{ name }} with {{ prc }}%
{{ [end for] items }}

{{ [for] items }}
* {{[>] name}} said : {{ [>] computedName }}
{{ [end for] items }}

List of fruits:
{{ [for] fruits }}
    - {{ this }}
{{ [end for] fruits }}

{{ [for] list }}
{{ [for] fruits }}
- this message should be display 2 * 2 = 4 times
{{ [end for] fruits }}
{{ [end for] list }}`;

console.log(
  "-- template --",
  test,
  "-- output --",
  muswish(test, {
    items: [
      { name: "Banana", prc: 80 },
      { name: "Apple", prc: 50 },
    ],
    fruits: ["Banana", "Apple"],
    list: [
      { name: "Banana", prc: 80, fruits: ["Banana", "Apple"] },
      { name: "Apple", prc: 50, fruits: ["Banana", "Apple"] },
    ],
    noerror: "All is going fine",
    name: "Yoann",
    computedName: function () {
      return this.name + " is " + this.prc + "% hot";
    },
  }),
  "-- end --"
);
