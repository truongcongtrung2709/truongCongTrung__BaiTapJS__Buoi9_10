function Staff(
  tknv,
  name,
  email,
  password,
  datepicker,
  luongCB,
  chucvu,
  gioLam
) {
  this.tknv = tknv;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.luongCB = luongCB;
  this.chucvu = chucvu;
  this.gioLam = gioLam;
}
Staff.prototype.tongLuong = function () {
  if (this.chucvu === "Giám Đốc") {
    return this.luongCB * 3;
  } else if (this.chucvu === "Trưởng Phòng") {
    return this.luongCB * 2;
  } else if (this.chucvu === "Nhân Viên") {
    return this.luongCB;
  }
};
Staff.prototype.xepLoai = function (rank) {
  if (this.gioLam >= 192) {
    return (rank.innerHTML = "Nhân viên Xuất Sắc");
  } else if (this.gioLam >= 176) {
    return (rank.innerHTML = "Nhân viên giỏi");
  } else if (this.gioLam >= 160) {
    return (rank.innerHTML = "khá");
  }
};
//*************************************************************** */
let staffs = [];
function addStaff() {
  //DOM
  let tknv = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let datepicker = dom("#datepicker").value;
  let luongCB = +dom("#luongCB").value;
  let chucvu = dom("#chucvu").value;
  let gioLam = +dom("#gioLam").value;

  let isValid = validateForm();
  if (!isValid) {
    return;
  }
  // tạo object
  let staff = new Staff(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  );
  console.log(staff);
  staffs.push(staff);
  display(staffs);
  resetForm();
}
function selectStaff(staffTK) {
  let staff = staffs.find((staff) => {
    return staff.tknv === staffTK;
  });
  if (!staff) {
    return;
  }

  dom("#tknv").value = staff.tknv;
  dom("#name").value = staff.name;
  dom("#email").value = staff.email;
  dom("#password").value = staff.password;
  dom("#datepicker").value = staff.datepicker;
  dom("#luongCB").value = staff.luongCB;
  dom("#chucvu").value = staff.chucvu;
  dom("#gioLam").value = staff.gioLam;

  dom("#tknv").disabled = true;
  dom("#btnThemNV").disabled = true;
}
function updateStaff() {
  let tknv = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let datepicker = dom("#datepicker").value;
  let luongCB = dom("#luongCB").value;
  let chucvu = dom("#chucvu").value;
  let giolam = dom("#gioLam").value;

  let staff = new Staff(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    giolam
  );

  let index = staffs.findIndex((item) => item.id === staff.id);
  staffs[index] = staff;

  display(staffs);
  resetForm();
}
function deleteStaff(staffTK) {
  staffs = staffs.filter((staff) => {
    return staff.tknv !== staffTK;
  });
  display(staffs);
}

