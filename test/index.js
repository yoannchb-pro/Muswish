const muswish = require("../dist/index");

console.log(
  muswish(
    `
{{ [if] error }}
Something went wrong
{{ [end if] }}
{{ [@@] this is a comment }}
{{ [if not] error }}
{{ this.noerror }}
{{ [end if not] }}
{{ [@@] 
I m  a comment
With multilines
}}
{{ name }} has chance to love {{ [!!] {{ fruits }} }}:
{{ [for] items }}
    - {{ name }} with {{ prc }}%
{{ [end for] }}
{{ [!!] 
{{ [for] items }}
    - {{ name }} with {{ prc }}%
{{ [end for] }}
}}

{{ [for] items }}
* {{[>] name}} said : {{ [>] computedName }}
{{ [end for] }}

List of fruits:
{{ [for] fruits }}
    - {{ this }}
{{ [end for] }}

{{ [for] fruits }}
{{ [for] items }}
- this message should be display 2 * 2 = 4 times
{{ [end for] }}}}
{{ [end for] }}
    `,
    {
      items: [
        { name: "Banana", prc: 80 },
        { name: "Apple", prc: 50 },
      ],
      fruits: ["Banana", "Apple"],
      noerror: "All is going fine",
      name: "Yoann",
      computedName: function () {
        return this.name + " is " + this.prc + "% hot";
      },
    }
  )
);
