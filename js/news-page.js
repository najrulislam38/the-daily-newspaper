const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const tabContainer = document.getElementById("tab-container");
  const allData = data.data.news_category;
  allData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <a onclick="loadNews('${category.category_id}')" class="tab text-lg font-bold text-black active:text-red-500 relative before hover:text-gray-700 ">${category.category_name}</a> 
            `;
    tabContainer.appendChild(div);
  });

  // console.log(data.data.news_category);
};

const loadNews = async (categoryId) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  const newsData = data.data;
  console.log(data.data);
  const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

  newsData.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
            <img src="${news.image_url}" alt="" />
        </figure>
        <div class="card-body">
          <div class="flex items-start">
            <h2 class="card-title">${news.title.slice(0, 40)}</h2>
            <button class="mt-2 px-6 py-2 bg-pink-500 text-white rounded-[40px]">${news.rating.badge}</button>
          </div>
          <p>${news.details.slice(0, 50)}</p>
          <h3>Total view: 
           ${news.total_view? news.total_view: "No views"}
          </h3>
          <div class="card-footer flex justify-between my-8">
            <div class="flex gap-2">
                <div class=" w-14 rounded-full">
                    <img src="${news.author?.img}" class="rounded-full">
                </div>
                <div>
                <h4 class="font-bold">${news.author?.name}</h4>
                <p>${news.author?.published_date}</p>
                </div>
            </div>
            <div class="">
            <button  onclick="handleModal('${news?._id}')" class="btn btn-neutral text-white hover:opacity-80 focus:opacity-70">Details</button>
          </div>

          </div>
          
        </div>
      </div>
        `;
    cardContainer.appendChild(div);
  });
};


const handleModal = async(newsId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
  const json = await res.json();
  const data = json.data[0]

  console.log(json.data[0]);

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = "";
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal modal-bottom sm:modal-middle ">
      <form method="dialog" class="modal-box w-11/12 max-w-5xl lg:px-20">
        <div class="">
        <figure>
            <img src="${data.image_url}" alt=""  class="w-full"/>
        </figure>
        <div class="card-body">
          <div class="flex items-start justify-between">
            <h2 class="card-title">${data.title}</h2>
            <button class="mt-2 px-6 py-2 bg-pink-500 text-white rounded-[40px]">${data.rating?.badge}</button>
          </div>
          <p>${data.details.slice(0, 50)}</p>
          <h3>Total view: 
           ${data.total_view? data.total_view: "No views"}
          </h3>
          <div class="card-footer flex justify-between my-8">
            <div class="flex gap-2">
                <div class=" w-14 rounded-full">
                    <img src="${data.author?.img}" class="rounded-full">
                </div>
                <div>
                <h4 class="font-bold">${data.author?.name}</h4>
                <p>${data.author?.published_date}</p>
                </div>
            </div>
            <div class="modal-close">
              <!-- if there is a button, it will close the modal -->
              <button class="btn btn-accent">Close</button>
            </div>
          </div>
          
        </div>
      </div>
      </form>
    </dialog>
    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal_1');
    modal.showModal();
}


handleCategory();
loadNews('02');


