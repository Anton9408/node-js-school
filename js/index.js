const submitButton = document.getElementById('submitButton');

const mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const domainNames = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];

const validateEmail = email => mailRegExp.test(email);
const checkDomain = email => {
  const atSignPosition = email.lastIndexOf('@');

  for (let i = 0; i < domainNames.length; i++) {
    if (~email.indexOf(domainNames[i], atSignPosition)) {
      return true;
    }
  }

  return false;
};
const sumPhoneNumbers = phone => phone
  .replace(/\D+/g, '')
  .split('')
  .reduce((prev, cur) => prev + +cur, 0);

submitButton.onclick = function (event) {
  event.preventDefault();

  const form = document.forms.form;
  const fioElement = form.fio;
  const fio = fioElement.value.trim();

  if (fio.split(' ').length !== 3) {
    fioElement.classList.add('error');
  } else if (fioElement.classList.contains('error')) {
    fioElement.classList.remove('error');
  }

  const emailElement = form.email;
  const email = emailElement.value;

  if (!validateEmail(email) || !checkDomain(email)) {
    emailElement.classList.add('error');
  } else if (emailElement.classList.contains('error')) {
    emailElement.classList.remove('error');
  }
  
  const phoneElement = form.phone;
  const phone = phoneElement.value;
  
  if (sumPhoneNumbers(phone) > 30) {
    phoneElement.classList.add('error');
  } else if (phoneElement.classList.contains('error')) {
    phoneElement.classList.remove('error');
  }
}

jQuery(function($) {
	$('#phone').mask('+7 (999) 999-99-99');
});

