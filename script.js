const catagoriesDiv = document.querySelector(".catagories");
const treeInfoContainer = document.querySelector(".tree-info-container");
const catagoriesLink = "https://openapi.programming-hero.com/api/categories";
const allTreesLink = "https://openapi.programming-hero.com/api/plants";
const categoriPerLink = "https://openapi.programming-hero.com/api/category/";

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
  console.log(allTree);
  treeInfoContainer.innerHTML = "";

  for (const tree of allTree) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <div class="card bg-base-100 max-w-[350px] h-auto shadow-lg p-3 ">
      <img class="h-[250px] w-full rounded-sm"
        src="${tree.image}"
        alt="Shoes" />
      <h2 class="card-title text-2xl mt-3">${tree.name}</h2>
      <p class="mt-1 line-clamp-3">${tree.description}</p>
      <div class="card-actions justify-between items-center mt-3">
          <button class=" p-2 rounded-xl bg-slate-300 text-[#15803d] font-bold text-[14px]">${tree.category}</button>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>5000</span></p>
        </div>
        <button class="bg-[#15803D] w-full p-2 mt-3 rounded-lg cursor-pointer">Add to Cart</button>

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

  const catagoriId = e.target.dataset.id;
  const res = await showAllTree(categoriPerLink, catagoriId);
});

const categoriClickEvent = (eventBtn) => {
  const button = document.querySelectorAll(".categoriBtn");

  button.forEach((btn) => {
    btn.classList.remove("bg-red-700");
    btn.classList.add("hover:bg-sky-300");
  });

  eventBtn.classList.add("bg-red-700");
  eventBtn.classList.remove("hover:bg-sky-300");
};
