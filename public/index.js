import abi from "./abi.js"

document.addEventListener("DOMContentLoaded", () => {
  const web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/aa3APiqhaj-pQSr2rKbN10MX6zbtK9D7")
  //const web3 = new Web3("http://localhost:8545/")
  web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Block is ", result);
  });

  document.getElementById("load_button").addEventListener("click", async () => {
    const walletAddress = document.getElementById("wallet_address").value
    const contract = new web3.eth.Contract(abi, walletAddress)
    contract.defaultAccount = walletAddress

    document.getElementById("nfts").innerHTML = ""

    let count = 24 /* await contract.methods.totalSupply().call(); */
    console.log("totalSupply is: ", count);
    for (let i = 1; i <= count; i++) {
      let tokenMetadataURI = await contract.methods.tokenURI(i).call();
      console.log("tokenURI is: ", tokenMetadataURI);

      if (tokenMetadataURI.startsWith("ipfs://")) {
        tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
      }
      const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())

      const tokenElement = document.getElementById("nft_template").content.cloneNode(true)
      /* tokenElement.querySelector("h1").innerText = tokenMetadata["name"] */

      const elem = tokenMetadata["image"]
      if (elem.startsWith("ipfs://")) {
        tokenElement.querySelector("img").src = `https://ipfs.io/ipfs/${elem.split("ipfs://")[1]}`
        /* tokenElement.querySelector("a").href = tokenMetadata["external_link"] */
        tokenElement.querySelector("a").href = 
        `https://testnet.rarible.com/token/${walletAddress}:${i}?tab=overview`
      } 
      if (elem.startsWith("https://")) {
        tokenElement.querySelector("img").src = elem
        tokenElement.querySelector("a").href = 
        `https://testnet.rarible.com/token/${walletAddress}:${i}?tab=overview`
      }
      tokenElement.querySelector("img").alt = tokenMetadata["description"]
      /* tokenElement.querySelector("h2").innerText = tokenMetadata["description"] */

      document.getElementById("nfts").append(tokenElement)
    }
  })
})
