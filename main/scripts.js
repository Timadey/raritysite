// Define an array of collections
const collections = [
    { name: "Seimen", supply: 4444, image: "975.png", link: "seimen.html" },
    { name: "Council", supply: 3000, image: "c.png", link: "council.html" },
    { name: "Pepe", supply: 1000, image: "pepe.png", link: "pepe.html" },
    { name: "SuperTusk", supply: 10000, image: "supertusk.png", link: "supertusk.html" },
    { name: "Seimmortals", supply: 1234, image: "mortal.png", link: "mortal.html" },
    { name: "fluffy", supply: 5555, image: "fluffy.png", link: "fluffy.html" },
    { name: "Pepeiyans", supply: 3333, image: "pepeiyans.png", link: "pepeiyans.html" },
    { name: "Zenko", supply: 5555, image: "zenko.jpg", link: "zenko.html" },
    { name: "Grapes", supply: 5000, image: "grapes.png", link: "grapes.html" },
    { name: "Sirens", supply: 3333, image: "sirens.jpg", link: "sirens.html" },



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
