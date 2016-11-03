class ValidationError extends Error {
  constructor (message) {
    super(JSON.stringify(message))
    this.data = message
  }
}

module.exports = ValidationError
