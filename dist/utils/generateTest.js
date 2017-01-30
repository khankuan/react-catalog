"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDefaultTest = generateDefaultTest;
exports.generateStoriesTest = generateStoriesTest;
function generateDefaultTest(_ref) {
  var data = _ref.data,
      it = _ref.it,
      name = _ref.name,
      componentPath = _ref.componentPath;

  var test = "\nimport React from 'react'\nimport " + name + " from '" + componentPath + "'\nimport ReactTestUtils from 'react-addons-test-utils'\nit('" + it + "', () => {\n  expect(ReactTestUtils.createRenderer().render(" + data + ")).toMatchSnapshot();\n})\n  ";
  return test;
}

function generateStoriesTest(_ref2) {
  var importedPath = _ref2.importedPath,
      name = _ref2.name;

  var test = "\nimport React from 'react'\nimport renderer from 'react-test-renderer'\nimport story from '" + importedPath + "'\nimport { Story } from 'react-library'\n\njest.useFakeTimers()\n\nconst stories = story.stories.filter(s => !s.skipTest)\nstories\n  .forEach(s => {\n    if (s.sequence) {\n      const Component = story.type\n      let props = Story.getSequenceInitialProps(s)\n      let ref\n      const node = renderer.create(<Component {...props} ref={_ref => (ref = _ref)} />)\n      s.sequence.forEach(async function(step, i) {\n        it(`" + name + " - ${s.title} - ${step.title}`, async () => {\n          if (i > 0) {\n            const result = Story.getSequenceStepProps(ref, s, i, props)\n            jest.runAllTimers()\n            props = await result\n            node.update(<Component {...props} ref={_ref => (ref = _ref)} />)\n          }\n          const tree = node.toJSON()\n          expect(tree).toMatchSnapshot()\n          expect(story.popHandleCalls()).toMatchSnapshot()\n        })\n      })\n    } else {\n      let node\n      if (React.isValidElement(s.content)) {\n        node = s.content\n      } else if (Array.isArray(s.content)) {\n        node = <div>{React.Children.map(s.content, (child, i) => React.cloneElement(child, { key: i }))}</div>\n      } else {\n        const Component = story.type\n        node = <Component {...s.content} />\n      }\n      it(`" + name + " - ${s.title}`, () => {\n        expect(renderer.create(node)).toMatchSnapshot()\n      })\n    }\n  })\n  if (stories.length === 0) {\n    it(`" + name + " - No stories`, () => {\n    });\n  }\n";
  return test;
}