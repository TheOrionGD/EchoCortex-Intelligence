# Code Citations - Theme Context Implementation

## License: unknown
https://github.com/edgio-docs/edgio-docs/blob/1b5172cc61958d43d487c801adfc442dd10c64a5/src/contexts/ThemeContext.tsx

```typescript
', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
```


## License: MIT
https://github.com/adam-zhu/spot-on-take-home/blob/0da35ccb1cfbd64fbd81a24f325c3e8a140efe3e/src/contexts/themeContext.js

```typescript
', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
```


## License: MIT
https://github.com/meseven/tcmb-react-egitimi-g2/blob/25f37b1246cbeafadbc1686d2daead3e671dc834/day3/context-api/src/context/ThemeContext.js

```typescript
', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
```


## License: unknown
https://github.com/hitendrasinh-Parmar/tasktestApp1_23/blob/ee5a7120739ba681a68cb3c41f7983f84b71a93d/src/theme/ThemeProvider.tsx

```typescript
', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
```


## License: unknown
https://github.com/sayaneko514/personal_arknight_planner/blob/d8cfa43f939f09ce502d4c4b48fc49841809643d/src/contexts/theme.tsx

```typescript
', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
```