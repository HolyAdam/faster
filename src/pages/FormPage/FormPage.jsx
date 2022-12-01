import React from 'react';

import './FormPage.scss';

const Form = () => {
  const formRef = React.useRef(null);
  const [isCheckedPolitics, setIsCheckedPolitics] =
    React.useState(false);

  React.useEffect(() => {
    const isValid = (value) => value.trim().length > 0;

    const email = formRef.current.elements.email;
    const name = formRef.current.elements.name;
    const message = formRef.current.elements.message;
    const theme = formRef.current.elements.theme;
    const politics = formRef.current.elements.politics;
    const file = formRef.current.elements.file;

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
          theme: theme.value,
          politics: politics.checked,
          file: file.files[0],
        };
        console.log(objInfo);
        formRef.current.reset();
        setIsCheckedPolitics(false);
      }
    };
  }, []);

  return (
    <div className="container form-page">
      <h2>Форма отправки</h2>
      <form className="form-page__form" ref={formRef}>
        <input
          className="input"
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          className="input"
          name="name"
          type="text"
          placeholder="Имя"
        />
        <textarea name="message" placeholder="Сообщение"></textarea>
        <div className="form-page__checkbox">
          <label htmlFor="id_politics">
            Принимаю политику обработки данных
          </label>
          <input
            type="checkbox"
            id="id_politics"
            name="politics"
            onChange={(e) => setIsCheckedPolitics(e.target.checked)}
            checked={isCheckedPolitics}
          />
        </div>
        <div className="form-page__radio">
          <p>Выберите одну тему:</p>
          <div className="form-page__radio-wrapper">
            <div>
              <label htmlFor="theme1">Обращение</label>
              <input
                id="theme1"
                name={'theme'}
                type="radio"
                value={'Тема 1'}
                defaultChecked={true}
              />
            </div>
            <div>
              <label htmlFor="theme2">Идея</label>
              <input
                id="theme2"
                name={'theme'}
                type="radio"
                value={'Тема 2'}
              />
            </div>
            <div>
              <label htmlFor="theme3">Компромисс</label>
              <input
                id="theme3"
                name={'theme'}
                type="radio"
                value={'Тема 3'}
              />
            </div>
          </div>
        </div>
        <div className="form-page__file">
          <p>Выберите файлы:</p>
          <input className="file-input" name="file" type="file" />
        </div>
        <button disabled={!isCheckedPolitics}>Отправить</button>
      </form>
    </div>
  );
};

export default Form;
