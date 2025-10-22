import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'cs';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'cs' ? 'en' : 'cs');
  };

  const translations = {
    cs: {
      home: 'Domů',
      articles: 'Články',
      games: 'Hry',
      adminPanel: 'Admin Panel',
      myProfile: 'Můj Profil',
      signOut: 'Odhlásit se',
      signIn: 'Přihlásit se',
      admin: 'Admin',
      welcomeTitle: 'Objevuj Tajemství Vesmíru!',
      welcomeSubtitle: 'Vydej se s námi na dobrodružnou cestu po planetách, hvězdách a galaxiích. Naučíš se zajímavé věci o vesmíru zábavnou formou.',
      exploreArticles: 'Prozkoumat Články',
      playGames: 'Hrát Hry',
      featuredArticles: 'Doporučené články',
      readMore: 'Číst více',
      articlesPageTitle: 'Články o Vesmíru',
      articlesPageSubtitle: 'Objevuj zajímavé informace o planetách, hvězdách a vesmírných jevech',
      gamesPageTitle: 'Vesmírné Hry',
      gamesPageSubtitle: 'Zahraj si zábavné hry a simulace o vesmíru',
      searchPlaceholder: 'Hledat články...',
      category: 'Kategorie',
      all: 'Všechny',
      easy: 'Snadné',
      medium: 'Střední',
      hard: 'Pokročilé',
      quiz: 'Kvízy',
      simulation: 'Simulace',
      puzzle: 'Puzzle',
      memory: 'Pexeso',
      solarSystem: 'Sluneční soustava',
      galaxies: 'Galaxie',
      stars: 'Hvězdy',
      planets: 'Planety',
      spaceExploration: 'Průzkum vesmíru',
      noArticles: 'Zatím zde nejsou žádné články',
      noGames: 'Zatím zde nejsou žádné hry',
      educationalGames: 'Vzdělávací hry',
      learnFun: 'Učte se a bavte se zároveň',
      play: 'Hrát',
      loading: 'Načítání...',
      backToArticles: 'Zpět na články',
      published: 'Publikováno',
      email: 'Email',
      password: 'Heslo',
      loginButton: 'Přihlásit se',
      register: 'Registrovat',
      title: 'Název',
      content: 'Obsah',
      imageUrl: 'URL obrázku',
      save: 'Uložit',
      cancel: 'Zrušit',
      delete: 'Smazat',
      edit: 'Upravit',
      create: 'Vytvořit',
      manageArticles: 'Spravovat články',
      manageGames: 'Spravovat hry',
      manageUsers: 'Spravovat uživatele',
      users: 'Uživatelé',
      score: 'Skóre',
      lastPlayed: 'Naposledy hráno',
      never: 'Nikdy',
      whatAwaits: 'Co tě čeká?',
      interestingArticles: 'Zajímavé Články',
      interestingArticlesDesc: 'Čti jednoduché a zajímavé články o planetách, hvězdách a vesmíru',
      funGames: 'Zábavné Hry',
      funGamesDesc: 'Hraj simulace a kvízy, které tě naučí mnoho nového o vesmíru',
      spaceAdventures: 'Vesmírná Dobrodružství',
      spaceAdventuresDesc: 'Prozkoumej sluneční soustavu a dozvíš se o raketách a astronautech',
      readyForLaunch: 'Připraven na start?',
      readyForLaunchDesc: 'Začni objevovat vesmír již dnes!',
      startExploring: 'Začít Objevovat',
      minRead: 'min',
    },
    en: {
      home: 'Home',
      articles: 'Articles',
      games: 'Games',
      adminPanel: 'Admin Panel',
      myProfile: 'My Profile',
      signOut: 'Sign Out',
      signIn: 'Sign In',
      admin: 'Admin',
      welcomeTitle: 'Discover the Secrets of Space!',
      welcomeSubtitle: 'Join us on an adventurous journey through planets, stars and galaxies. Learn fascinating facts about space in a fun way.',
      exploreArticles: 'Explore Articles',
      playGames: 'Play Games',
      featuredArticles: 'Featured Articles',
      readMore: 'Read More',
      articlesPageTitle: 'Space Articles',
      articlesPageSubtitle: 'Discover interesting information about planets, stars and space phenomena',
      gamesPageTitle: 'Space Games',
      gamesPageSubtitle: 'Play fun games and simulations about space',
      searchPlaceholder: 'Search articles...',
      category: 'Category',
      all: 'All',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Advanced',
      quiz: 'Quizzes',
      simulation: 'Simulations',
      puzzle: 'Puzzles',
      memory: 'Memory',
      solarSystem: 'Solar System',
      galaxies: 'Galaxies',
      stars: 'Stars',
      planets: 'Planets',
      spaceExploration: 'Space Exploration',
      noArticles: 'No articles available yet',
      noGames: 'No games available yet',
      educationalGames: 'Educational Games',
      learnFun: 'Learn and have fun at the same time',
      play: 'Play',
      loading: 'Loading...',
      backToArticles: 'Back to Articles',
      published: 'Published',
      email: 'Email',
      password: 'Password',
      loginButton: 'Sign In',
      register: 'Register',
      title: 'Title',
      content: 'Content',
      imageUrl: 'Image URL',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      manageArticles: 'Manage Articles',
      manageGames: 'Manage Games',
      manageUsers: 'Manage Users',
      users: 'Users',
      score: 'Score',
      lastPlayed: 'Last Played',
      never: 'Never',
      whatAwaits: 'What awaits you?',
      interestingArticles: 'Interesting Articles',
      interestingArticlesDesc: 'Read simple and interesting articles about planets, stars and space',
      funGames: 'Fun Games',
      funGamesDesc: 'Play simulations and quizzes that will teach you a lot about space',
      spaceAdventures: 'Space Adventures',
      spaceAdventuresDesc: 'Explore the solar system and learn about rockets and astronauts',
      readyForLaunch: 'Ready for launch?',
      readyForLaunchDesc: 'Start exploring space today!',
      startExploring: 'Start Exploring',
      minRead: 'min',
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
