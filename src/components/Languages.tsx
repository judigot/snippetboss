'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { language } from '@prisma/client';
import { createLanguage } from '@/api-calls/language/create-language';
import { readLanguage } from '@/api-calls/language/read-language';
import Snippets from '@/components/Snippets';
import Prefixes from '@/components/Prefixes';

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
  const pagesKeys = {
    PREFIXES: 'PREFIXES',
    SNIPPETS: 'SNIPPETS',
  } as const;

  const pages: {
    [K in keyof typeof pagesKeys]: string;
  } = {
    [pagesKeys.PREFIXES]: 'Prefixes',
    [pagesKeys.SNIPPETS]: 'Snippets',
  } as const;

  const [languages, setLanguages] = useState<language[] | null | undefined>(
    undefined,
  );

  const [selectedLang, setSelectedLang] = useState<language | null | undefined>(
    undefined,
  );

  const [currentPage, setCurrentPage] = useState<
    (typeof pages)[keyof typeof pages] | undefined
  >(undefined);

  const setURLParam = (language: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('language', language);
    window.history.pushState({}, '', newUrl.toString());
    document.title = language;
  };

  const getSelectedLanguageInfo = useCallback(
    (lang?: language[] | null | undefined): language | null => {
      const finalLang: language[] | null | undefined = lang ?? languages;

      const selected: language | undefined = finalLang?.filter(
        (language) => language.language_name === getLangFromURL(),
      )[0];

      if (!selected) {
        return null;
      }

      return selected;
    },
    [languages],
  );

  const changeLanguage = (language: string) => {
    setURLParam(language);
    setSelectedLang(() => getSelectedLanguageInfo());
  };

  useEffect(() => {
    const handTitleChange = () => {
      const languageInURL = getLangFromURL() || DEFAULT_TITLE;
      setCurrentPage(() =>
        getLangFromURL() === '' ? pages.PREFIXES : pages.SNIPPETS,
      );
      document.title = languageInURL;
    };

    if (languages === undefined) {
      void (async () => {
        const result = await readLanguage();
        if (result) {
          handTitleChange();
          setLanguages(() => result);
          setSelectedLang(() => getSelectedLanguageInfo(result));
        }
      })();
    }

    window.removeEventListener('popstate', handTitleChange);
    return () => {
      window.addEventListener('popstate', handTitleChange);
    };
  }, [languages, getSelectedLanguageInfo, pages.SNIPPETS, pages.PREFIXES]);

  return (
    <>
      <section style={{ textAlign: 'center' }}>
        <h1>Languages</h1>
        {languages &&
          languages?.map(({ language_id, display_name, language_name }) => (
            <button
              key={language_id}
              onClick={() => {
                changeLanguage(language_name);
              }}
            >
              {display_name !== '' ? display_name : language_name}
            </button>
          ))}
        {!languages && <span>No languages</span>}
        <AddLanguageComponent />
      </section>
      <hr />
      <div style={{ textAlign: 'center' }}>
        {selectedLang && (
          <>
            <a
              href="page"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(pages.PREFIXES);
              }}
            >
              {pages.PREFIXES}
            </a>
            &nbsp;|&nbsp;
            <a
              href="page"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(pages.SNIPPETS);
              }}
            >
              {pages.SNIPPETS}
            </a>
          </>
        )}
      </div>

      {selectedLang && (
        <>
          <h1>
            {selectedLang.display_name}
            &nbsp;
            {currentPage}
          </h1>
          {currentPage === pages.PREFIXES && (
            <Prefixes language={selectedLang.language_name} />
          )}
          {currentPage === pages.SNIPPETS && (
            <>{<Snippets language={selectedLang.language_name} />}</>
          )}
        </>
      )}
    </>
  );
}

export function AddLanguageComponent() {
  interface LanguageForm extends Omit<language, 'language_id'> {}

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [formData, setFormData] = useState<LanguageForm>({
    language_name: '',
    display_name: '',
  });

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { language_name, display_name } = formData;

    if (language_name && display_name !== null) {
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
        <section>
          <form
            style={{ display: 'inline-block' }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="language_name">Programming Language</label>
            <input
              required
              type="text"
              name="language_name"
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
        </section>
      )}
    </>
  );
}
