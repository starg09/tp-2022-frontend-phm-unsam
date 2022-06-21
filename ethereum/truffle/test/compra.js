const Wallet = artifacts.require('./Wallet.sol')
const assert = require('assert')
const { testRejection } = require('./test-utils')

let walletSmartContract

contract('testeo de compras', async (accounts) => {
  const theAccount = accounts[1]
  const otherAccount = accounts[2]  
  
  beforeEach('initialized', async () => {
    walletSmartContract = await Wallet.new()
    walletSmartContract.put(theAccount, 1000)
    walletSmartContract.put(otherAccount, 1000)
  })

  it('al realizar una compra queda guardada', async () => {
    await walletSmartContract.comprar(theAccount, 250, ["merca", "falopa"])
    const cantidadCompras = await walletSmartContract.compraCount()
    assert.equal(cantidadCompras, 1)
  })

  it('no puedo realizar una compra si no me alcanza el cash', async () => {
    testRejection(async () => { await walletSmartContract.comprar(theAccount, 1001, ["merca", "falopa"]) }, 'Not enough cash, Stranger!')
  })

  it('no puede realizar una compra con importe 0', async () => {
    testRejection(async () => { await walletSmartContract.comprar(theAccount, 0, ["merca", "falopa"]) }, 'Value must be positive')
  })

  it('no puede realizar una compra con una lista vacia', async () => {
    testRejection(async () => { await walletSmartContract.comprar(theAccount, 250, []) }, 'La lista de productos no debe estar vacia.')
  })

  /*TODO: investigar como hacer para que este test se ejecute correctamente (el sender en promedio tiene que ser el mismo que hace tres compras)
  it('el promedio es calculado correctamente', async () => {
    await walletSmartContract.comprar(theAccount, 250, ["merca", "falopa"])
    await walletSmartContract.comprar(theAccount, 250, ["merca", "falopa"])
    await walletSmartContract.comprar(theAccount, 500, ["merca", "falopa"])
    await walletSmartContract.comprar(otherAccount, 500, ["merca", "falopa"])
    const promedio = await walletSmartContract.promedio()
    assert.equal(promedio, 333)
  })*/

  it('la consulta de una compra trae la compra correctamente', async () => {
    await walletSmartContract.comprar(theAccount, 500, ["merca", "falopa"])
    const compraRealizada = await walletSmartContract.consultarCompra(1)
    assert.equal(compraRealizada.comprador, theAccount)
    assert.equal(compraRealizada.id, 1)
    assert.equal(compraRealizada.valor, 500)
    //assert.equal(compraRealizada.productos, ["merca", "falopa"])
  })

  it('Solo puede agregar saldo el propio usuario', async () => {
    testRejection(async () => { await walletSmartContract.put(otherAccount, 100) }, 'Solo puede agregar plata el duenio')
  })

})