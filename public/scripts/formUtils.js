const resetForm = (selector) => {
  const form = document.querySelector(selector);
  form.reset()
};

const readFormData = (selector) => {
  const form = document.querySelector(selector);
  const formData = new FormData(form);
  const body = new URLSearchParams(formData);
  return body;
};
