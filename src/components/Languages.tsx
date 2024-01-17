'use client';

import {useEffect, useState} from 'react';
import {language} from '@prisma/client';

export default function Home() {
  const [languages, setLanguages] = useState<language[]>([]);

  useEffect(() => {
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
      .catch((error: string) => {
        // Failure
        throw new Error(error);
      });
  }, []);

  return (
    <>
      {languages.length !== 0 &&
        languages?.map(({lang_id, display_name, lang_name}, i) => (
          <button key={lang_id}>{display_name}</button>
        ))}
    </>
  );
}
