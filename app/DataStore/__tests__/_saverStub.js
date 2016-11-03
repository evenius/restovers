const { stub } = require('sinon')

function saverStub () {}
let updateStub = stub().yields(null, 'ok')
saverStub.prototype.update = updateStub

let insertStub = stub().yields(null, 1)
saverStub.prototype.insert = insertStub

module.exports = {
  Saver: saverStub,
  insert: insertStub,
  update: updateStub
}
// stub().yields(null, new Buffer(fakeCsv))
