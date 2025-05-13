# Aplikacja Przetargi

Aplikacja internetowa umożliwiająca zarządzanie przetargami, składanie ofert oraz przeglądanie zakończonych przetargów.

## Funkcjonalności

- **Strona główna**: Wyświetla podstawowe informacje o aplikacji.
- **Lista przetargów**: Przegląd aktywnych przetargów.
- **Dodawanie przetargów**: Formularz umożliwiający dodanie nowego przetargu.
- **Szczegóły przetargu**: Wyświetlanie szczegółowych informacji o przetargu oraz złożonych ofertach.
- **Składanie ofert**: Możliwość składania ofert na aktywne przetargi.
- **Lista zakończonych przetargów**: Przegląd przetargów, które zostały zakończone.


## Technologie

- Node.js - środowisko uruchomieniowe JavaScript
- Express.js - framework do budowy aplikacji webowych
- NPM - menedżer pakietów dla Node.js
- BodyParser - parser do formularzy (bodie)
- Path - obsługa ścieżek plików
- Baza danych MySQL - przechpwuje dane o przetargach i ofertach.

## Struktura

- **controllers/** - Zawiera logikę aplikacji, np. obsługę żądań i interakcję z bazą danych.
- **db/** - Konfiguracja połączenia z bazą danych.
- **demo/** - Wideo pokazowa z działania  oraz bazy danych.
- **public/** - Pliki statyczne.
- **routes/** - Definicje tras aplikacji.
- **views/** - Szablony widoków EJS renderowane na stronie.
- **xml/** - Dump danych przykładowych do bazy danych.
- **node_modules/** - Zainstalowane zależności projektu (generowane przez npm install).
- **README.md** - Dokumentacja projektu.
- **app.js** - Główny plik aplikacji, konfigurujący serwer i middleware.