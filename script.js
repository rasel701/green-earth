const catagoriesDiv = document.querySelector(".catagories");
const treeInfoContainer = document.querySelector(".tree-info-container");
const catagoriesLink = "https://openapi.programming-hero.com/api/categories";
const allTreesLink = "https://openapi.programming-hero.com/api/plants";
const categoriPerLink = "https://openapi.programming-hero.com/api/category/";
const oneTreeLink = "https://openapi.programming-hero.com/api/plant/";

const returnAllurl = async (url, id) => {
  if (url && id) {
    const urlLink = await fetch(`${url}${id}`);
    const res = await urlLink.json();
    return res;
  }
  const urlLink = await fetch(url);
  const res = await urlLink.json();
  return res;
};

// catagoryes button show ***************
const showCatagoryes = async () => {
  const categoriesData = await returnAllurl(catagoriesLink);
  const categories = categoriesData.categories;
  categories.forEach((catagorie) => {
    const button = document.createElement("button");
    button.classList.add(
      "hover:bg-sky-300",
      "p-2",
      "rounded-md",
      "cursor-pointer",
      "categoriBtn"
    );
    button.dataset.id = `${catagorie.id}`;
    button.innerText = `${catagorie.category_name}`;
    catagoriesDiv.append(button);
  });
};

showCatagoryes();

const showAllTree = async (allTreesLink, id) => {
  const allTrees = await returnAllurl(allTreesLink, id);
  const allTree = allTrees.plants;
  treeInfoContainer.innerHTML = "";

  for (const tree of allTree) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <div class="card bg-base-100 max-w-[350px] h-auto shadow-lg p-3 ">
      <img class="h-[250px] w-full rounded-sm"
        src="${tree.image}"
        alt="Shoes" />
      <h2 class="mt-5"><span id="${
        tree.id
      }" class="treeName  text-2xl  inline">${tree.name}</span></h2>
      <p class="mt-4 line-clamp-3 ">${tree.description}</p>
      <div class="card-actions justify-between items-center mt-5">
          <button class=" p-2 rounded-xl bg-slate-300 text-[#15803d] font-bold text-[14px]">${
            tree.category
          }</button>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${
            tree.price
          }</span></p>
        </div>
        <button  class="bg-[#15803D] w-full p-2 mt-7 rounded-lg cursor-pointer addBtn"  data-info='${JSON.stringify(
          tree
        )}'>Add to Cart</button>

  </div>
      `;
    treeInfoContainer.append(newDiv);
  }
};

showAllTree(allTreesLink);

catagoriesDiv.addEventListener("click", async (e) => {
  if (!e.target.closest(".categoriBtn")) return;
  const targetBtn = e.target.closest(".categoriBtn");
  categoriClickEvent(targetBtn);
  if (e.target.id === "allTreeBtn") {
    await showAllTree(allTreesLink);
    return;
  }
  const catagoriId = e.target.dataset.id;
  const res = await showAllTree(categoriPerLink, catagoriId);
});

const categoriClickEvent = (eventBtn) => {
  const button = document.querySelectorAll(".categoriBtn");

  button.forEach((btn) => {
    btn.classList.remove("bg-[#15803d]");
    btn.classList.add("hover:bg-sky-300");
  });

  eventBtn.classList.add("bg-[#15803d]");
  eventBtn.classList.remove("hover:bg-sky-300");
};

const addToCartArray = [];

treeInfoContainer.addEventListener("click", async (e) => {
  if (e.target.closest(".treeName")) {
    const targetId = e.target.id;
    const res = await returnAllurl(oneTreeLink, targetId);
    showModalContainer(res.plants);
  }
  if (e.target.closest(".addBtn")) {
    const btn = e.target.closest(".addBtn");
    if (btn) {
      const info = JSON.parse(btn.dataset.info);
      addToCartArray.push(info);
      showAddToCard();
    }
  }
});

const addCardContainer = document.querySelector(".add-cart-container");
const priceTag = document.querySelector(".priceTag");
const showAddToCard = () => {
  addCardContainer.innerHTML = "";
  priceTag.innerHTML = "";
  let sum = 0;

  addToCartArray.forEach((ele) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-4",
      "bg-[#CFF0DC]",
      "m-2",
      "rounted-md"
    );
    newDiv.innerHTML = `
      <div>
      <h2>${ele.name}</h2>
       <div class="flex gap-2">$<p>${ele.price}</p></div>
    </div>
    <i class="fa-solid fa-xmark"></i>
    `;
    sum += ele.price;
    addCardContainer.append(newDiv);

    priceTag.innerHTML = `
     <h4>Total:</h4>
     <p><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class="total">${sum}</span></p>
    `;
  });
};

addCardContainer.addEventListener("click", (e) => {
  if (!e.target.closest(".fa-xmark")) return;
  const parentDiv = e.target.parentElement;
  const price = parseInt(parentDiv.querySelector("p").innerHTML);
  const totaldiv = document.querySelector(".total");
  let total = parseInt(totaldiv.innerHTML);
  console.log(total);

  const x = (totaldiv.innerHTML = `${total - price}`);
  if (x <= 0) {
    priceTag.innerHTML = "";
    addToCartArray.length = 0;
  }
  parentDiv.remove();
});

const showModalContainer = (oneTree) => {
  const my_modal_5 = document.querySelector("#my_modal_5");
  const modalContainers = document.querySelector("#modal-containers");
  modalContainers.innerHTML = `
 <h2 class="text-lg font-bold">${oneTree.name}</h2>
<img class="h-[250px] w-full rounded-md"  src="${oneTree.image}" alt="">
<h3><span class="font-bold">Category</span>: ${oneTree.category}</h3>
<p><span class="font-bold">Price</span>: $${oneTree.price}</p>
 <p><span class="font-bold">description</span>: ${oneTree.description}</p>
 
 `;
  my_modal_5.showModal();
};
