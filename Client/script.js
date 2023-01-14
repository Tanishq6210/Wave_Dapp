const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "newWave",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_msg",
          "type": "string"
        }
      ],
      "name": "insertWave",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalWaves",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllWaves",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "msg",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "add",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            }
          ],
          "internalType": "struct wave.Wave[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

const contractAddress = "0x8ce05118Be37af7cDBAE888E65B43889d55c2dbc";

const web3 = new Web3(window.ethereum);
var contract = new web3.eth.Contract(abi, contractAddress)

function connect() {
    const accounts = ethereum.request({
        method: 'eth_requestAccounts',
      });
    if (accounts.length == 0) console.log("User is not logged in to MetaMask");
    else {
        console.log("User is logged in to MetaMask");
        document.getElementById("connect").style.visibility = "none";
    }
}

function onWave() {
    var msg = document.getElementById("msg").value;
    contract.methods.insertWave(msg)
    .send({
        from: "0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7",
    })
    .then((result) => {
        console.log(result);
    })
}

function getAllWaves() {
    contract.methods.getAllWaves().call()
    .then((result) => {
        console.log(result);
        addTable(result)
    })
}

function addTable(result) {
    var myTableDiv = document.getElementById("myDynamicTable");
  
    var table = document.getElementById("table");
    table.border = '1';
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    // var tr = document.createElement('TR');
    // var td = document.createElement('TH');
    // td.width = '75';
    // td.appendChild(document.createTextNode("Message"));
    // tr.appendChild(td);
    // td.appendChild(document.createTextNode("From"));
    // tr.appendChild(td);
    // td.appendChild(document.createTextNode("Timestamp"));
    // tr.appendChild(td);
    // tableBody.appendChild(tr);

    for (var i = 0; i < result.length; i++) {
      var tr = document.createElement('TR');
  
      for (var j = 0; j < 3; j++) {
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode(result[i][j]));
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    }
    myTableDiv.appendChild(table);
  }