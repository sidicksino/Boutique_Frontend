// src/hooks/useSearch.js
import { useCallback, useState } from "react";

const useSearch = (initialData = [], searchKey = "name") => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(initialData);

  const handleSearch = useCallback(
    (text) => {
      setQuery(text);
      if (!text.trim()) {
        setResults(initialData);
        return;
      }

      const filtered = initialData.filter((item) =>
        item[searchKey].toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    },
    [initialData, searchKey]
  );

  return { query, results, handleSearch, setResults };
};

export default useSearch;