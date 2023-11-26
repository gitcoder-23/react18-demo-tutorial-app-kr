export const ValidationRgx = (value, emFullDetails) => {
  const errMsg = {};
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  //const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if (!value.name.trim()) {
    errMsg.name = "Name is Require";
  } else if (value.name.length < 3) {
    errMsg.name = "Name must be 3 character";
  }
  if (!value.email.trim()) {
    errMsg.email = "Email is Require";
  } else if (!emailPattern.test(value.email)) {
    errMsg.email = "Email not correct";
  }
  if (!value.gender) {
    errMsg.gender = "Please select gender";
  } else if (!emailPattern.test(value.email)) {
    errMsg.email = "Email not correct";
  }
  if (!value.phone.trim()) {
    errMsg.phone = "Phone is Require";
  } else if (!phonePattern.test(value.phone)) {
    errMsg.phone = "Phone not correct";
  }
  if (value.technology.length === 0) {
    errMsg.technology = "Technology is Require";
  }
  if (!value.performance) {
    errMsg.performance = "Performance is Require";
  }
  if (!value.emDetails) {
    errMsg.emDetails = "Employee details is Require";
  }
  if (!emFullDetails) {
    errMsg.emFullDetails = "Employee full details is Require";
  }

  return errMsg;
};
