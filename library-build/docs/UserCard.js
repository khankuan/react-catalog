export default {
  "description": "A component display a user info with options to add menu actions",
  "methods": [
    {
      "name": "renderActions",
      "docblock": null,
      "modifiers": [],
      "params": [],
      "returns": null
    },
    {
      "name": "renderMore",
      "docblock": null,
      "modifiers": [],
      "params": [],
      "returns": null
    }
  ],
  "dependencies": [
    "Card",
    "Avatar",
    "LinkButton",
    "div",
    "span"
  ],
  "props": {
    "name": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": ""
    },
    "avatar": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "expanded": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "onExpand": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "onActionClick": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    },
    "actions": {
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "string"
        }
      },
      "required": false,
      "description": "",
      "defaultValue": {
        "value": "[]",
        "computed": false
      }
    }
  },
  "name": "UserCard",
  "categories": [
    "User",
    "Cards"
  ],
  "tags": [
    "Profile"
  ]
}