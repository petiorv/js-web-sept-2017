let functions = {}

let observer = {
  addObserver: (name, func) => {
    functions[name] = func
  },
  executeObserver: (name, params) => {
    functions[name](params)
  }
}

export default observer