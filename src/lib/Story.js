export default class Story {
  stories = []
  handleCalls = []

  constructor (type) {
    this.type = type
  }

  add = story => {
    this.stories.push(story)
  }

  sequence = (story, sequence) => this.stories.push({ ...story, sequence })

  handler = method => {
    return (...args) => {
      if (process.env.NODE_ENV === 'TEST') {
        this.handleCalls.push({ method, args })
      } else {
        args = args.map(arg => {
          if (arg && arg.preventDefault) {
            return `[Event ${arg.constructor.name}]`;
          }
          return arg
        })
        alert(`${method} called with\n\n${JSON.stringify(args, null, 2)}`)
      }
    }
  }

  popHandleCalls = () => {
    const out = this.handleCalls
    this.handleCalls = []
    return out
  }

  static getSequenceInitialProps = function (story) {
    const step = story.sequence[0]
    if (typeof step.update === 'function') {
      return step.update()
    } else if (typeof step.update === 'object') {
      return step.update
    }
  }

  static getSequenceStepProps = async function(ref, story, index, prevProps) {
    const step = story.sequence[index]
    if (typeof step.update === 'function') {
      const updated = await step.update(prevProps, ref)
      return updated || prevProps
    } else if (typeof step.update === 'object') {
      return step.update
    }
    return prevProps
  }
}
