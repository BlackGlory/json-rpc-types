import { describe, test, expect } from 'vitest'
import { isJsonRpcNotification, isJsonRpcRequest, isJsonRpcSuccess, isJsonRpcError } from '@src/json-rpc-types.js'

describe('isJsonRpcNotification', () => {
  test('true', () => {
    const obj = {
      jsonrpc: '2.0'
    , method: 'method'
    , params: [new Date().getTime()]
    }

    const result = isJsonRpcNotification(obj)

    expect(result).toBe(true)
  })

  test('false', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , method: 'method'
    , params: [new Date()]
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
    , params: [new Date().getTime()]
    }

    const result = isJsonRpcRequest(obj)

    expect(result).toBe(true)
  })

  test('false', () => {
    const obj = {
      jsonrpc: '2.0'
    , method: 'method'
    , params: [new Date()]
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
  test('true', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , result: null
    }

    const result = isJsonRpcSuccess(obj)

    expect(result).toBe(true)
  })

  test('false', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , result: undefined
    }

    const result = isJsonRpcSuccess(obj)

    expect(result).toBe(false)
  })
})

describe('isJsonRpcError', () => {
  test('true', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , error: {
        code: 0
      , message: 'message'
      , data: new Date().getTime()
      }
    }

    const result = isJsonRpcError(obj)

    expect(result).toBe(true)
  })

  test('false', () => {
    const obj = {
      jsonrpc: '2.0'
    , id: 'id'
    , error: {
        code: 0
      , message: 'message'
      , data: new Date()
      }
    }

    const result = isJsonRpcError(obj)

    expect(result).toBe(false)
  })
})
