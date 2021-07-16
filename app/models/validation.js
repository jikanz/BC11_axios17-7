const getEle = (id) => document.getElementById(id);
export default function Validation() {
  this.kiemTraRong = function (input, divId, mess) {
    if (input === "") {
      //thông báo
      getEle(divId).innerHTML = mess;
      return false;
    }
    getEle(divId).innerHTML = "";
    return true;
  };
  this.kiemTraDoDaiKyTu = function (input, divId, mess, min, max) {
    if (input.length >= min && input.length <= max) {
      // đúng
      getEle(divId).innerHTML = "";
      return true;
    } else {
      getEle(divId).innerHTML = mess;
    }
  };
  this.kiemTraHoTen = function (input, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (input.match(letter)) {
      //đúng
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    return false;
  };
  this.kiemTraEmail = function (input, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(letter)) {
      //đúng
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    return false;
  };
  this.kiemTraPass = function (input, divId, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (input.match(letter)) {
      //đúng
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    return false;
  };
  this.kiemTraOption = function (idSelect, divId, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    return false;
  };
  this.kiemTraTrungTaiKhoan = function (input, divId, mess, list) {
    var status = true;
    for (var i = 0; i < list.length; i++) {
      if (list[i].taiKhoan === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(divId).innerHTML = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    return false;
  };
}