//=========================================================
function dom(selector) {
  return document.querySelector(selector);
}
function display(staffs) {
  let html = staffs.reduce((result, staff) => {
    let chucvu = "";
    if (staff.chucvu === "1") {
      staff.chucvu = "Giám Đốc";
    } else if (staff.chucvu === "2") {
      staff.chucvu = "Trưởng Phòng";
    } else if (staff.chucvu === "3") {
      staff.chucvu = "Nhân Viên";
    }
    console.log(chucvu);

    return (
      result +
      `
      <tr>
      <td>${staff.tknv}</td>
      <td>${staff.name}</td>
      <td>${staff.email}</td>
      <td>${staff.datepicker}</td>
      <td>${staff.chucvu}</td>
      <td>${staff.tongLuong()}</td>
      <td>${staff.xepLoai()}</td>
      <td>
    <button class="btn btn-success" onclick="selectStaff('${
      staff.tknv
    }')">Edit</button>
    </button>
    </td>
    <td>
    <button class="btn btn-danger" onclick="deleteStaff('${
      staff.tknv
    }')">Delete</button>
    </button>
    </td>
      </tr>
      `
    );
  }, "");
  dom("#tableDanhSach").innerHTML = html;
}
function resetForm() {
  dom("#tknv").value = "";
  dom("#name").value = "";
  dom("#email").value = "";
  dom("#password").value = "";
  dom("#datepicker").value = "";
  dom("#luongCB").value = "";
  dom("#chucvu").value = "";
  dom("#gioLam").value = "";
}
//============================Validation========================================
function validateTK() {
  let tknv = dom("#tknv").value;
  let spanEl = dom("#tbTKNV");
  spanEl.style.display = "block";

  if (!tknv) {
    spanEl.innerHTML = "Tài khoản không được để trống ";
    return false;
  } else if (tknv.length < 4 || tknv.length > 6) {
    spanEl.innerHTML = "Tài khoản phải tối đa 4-6 ký tự";
    return false;
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function isNumber(val) {
  return !isNaN(parseFloat(val)) && !isNaN(val - 0);
}
function validateName() {
  let name = dom("#name").value;
  let spanEl = dom("#tbTen");
  spanEl.style.display = "block";
  if (!name) {
    spanEl.innerHTML = "Tên không được để trống ";
    return false;
  } else if (isNumber(name)) {
    spanEl.innerHTML = "Tên Nhân viên phải là chữ";
    return false;
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validateEmail() {
  let email = dom("#email").value;
  let spanEl = dom("#tbEmail");
  spanEl.style.display = "block";
  if (!email) {
    spanEl.innerHTML = "Email không được để trống ";
    return false;
  }
  let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    spanEl.innerHTML = "Email không đúng định dạng";
    return false;
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validatePassword() {
  let password = dom("#password").value;
  let spanEl = dom("#tbMatKhau");
  spanEl.style.display = "block";
  if (!password) {
    spanEl.innerHTML = "Password không được để trống ";
    return false;
  }
  let regex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{6,10}$/;
  if (!regex.test(password)) {
    spanEl.innerHTML =
      "Password phải từ 6-10 ký tự( chứa 1 số, 1 chữ hoa và 1 ký tự đặc biệt) ";
    return false;
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validateDatePicker() {
  let datepicker = dom("#datepicker").value;
  let spanEl = dom("#tbNgay");
  spanEl.style.display = "block";
  if (!datepicker) {
    spanEl.innerHTML = "Ngày làm không được để trống";
    return false;
  }
  let regrex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!regrex.test(datepicker)) {
    spanEl.innerHTML = "Ngày Tháng Năm không hợp lệ";
    return false;
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validateLuongCB() {
  let luongCB = dom("#luongCB").value;
  let spanEl = dom("#tbLuongCB");
  spanEl.style.display = "block";
  if (!luongCB) {
    spanEl.innerHTML = "Lương Cơ Bản không được để trống";
  } else if (luongCB < 1e6 || luongCB > 2e7) {
    spanEl.innerHTML =
      "Lương cơ bản không được thấp hơn 1 triệu và lớn hơn 20 triệu";
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validateChucVu() {
  let chucVu = dom("#chucvu").value;
  let spanEl = dom("#tbChucVu");
  spanEl.style.display = "block";
  if (chucVu === "0") {
    spanEl.innerHTML = "Vui Lòng chọn chức vụ";
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validateGioLam() {
  let gioLam = dom("#gioLam").value;
  let spanEl = dom("#tbGiolam");
  spanEl.style.display = "block";
  if (!gioLam) {
    spanEl.innerHTML = "Giờ làm không được để trống";
    return false;
  } else if (gioLam < 80 || gioLam > 200) {
    spanEl.innerHTML = "Giờ làm không được nhỏ hơn 80 hoặc 200 giờ một tháng";
    return false;
  } else {
    spanEl.innerHTML = "";
    return true;
  }
}
function validateForm() {
  let isValid = true;
  isValid =
    validateTK() &
    validateName() &
    validateEmail() &
    validatePassword() &
    validateDatePicker() &
    validateLuongCB() &
    validateChucVu() &
    validateGioLam();
  if (!isValid) {
    alert("Form không hợp lệ");
    return false;
  }
  return true;
}
//- chưa làm được:
//  + câu 6
// + câu 8
// + câu 9
