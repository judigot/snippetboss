'use client';

import {FormEvent, useEffect, useState} from 'react';
import {language} from '@prisma/client';
import {createLanguage} from '@/helpers/api/language/create-language';

export default function Home() {
  const [languages, setLanguages] = useState<language[]>([]);

  useEffect(() => {
    // readLanguage()
    //   .then((result: language[]) => {
    //     setLanguages(result);
    //   })
    //   .catch(() => {});
    fetch(`http://localhost:3000/api/v1/languages`, {
      // *GET, POST, PATCH, PUT, DELETE
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // For POST, PATCH, and PUT requests
      // body: JSON.stringify({ key: "value" }),
    })
      .then((response) => response.json())
      .then((result: language[]) => {
        // Success
        setLanguages(result);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {languages.length !== 0 &&
        languages?.map(({lang_id, display_name, lang_name}, i) => (
          <button key={lang_id}>
            {display_name !== '' ? display_name : lang_name}
          </button>
        ))}
      {languages.length === 0 && <span>No languages</span>}
      <AddLanguageComponent />
    </>
  );
}

export function AddLanguageComponent() {
  interface LanguageForm extends Omit<language, 'lang_id'> {}

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [formData, setFormData] = useState<LanguageForm>({
    lang_name: '',
    display_name: '',
  });

  const [message] = useState<string>('');

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {lang_name, display_name} = formData;

    if (lang_name && display_name !== null) {
      createLanguage(formData)
        .then(() => {
          setFormData(formData);
          setIsFormVisible(false);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsFormVisible(!isFormVisible);
        }}
      >
        Add language
      </button>

      {isFormVisible && (
        <form
          style={{display: 'inline-block'}}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="lang_name">Programming Language</label>
          <input
            required
            type="text"
            name="lang_name"
            onChange={handleInputChange}
          />

          <label htmlFor="display_name">Display Name</label>
          <input
            // required
            type="text"
            name="display_name"
            onChange={handleInputChange}
          />

          <button type="submit">Submit</button>

          {message && <p>{message}</p>}
        </form>
      )}
    </>
  );
}
