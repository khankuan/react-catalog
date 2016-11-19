export default {
  "description": "To wrap contents in a box-like div",
  "methods": [],
  "dependencies": [
    "div"
  ],
  "props": {
    "depth": {
      "type": {
        "name": "enum",
        "value": [
          {
            "value": "'1'",
            "computed": false
          },
          {
            "value": "'2'",
            "computed": false
          }
        ]
      },
      "required": false,
      "description": "Darkness",
      "defaultValue": {
        "value": "'1'",
        "computed": false
      }
    },
    "children": {
      "type": {
        "name": "node"
      },
      "required": true,
      "description": ""
    }
  },
  "name": "Card",
  "tags": [
    "Containers",
    "Cards"
  ],
  "keywords": [
    "Box"
  ]
}