const Wallet = artifacts.require('./Wallet.sol')
const assert = require('assert')
const { testRejection } = require('./test-utils')

let walletSmartContract

contract('Testeo de estados', async (accounts) => {
  const theAccount = accounts[1]
  
  beforeEach('initialized', async () => {
    walletSmartContract = await Wallet.new()
    await walletSmartContract.put(theAccount, 100)
  })

  it('cambiar el estado a activo', async () => {
    await walletSmartContract.setEstado(1)
    await walletSmartContract.setEstado(0)
    const estadoActual = await walletSmartContract.estado.call()
    assert.equal(estadoActual, 0)
  })

  it('cambiar el estado a lectura', async () => {
    await walletSmartContract.setEstado(1)
    const estadoActual = await walletSmartContract.estado.call()
    assert.equal(estadoActual, 1)
  })

  it('cambiar el estado a bootstrap', async () => {
    await walletSmartContract.setEstado(2)
    const estadoActual = await walletSmartContract.estado.call()
    assert.equal(estadoActual, 2)
  })

  it('no puedo hacer una compra si el estado es lectura', async () => {
    await walletSmartContract.setEstado(1)
    testRejection(async () => { await walletSmartContract.comprar(theAccount, 50, ["merca", "falopa"]) }, 'El estado debe ser el apropiado.')
  })

  it('puedo hacer una compra si el estado es bootstrap', async () => {
    await walletSmartContract.setEstado(2)
    await walletSmartContract.comprar(theAccount, 50, ["merca", "falopa"])
    const cantidadCompras = await walletSmartContract.compraCount.call()
    assert.equal(cantidadCompras, 1)
  })

  it('puedo leer el balance si el estado es lectura', async () => {
    await walletSmartContract.setEstado(1)
    const balance = await walletSmartContract.balance(theAccount)
    assert.equal(balance, 100)
  })

  it('no puedo leer el balance si el estado es bootstrap', async () => {
    await walletSmartContract.setEstado(2)
    testRejection(async () => { await walletSmartContract.balance(theAccount) }, 'El estado debe ser el apropiado.')
  })

})