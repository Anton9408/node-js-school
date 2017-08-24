const mailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const domainNames = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];

const form = document.forms.form;
const resultContainer = document.getElementById('resultContainer');
const submitButton = document.getElementById('submitButton');

const validateEmail = email => mailRegExp.test(email);

const checkDomain = (email) => {
  const atSignPosition = email.lastIndexOf('@');

  for (let i = 0; i < domainNames.length; i += 1) {
    if (email.indexOf(domainNames[i], atSignPosition) === -1) {
      return true;
    }
  }

  return false;
};

const sumPhoneNumbers = phone => phone
  .replace(/\D+/g, '')
  .split('')
  .reduce((prev, cur) => prev + +cur, 0);

const getJSON = () => {
  fetch(form.action)
    .then(response => response.json())
    .then((response) => {
      switch (response.status) {
        case ('success'): {
          resultContainer.classList.add('success');
          resultContainer.innerText = 'Success';
          break;
        }

        case 'error': {
          resultContainer.classList.add('error');
          resultContainer.innerText = response.reason;
          break;
        }

        case 'progress': {
          resultContainer.classList.add('progress');
          setTimeout(getJSON, response.timeout);
          break;
        }

        default:
      }
    })
    .catch(alert);
};

const validate = () => {
  const errorFields = new Set();

  const fioElement = form.fio;
  const fio = fioElement.value;

  if (fio.split(' ').length !== 3) {
    fioElement.classList.add('error');
    errorFields.add('fio');
  } else if (fioElement.classList.contains('error')) {
    fioElement.classList.remove('error');
    errorFields.delete('fio');
  }

  const emailElement = form.email;
  const email = emailElement.value;

  if (!validateEmail(email) || !checkDomain(email)) {
    emailElement.classList.add('error');
    errorFields.add('email');
  } else if (emailElement.classList.contains('error')) {
    emailElement.classList.remove('error');
    errorFields.delete('email');
  }

  const phoneElement = form.phone;
  const phone = phoneElement.value;

  if (sumPhoneNumbers(phone) > 30 || phone.replace(/\D+/g, '').length < 11) {
    phoneElement.classList.add('error');
    errorFields.add('phone');
  } else if (phoneElement.classList.contains('error')) {
    phoneElement.classList.remove('error');
    errorFields.delete('phone');
  }

  return {
    isValid: !form.getElementsByClassName('error').length,
    errorFields: Array.from(errorFields),
  };
};

const onSubmitButtonClick = (event) => {
  event.preventDefault();

  const { isValid } = validate();

  if (isValid) {
    submitButton.disabled = true;
    getJSON();
  }
};

window.MyForm = {
  validate,
  getDate() {
    return {
      fio: form.fio.value,
      email: form.email.value,
      phone: form.phone.value,
    };
  },
  setDate({ fio, email, phone }) {
    if (fio) {
      form.fio.value = fio;
    }
    if (email) {
      form.email.value = email;
    }
    if (phone) {
      form.phone.value = phone;
    }
  },
  submit: onSubmitButtonClick,
};

submitButton.onclick = onSubmitButtonClick;

jQuery(($) => {
  $('#phone').mask('+7 (999) 999-99-99');
});

