import GameOfTheMindABI from "./GameOfTheMind.js"

document.addEventListener("DOMContentLoaded", () => {
  const web3 = new Web3("https://cemchain.com/")
  web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
  });

  document.getElementById("load_button").addEventListener("click", async () => {
    //const walletAddress = document.getElementById("wallet_address").value
    const walletAddress = document.getElementById("wallet_address").value
    const contract = new web3.eth.Contract(GameOfTheMindABI, walletAddress)
    contract.defaultAccount = walletAddress

    document.getElementById("nfts").innerHTML = ""

    if (walletAddress == "0xb826256e6a6ffdd79aa6a7707a0a916f8ce41950") {
      for (let i = 1; i < 4; i++) {  //0xb826256e6a6ffdd79aa6a7707a0a916f8ce41950 (Gandalf)
        let tokenMetadataURI = await contract.methods.uri(i).call()
        let repl = tokenMetadataURI.replace('{id}', i) // (rand images)

        if (repl.startsWith("ipfs://")) { // (rand images)
          repl = `https://ipfs.io/ipfs/${repl.split("ipfs://")[1]}`
        }
        const tokenMetadata = await fetch(repl).then((response) => response.json())

        const tokenElement = document.getElementById("nft_template").content.cloneNode(true)
        tokenElement.querySelector("h1").innerText = tokenMetadata["name"]

        const elem = tokenMetadata["image"]
        if (elem.startsWith("ipfs://")) {
          tokenElement.querySelector("img").src = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
          tokenElement.querySelector("a").href = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
        }
        tokenElement.querySelector("img").alt = tokenMetadata["description"]
        tokenElement.querySelector("h2").innerText = tokenMetadata["description"]

        document.getElementById("nfts").append(tokenElement)
      }
    }

    if (walletAddress == "0x992A2B4C10f5d607c68e686Cd46aA7cdD018fa8E") {
      for (let i = 100; i < 160; i++) {  //0x992A2B4C10f5d607c68e686Cd46aA7cdD018fa8E (rand images)
        let tokenMetadataURI = await contract.methods.uri(i).call()
        let repl = tokenMetadataURI.replace('{id}', i) // (rand images)

        if (repl.startsWith("ipfs://")) { // (rand images)
          repl = `https://ipfs.io/ipfs/${repl.split("ipfs://")[1]}`
        }
        const tokenMetadata = await fetch(repl).then((response) => response.json())

        const tokenElement = document.getElementById("nft_template").content.cloneNode(true)
        tokenElement.querySelector("h1").innerText = tokenMetadata["name"]

        const elem = tokenMetadata["image"]
        if (elem.startsWith("ipfs://")) {
          tokenElement.querySelector("img").src = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
          tokenElement.querySelector("a").href = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
        }
        tokenElement.querySelector("img").alt = tokenMetadata["description"]
        tokenElement.querySelector("h2").innerText = "(＠´ー`)ﾉﾞ＼(＾▽＾)／"

        document.getElementById("nfts").append(tokenElement)
      }
    }

    if (walletAddress == "0x790e36496c3bb299BA849253b6e930F546451699") {
      for (let i = 1; i < 20; i++) {     //0x790e36496c3bb299BA849253b6e930F546451699 (BAYC)
        let tokenMetadataURI = await contract.methods.uri(i).call()

        if (tokenMetadataURI.startsWith("ipfs://")) { // (BAYC)
          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
        }
        const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())

        const tokenElement = document.getElementById("nft_template").content.cloneNode(true)
        tokenElement.querySelector("h1").innerText = tokenMetadata["name"]

        const elem = tokenMetadata["image"]
        if (elem.startsWith("ipfs://")) {
          tokenElement.querySelector("img").src = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
          tokenElement.querySelector("a").href = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
        }
        tokenElement.querySelector("img").alt = tokenMetadata["description"]
        tokenElement.querySelector("h2").innerText = tokenMetadata["description"]

        document.getElementById("nfts").append(tokenElement)
      }
    }
  })
})
