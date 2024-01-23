'use client';

import { FormEvent, useEffect, useState } from 'react';
import { language } from '@prisma/client';
import { createLanguage } from '@/api-calls/language/create-language';
import { readLanguage } from '@/api-calls/language/read-language';
import Snippets from '@/components/Snippets';

const DEFAULT_TITLE: string = 'SnippetMaster';

const getLangFromURL = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const searchParams = new URLSearchParams(window.location.search);
  const language = (searchParams.get('language') ?? '') || ''; // Default to an empty string if parameter is not present
  return language;
};

export default function Languages() {
  const [languages, setLanguages] = useState<language[] | null>([]);

  const [currentLang, setCurrentLang] = useState<string | null>(
    getLangFromURL(),
  );

  const setURLParam = (language: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('language', language);
    window.history.pushState({}, '', newUrl.toString());
    document.title = language;
  };

  const changeLanguage = (language: string) => {
    setURLParam(language);
    setCurrentLang(() => {
      return language;
    });
  };

  useEffect(() => {
    readLanguage()
      .then((result) => {
        if (result) {
          setLanguages(result);
        }
      })
      .catch(() => {});

    const handTitleChange = () => {
      const language = getLangFromURL();
      if (language === '') {
        document.title = DEFAULT_TITLE;
        setCurrentLang('');
      }
      document.title = language ?? '';
      setCurrentLang(language);
    };
    handTitleChange();

    window.removeEventListener('popstate', handTitleChange);
    return () => {
      window.addEventListener('popstate', handTitleChange);
    };
  }, []);

  return (
    <>
      {languages &&
        languages?.map(({ lang_id, display_name, lang_name }) => (
          <button
            key={lang_id}
            onClick={() => {
              changeLanguage(lang_name);
            }}
          >
            {display_name !== '' ? display_name : lang_name}
          </button>
        ))}
      {!languages && <span>No languages</span>}
      <AddLanguageComponent />
      {currentLang !== null && currentLang !== '' && (
        <Snippets language={currentLang} />
      )}
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

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { lang_name, display_name } = formData;

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
        +
      </button>

      {isFormVisible && (
        <form
          style={{ display: 'inline-block' }}
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
        </form>
      )}
    </>
  );
}
