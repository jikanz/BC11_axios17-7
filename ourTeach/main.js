import QLNDService from "./../app/services/qlndservice.js";
const service = new QLNDService();
const getEle = (id) => document.getElementById(id);

const layData = () => {
  service
    .callApi("QLND", "GET", null)
    .then((result) => {
      renderHTML(result.data.filter((value) => value.loaiND === "GV"));
    })
    .catch((err) => {
      console.log(err);
    });
};
layData();
const renderHTML = (arr) => {
  var contentHTML = "";
  arr.forEach(function (item, index) {
    contentHTML += `
       <div class="col-12 col-md-6 col-lg-3 mb-3">
              <div class="card">
                <img src="./img/${item.hinhAnh}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-center">
                    <div>
                      <span>${item.ngonNgu}</span>
                      <h2>${item.hoTen}</h2>
                    </div>
                    <span
                      >${item.moTa}</span
                    >
                  </div>
                </div>
              </div>
            </div>
        `;
  });
  getEle("productsList").innerHTML = contentHTML;
};
