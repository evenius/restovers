// It's not rocket science, is it?
function FoundResponse (responseData) {
  let {data, nextPage, prevPage} = responseData
  let response = {
    result: 'success',
    data
  }
  if (nextPage || prevPage) {
    response.paging = {}
    if (nextPage) { response.paging.next = nextPage }
    if (prevPage) { response.paging.prev = prevPage }
  }
  return response
}

module.exports = FoundResponse
