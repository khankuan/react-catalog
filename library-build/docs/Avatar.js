export default {
  "description": "Display pic of a user",
  "methods": [],
  "dependencies": [
    "img"
  ],
  "props": {
    "src": {
      "type": {
        "name": "string"
      },
      "required": true,
      "description": "Image Url",
      "defaultValue": {
        "value": "'http://success.grownupgeek.com/wp-content/uploads/2013/01/no-avatar.png'",
        "computed": false
      }
    },
    "type": {
      "type": {
        "name": "enum",
        "value": [
          {
            "value": "'square'",
            "computed": false
          },
          {
            "value": "'round'",
            "computed": false
          }
        ]
      },
      "required": false,
      "description": "",
      "defaultValue": {
        "value": "'round'",
        "computed": false
      }
    },
    "theme": {
      "type": {
        "name": "enum",
        "value": [
          {
            "value": "'light'",
            "computed": false
          },
          {
            "value": "'dark'",
            "computed": false
          }
        ]
      },
      "required": false,
      "description": "",
      "defaultValue": {
        "value": "'light'",
        "computed": false
      }
    }
  },
  "name": "Avatar",
  "categories": [
    "Image"
  ],
  "tags": [
    "Profile",
    "Picture"
  ],
  "hasDefault": true
}