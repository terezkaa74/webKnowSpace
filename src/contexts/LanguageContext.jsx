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
      welcomeTitle: 'Vítejte v KnowSpace',
      welcomeSubtitle: 'Objevujte fascinující svět vesmíru',
      exploreArticles: 'Prozkoumat články',
      playGames: 'Hrát hry',
      featuredArticles: 'Doporučené články',
      readMore: 'Číst více',
      allArticles: 'Všechny články',
      searchPlaceholder: 'Hledat články...',
      category: 'Kategorie',
      all: 'Vše',
      solarSystem: 'Sluneční soustava',
      galaxies: 'Galaxie',
      stars: 'Hvězdy',
      planets: 'Planety',
      spaceExploration: 'Průzkum vesmíru',
      noArticles: 'Zatím zde nejsou žádné články.',
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
      welcomeTitle: 'Welcome to KnowSpace',
      welcomeSubtitle: 'Discover the fascinating world of space',
      exploreArticles: 'Explore Articles',
      playGames: 'Play Games',
      featuredArticles: 'Featured Articles',
      readMore: 'Read More',
      allArticles: 'All Articles',
      searchPlaceholder: 'Search articles...',
      category: 'Category',
      all: 'All',
      solarSystem: 'Solar System',
      galaxies: 'Galaxies',
      stars: 'Stars',
      planets: 'Planets',
      spaceExploration: 'Space Exploration',
      noArticles: 'No articles available yet.',
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
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
