// Define an array of collections
const collections = [
    { name: "Seimen", supply: 4444, image: "975.png", link: "/seimen" },
    { name: "Grapes", supply: 5000, image: "grapes.png", link: "/grapes" },
    // { name: "Sei Ape", supply: 888, image: "ape.jpg", link: "/ape" },
    { name: "Council", supply: 888, image: "c.png", link: "/council" },
    { name: "Fluffy", supply: 5000, image: "fluffy.png", link: "/fluffy" },
    { name: "Monsei", supply: 2222, image: "monsei.gif", link: "/monsei" },
    { name: "Mortal", supply: 4000, image: "mortal.png", link: "/mortal" },
    { name: "Pepe", supply: 4444, image: "pepe.png", link: "/pepe" },
    { name: "Pepeiyans", supply: 4500, image: "pepeiyans.png", link: "/pepeiyans" },
    { name: "Sirens", supply: 3333, image: "sirens.jpg", link: "/sirens" },
    { name: "Supertusk", supply: 1000, image: "supertusk.png", link: "/supertusk" },

    // { name: "Whale", supply: 5000, image: "whale.png", link: "/whale" },
    // { name: "Dude", supply: 3333, image: "dude.png", link: "/dude" },
    // { name: "Oxydo", supply: 1000, image: "oxydo.png", link: "/oxydo" },
    // { name: "Simians", supply: 3333, image: "simians.png", link: "/simians" },

    

];

// Function to create NFT items dynamically
function createNFTItems() {
    const nftContainer = document.getElementById("nftContainer");
    collections.forEach(collection => {
        const nftItem = document.createElement("div");
        nftItem.classList.add("nft-item");

        // Create an anchor tag to wrap the image
        const link = document.createElement("a");
        link.href = collection.link;
        link.target = "_blank"; // Open link in a new tab

        // Create the image element for the logo
        const logo = document.createElement("img");
        logo.src = collection.image;
        logo.alt = collection.name;

        // Create elements for name and supply
        const name = document.createElement("h3");
        name.textContent = collection.name;
        const supply = document.createElement("p");
        supply.textContent = `Supply: ${collection.supply} NFTs`;

        // Append elements to the nftItem container
        link.appendChild(logo);
        nftItem.appendChild(link);
        nftItem.appendChild(name);
        nftItem.appendChild(supply);
        nftContainer.appendChild(nftItem);
    });
}

// Call the function to create NFT items
createNFTItems();
