import React from 'react';

import './FormPage.scss';

const Form = () => {
  const formRef = React.useRef(null);

  React.useEffect(() => {
    const isValid = (value) => value.trim().length > 0;

    const email = formRef.current.elements.email;
    const name = formRef.current.elements.name;
    const message = formRef.current.elements.message;

    const deleteError = (el) => {
      el.classList.remove('error');
    };

    const onFocusHandler = (el) => {
      el.onfocus = function () {
        deleteError(this);
      };
    };

    onFocusHandler(email);
    onFocusHandler(name);
    onFocusHandler(message);

    formRef.current.onsubmit = (e) => {
      e.preventDefault();

      deleteError(email);
      deleteError(name);
      deleteError(message);

      !isValid(email.value) && email.classList.add('error');
      !isValid(name.value) && name.classList.add('error');
      !isValid(message.value) && message.classList.add('error');

      if (
        isValid(email.value) &&
        isValid(name.value) &&
        isValid(message.value)
      ) {
        const objInfo = {
          email: email.value,
          name: name.value,
          message: message.value,
        };
        console.log(objInfo);
      }
    };
  }, []);

  return (
    <div className="container form-page">
      <h2>Форма отправки</h2>
      <form className="form-page__form" ref={formRef}>
        <input name="email" type="text" placeholder="email" />
        <input name="name" type="text" placeholder="Имя" />
        <textarea name="message" placeholder="Сообщение"></textarea>
        <button>Отправить</button>
      </form>
    </div>
  );
};

export default Form;
