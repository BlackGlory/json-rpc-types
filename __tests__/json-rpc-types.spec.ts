import { describe, test, expect } from 'vitest'
import { isJsonRpcNotification, isJsonRpcRequest, isJsonRpcSuccess, isJsonRpcError } from '@src/json-rpc-types.js'

describe('isJsonRpcNotification', () => {
  test('true', () => {
    const obj = {
      jsonrpc: '2.0'
    , method: 'method'
    , params: []
    }

    const result = isJsonRpcNotification(obj)

    expect(result).toBe(true)
  })

  test('false', () => {
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
  test('true', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , method: 'method'
    , params: []
    }

    const result = isJsonRpcRequest(obj)

    expect(result).toBe(true)
  })

  test('false', () => {
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
  test('result exists', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , result: undefined
    }

    const result = isJsonRpcSuccess(obj)

    expect(result).toBe(true)
  })

  test('result does not exist', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    }

    const result = isJsonRpcSuccess(obj)

    expect(result).toBe(false)
  })
})

describe('isJsonRpcError', () => {
  describe('error exists', () => {
    test('valid error structure', () => {
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

    test('invalid error sturcture', () => {
      const obj = {
        jsonrpc: '2.0'
      , id: 'id'
      , error: {
          code: 0
        }
      }

      const result = isJsonRpcError(obj)

      expect(result).toBe(false)
    })
  })

  test('error does not exist', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    }

    const result = isJsonRpcError(obj)

    expect(result).toBe(false)
  })
})
