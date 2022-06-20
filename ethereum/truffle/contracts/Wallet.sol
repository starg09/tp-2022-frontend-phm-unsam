pragma solidity >=0.7.0 <0.9.0;

//SPDX-License-Identifier: MIT
//pragma solidity ^0.5.1;
//pragma experimental ABIEncoderV2;

contract Wallet {

    enum Estado {
        Activo,
        Lectura,
        Bootstrap
    }

    Estado public estado;
    // mapa
    //   clave => una dirección de Ethereum que representa una persona física
    //   valor => $$$ que tiene
    mapping(address => int256) public wallet;

    mapping(uint => Compra) public compras;

    struct Compra {
        uint id;
        address comprador;
        int256 valor;
        string[] productos;
    }

    address duenio;

    uint256 public compraCount = 0;

    // validación general para poner o sacar
    modifier positive(int256 value) {
        require(value > 0, "Value must be positive");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == duenio);
        _;
    }

    constructor() {
        duenio = msg.sender;
    }

    function comprar(address _comprador, int256 _valor, string[] memory _productos) public estadosPermitidos([Estado.Activo, Estado.Bootstrap]) {
        withdraw(_comprador, _valor);

        compras[++compraCount] = Compra(compraCount, _comprador, _valor, _productos);
        
    }

    // poner plata en la billetera
    function put(address owner, int256 howMuch) public positive(howMuch) estadosPermitidos([Estado.Activo, Estado.Activo]) onlyOwner {
        int256 money = wallet[owner]; // por defecto es 0
        money = money + howMuch;
        wallet[owner] = money;
    }

    // sacar plata de la billetera
    function withdraw(address owner, int256 howMuch) public positive(howMuch) {
        int256 money = wallet[owner]; // por defecto es 0
        require(money >= howMuch, "Not enough cash, Stranger!");
        money = money - howMuch;
        wallet[owner] = money;
    }

    function balance(address owner) public estadosPermitidos([Estado.Activo, Estado.Lectura]) view returns (int256)  {
        return wallet[owner];
    }

    function setEstado(Estado _estado) public {
        estado = _estado;
    }   

    function consultarCompra(uint _id) public estadosPermitidos([Estado.Activo, Estado.Lectura]) view returns (Compra memory) {
        return compras[_id];
    }

    function promedio(address owner) public estadosPermitidos([Estado.Activo, Estado.Lectura]) view returns (int256) {
        int256 acumulador;
        int count;
        for(uint i = 1; i <= compraCount; i++) {
            if(owner == compras[i].comprador){
                count++;
                acumulador += compras[i].valor;
            }
        }
        return acumulador / count;
    }

    // FIXME: Buscar solucion alternativa (ver funcion put)
    modifier estadosPermitidos(Estado[2] memory _estados) {
        bool passed = false;
        for (uint i; i < _estados.length; i++) {
            if (_estados[i] == estado) {
                passed = true;
                break;
            }
        }
        require(passed);
        _;
    }


}