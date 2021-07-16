import QLNDService from "./../services/qlndservice.js";
import QLND from "./../models/NguoiDung.js";
import Validation from "./../models/validation.js";
const validation = new Validation();
const service = new QLNDService();
const getEle = (id) => document.getElementById(id);
getEle("btnThemNguoiDung").addEventListener("click", () => {
  getEle("TaiKhoan").disabled = false;
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm Người Dùng";
  const footer = `<button class="btn btn-success" onclick="themNguoiDung()"> Thêm </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});
// const renderTable = (arr) => {
//   const contenHTML = arr.reduce((contenHTML, item) => {
//     return (contenHTML += `
//         <tr>
//             <td>${item}</td>
//             <td>${item.taiKhoan}</td>
//             <td>${item.matKhau}</td>
//             <td>${item.hoTen}</td>
//             <td>${item.email}</td>
//             <td>${item.ngonNgu}</td>
//             <td>${item.loaiND}</td>
//             <td>
//             <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${item.id})">Sửa</button>
//             <button class="btn btn-danger" onclick="xoaNguoiDung(${item.id})" >Xóa</button>
//             </td>
//         </tr>
//         `);
//   }, "");
//   getEle("tblDanhSachNguoiDung").innerHTML = contenHTML;
// };
const renderTable = (arr) => {
  var contentHTML = "";
  arr.forEach(function (item, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${
              item.id
            })">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNguoiDung(${
              item.id
            })" >Xóa</button>
            </td>
        </tr>
        `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
};
const list = [];
const layData = () => {
  service
    .callApi("QLND", "GET", null)
    .then((result) => {
      // console.log(result.data.filter((value) => value.loaiND === "GV"));
      renderTable(result.data);
      console.log(result.data);

      list.push(...result.data);

      console.log(list);
    })
    .catch((err) => {
      console.log(err);
    });
};
layData();
console.log(list);

// tới Thêm nào
const layThongTin = (isAdd) => {
  const taiKhoan = getEle("TaiKhoan").value;
  const hoTen = getEle("HoTen").value;
  const matKhau = getEle("MatKhau").value;
  const email = getEle("Email").value;
  const hinhAnh = getEle("HinhAnh").value;
  const loaiNguoiDung = getEle("loaiNguoiDung").value;
  const loaiNgonNgu = getEle("loaiNgonNgu").value;
  const moTa = getEle("MoTa").value;
  var kiemTra = true;
  if (isAdd) {
    kiemTra &=
      validation.kiemTraRong(taiKhoan, "divTaiKhoan", "(*) vui lòng nhập") &&
      validation.kiemTraTrungTaiKhoan(
        taiKhoan,
        "divTaiKhoan",
        "(*) Trùng",
        list
      );
  }

  kiemTra &=
    validation.kiemTraRong(hoTen, "divHoTen", "(*) vui lòng nhập") &&
    validation.kiemTraHoTen(
      hoTen,
      "divHoTen",
      "(*) vui lòng nhập chữ cái từ a-z"
    );
  kiemTra &=
    validation.kiemTraRong(matKhau, "divMatKhau", "(*) vui lòng nhập") &&
    validation.kiemTraPass(matKhau, "divMatKhau", "mật khẩu k an toàn") &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "divMatKhau",
      "(*)vui lòng nhập 6-8 số ",
      6,
      8
    );
  kiemTra &=
    validation.kiemTraRong(email, "divEmail", "(*) vui lòng nhập") &&
    validation.kiemTraEmail(email, "divEmail", "Email k hợp lệ");
  kiemTra &= validation.kiemTraRong(hinhAnh, "divHinhAnh", "(*) vui lòng nhập");
  kiemTra &= validation.kiemTraOption(
    "loaiNguoiDung",
    "divLoaiNguoiDung",
    "(*) vui lòng nhập"
  );
  kiemTra &= validation.kiemTraOption(
    "loaiNgonNgu",
    "divoaiNgonNgu",
    "(*) vui lòng nhập"
  );
  kiemTra &=
    validation.kiemTraRong(moTa, "divMoTa", "(*) vui lòng nhập") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "divMoTa",
      "(*)vui lòng nhập dưới 60 ký tự ",
      1,
      60
    );
  if (kiemTra) {
    const qlnd = new QLND(
      "",
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiNguoiDung,
      loaiNgonNgu,
      moTa,
      hinhAnh
    );
    return qlnd;
  }
  return null;
};
const themNguoiDung = () => {
  const qlnd = layThongTin(true);
  if (!qlnd) return;
  service
    .callApi("QLND", "Post", qlnd)
    .then(() => {
      layData();
      document.getElementsByClassName("close")[0].click();
      alert("add thành công");
    })
    .catch((err) => {
      console.log(err);
    });
};
window.themNguoiDung = themNguoiDung;

const xoaNguoiDung = (id) => {
  service
    .callApi(`QLND/${id}`, "DELETE", null)
    .then(() => {
      layData();
      alert("xóa thành công");
    })
    .catch((err) => {
      console.log(err);
    });
};
window.xoaNguoiDung = xoaNguoiDung;

const suaNguoiDung = (id) => {
  getEle("TaiKhoan").disabled = true;
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập Nhật TT người dùng";
  const footer = `<button class="btn btn-success" onclick="capNhatNguoiDung(${id})">Cập Nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  service.callApi(`QLND/${id}`, "GET", null).then((result) => {
    getEle("TaiKhoan").value = result.data.taiKhoan;
    getEle("HoTen").value = result.data.hoTen;
    getEle("MatKhau").value = result.data.matKhau;
    getEle("Email").value = result.data.email;
    getEle("HinhAnh").value = result.data.hinhAnh;
    getEle("loaiNguoiDung").value = result.data.loaiND;
    getEle("loaiNgonNgu").value = result.data.ngonNgu;
    getEle("MoTa").value = result.data.moTa;
  });
};
window.suaNguoiDung = suaNguoiDung;

// cập nhật
const capNhatNguoiDung = (id) => {
  const qlnd = layThongTin(false);
  if (qlnd) {
    service
      .callApi(`QLND/${id}`, "PUT", qlnd)
      .then(() => {
        layData();
        document.getElementsByClassName("close")[0].click();
        alert("thay đổi thành công");
      })
      .catch((err) => {
        console.log(err);
        alert("fail");
      });
  }
};
window.capNhatNguoiDung = capNhatNguoiDung;
