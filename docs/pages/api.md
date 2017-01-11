# Story

## constructor(Component)

### Example
```
const story = new Story(MyButton)
```

## add({ title: string, description: string, content: JSON|ReactElement })

### Example - JSON
```
story.add({
  title: 'Rounded',
  description: 'Button that is rounded',
  content: { rounded: true, children: 'Click Me' }
})
```

### Example - ReactElement
```
story.add({
  title: 'Rounded',
  description: 'Button that is rounded',
  content: <MyButton rounded>Click Me<MyButton>
})
```

## sequence({ title: string, description: string }, [{ title: string, update: JSON|function }])

### Example - JSON
```
story.sequence({
  title: 'Button becomes active',
  description: 'Button text and accent changes when it becomes active'  
}, [
  {
    title: 'Before clicking',
    update: { children: 'Enable' }
  }, {
    title: 'After clicking',
    update: { children: 'Disable', accent: 'success' }
  }
])
```

### Example - function
```
story.sequence({
  title: 'Button becomes active',
  description: 'Button text and accent changes when it becomes active'  
}, [
  {
    title: 'Before clicking',
    update: { children: 'Enable' }
  }, {
    title: 'After clicking',
    update: (props, ref) => {
      return { ...props, children: 'Disable', accent: 'success' }
    }
  }
])
```

### Example - ref
```
story.sequence({
  title: 'Button animates when hovered',
  description: 'Component has an internal state storing the `hovering` state to show animations'
}, [
  {
    title: 'Before hovering',
    update: { children: 'My Button' }
  }, {
    title: 'After hovering',
    update: (props, ref) => {
      ref.handleMouseOver() //  Alternatively, ref.setState({ hovering: true })
    }
  }
])
```

## handler(name: string)

### Example
```
story.sequence({
  title: 'User clicking an action',
}, [
  {
    title: 'Initial',
    update: { onClick: story.handler('onClick') }
  }, {
    title: 'After hovering',
    update: (props, ref) => {
      ref.handleActionClick('Action 1')
    }
  }
])
```

## skipTest(bool)
Set to true to skip test for the story.

## theme
Set the theme of the well that contains the rendered output.

# Description

## Categories
```
@categories: Buttons, Forms
```

## Keywords
```
@tags: Select, Dropdown, Menu
```

## Default
Enable default story for component
```
@default
```

## Ignore components
```
@ignored
```

# Components
Simple components available for use for writing stories.

## Well
`theme` - ['light', 'dark']
`title` - String
`className` - String
`children` - Node

## ListLayout
`className` - String
`children` - Node
