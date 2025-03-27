"use client";

import { useEffect, useState } from "react";

export const VersionTest = () => {
  const [version, setVersion] = useState<Record<string, string> | null>(null);

  const [jsonVersion, setJsonVersion] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    const fetchVersion = async () => {
      const response = await fetch("/api/version", {
        cache: "no-store",
      });
      const data = await response.json();
      setVersion(data);
    };

    const fetchJsonFile = async () => {
      const response = await fetch("/api/version-container", {
        cache: "no-store",
      });
      const data = await response.json();
      setJsonVersion(data);
    };

    fetchVersion();
    fetchJsonFile();
  }, []);

  if (!version || !jsonVersion) return <div>Loading...</div>;

  return (
    <div>
      <h2>App Version</h2>
      <ul>
        {Object.entries(version).map(([app, ver]) => (
          <li key={app}>
            {app}: {ver}
          </li>
        ))}
      </ul>
      <ul>
        {Object.entries(jsonVersion).map(([app, ver]) => (
          <li key={app}>
            {app}: {ver}
          </li>
        ))}
      </ul>
    </div>
  );
};
