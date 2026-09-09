import './App.css';
import { useEffect, useState } from 'react';

type FunFact = {
  text: string;
};

function App() {
  const [currentFact, setCurrentFact] = useState('Loading a fun fact...');

  useEffect(() => {
    let isMounted = true;
    let funFacts: FunFact[] = [];

    const interval = setInterval(() => {
      if (!isMounted || funFacts.length === 0) return;

      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setCurrentFact(funFacts[randomIndex].text);
    }, 2000);

    fetch('/funfacts.json')
      .then((response) => response.json())
      .then((data) => {
        if (!isMounted || data.funFacts.length === 0) return;

        funFacts = data.funFacts;
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        setCurrentFact(funFacts[randomIndex].text);
      });

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);


  return (
    <>
      <h1>Lucia Sarmiento Lodeiro</h1>
      <div className="card">
        <p className="fun-fact-title">Fun facts about me:</p>
        <p className="fun-fact" aria-live="polite">{currentFact}</p>
      </div>
    </>
  );
}

export default App;
