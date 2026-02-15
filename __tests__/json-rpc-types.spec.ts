import { isJsonRpcNotification, isJsonRpcRequest, isJsonRpcSuccess, isJsonRpcError } from '@src/json-rpc-types'

describe('isJsonRpcNotification', () => {
  it('return true', () => {
    const obj = {
      jsonrpc: '2.0'
    , method: 'method'
    , params: []
    }

    const result = isJsonRpcNotification(obj)

    expect(result).toBe(true)
  })

  it('return false', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , method: 'method'
    , params: []
    }

    const result = isJsonRpcNotification(obj)

    expect(result).toBe(false)
  })

  test('edge: no params', () => {
    const obj = {
      jsonrpc: '2.0'
    , method: 'method'
    }

    const result = isJsonRpcNotification(obj)

    expect(result).toBe(true)
  })
})

describe('isJsonRpcRequest', () => {
  it('return true', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , method: 'method'
    , params: []
    }

    const result = isJsonRpcRequest(obj)

    expect(result).toBe(true)
  })

  it('return false', () => {
    const obj = {
      jsonrpc: '2.0'
    , method: 'method'
    , params: []
    }

    const result = isJsonRpcRequest(obj)

    expect(result).toBe(false)
  })

  test('edge: no params', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , method: 'method'
    }

    const result = isJsonRpcRequest(obj)

    expect(result).toBe(true)
  })
})

describe('isJsonRpcSuccess', () => {
  describe('result exists', () => {
    it('return true', () => {
      const obj = {
        jsonrpc: '2.0'
      , id: 'id'
      , result: undefined
      }

      const result = isJsonRpcSuccess(obj)

      expect(result).toBe(true)
    })
  })

  describe('result does not exist', () => {
    it('return false', () => {
      const obj = {
        jsonrpc: '2.0'
      , id: 'id'
      }

      const result = isJsonRpcSuccess(obj)

      expect(result).toBe(false)
    })
  })
})

describe('isJsonRpcError', () => {
  describe('error exists', () => {
    describe('error structure is legal', () => {
      it('return true', () => {
        const obj = {
          jsonrpc: '2.0'
        , id: 'id'
        , error: {
            code: 0
          , message: 'message'
          }
        }

        const result = isJsonRpcError(obj)

        expect(result).toBe(true)
      })
    })

    describe('error sturcture is illegal', () => {
      it('return false', () => {
        const obj = {
          jsonrpc: '2.0'
        , id: 'id'
        , error: { code: 0 }
        }

        const result = isJsonRpcError(obj)

        expect(result).toBe(false)
      })
    })
  })
  
  describe('error does not exist', () => {
    it('return false', () => {
      const obj = {
        jsonrpc: '2.0'
      , id: 'id'
      }

      const result = isJsonRpcError(obj)

      expect(result).toBe(false)
    })
  })
})
