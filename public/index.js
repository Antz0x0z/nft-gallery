import GameOfTheMindABI from "./GameOfTheMind.js"
import CONTRACT_ADDRESS from "./config.js"

document.addEventListener("DOMContentLoaded", () => {
  const web3 = new Web3("https://cemchain.com/")
  web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ",result);
  });

  document.getElementById("load_button").addEventListener("click", async () => {
    const contract = new web3.eth.Contract(GameOfTheMindABI, CONTRACT_ADDRESS)
    const walletAddress = document.getElementById("wallet_address").value
    contract.defaultAccount = walletAddress
    
    document.getElementById("nfts").innerHTML = ""

    for(let i = 1; i < 20; i++) {
      let tokenMetadataURI = await contract.methods.uri(i).call()

      if (tokenMetadataURI.startsWith("ipfs://")) {
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

      document.getElementById("nfts").append(tokenElement)
    }
  })
})
