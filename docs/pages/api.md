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
