import throttle from 'lodash.throttle';

const FEEDBACK_FORM = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

getFillInputs();

form.addEventListener('input', throttle(onDataInput, 500, { trailing: false }));
form.addEventListener('submit', onFormSubmit);

function onDataInput(e) {
  const {
    elements: { email, message },
  } = e.currentTarget;

  let formData = { email: email.value, message: message.value };
  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem(FEEDBACK_FORM, formDataJSON);
}

function onFormSubmit(ev) {
  ev.preventDefault();
  const {
    elements: { email, message },
  } = ev.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please  fill the form');
  }
  console.log(JSON.parse(localStorage.getItem(FEEDBACK_FORM)));
  ev.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_FORM);
}

function getFillInputs() {
  const savedMessage = localStorage.getItem(FEEDBACK_FORM);

  if (savedMessage) {
    const formData = JSON.parse(savedMessage);
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
}
