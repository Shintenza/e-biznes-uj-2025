**Zadanie 1** Docker

- :white_check_mark: 3.0 obraz ubuntu z Pythonem w wersji 3.10 [Link do commita 1](https://github.com/Shintenza/e-biznes-uj-2025/commit/c21261db81676f39ab5f0d63d84ab061c375ca44)
- :white_check_mark: 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem [Link do commita2 ](https://github.com/Shintenza/e-biznes-uj-2025/commit/c21261db81676f39ab5f0d63d84ab061c375ca44)
- :white_check_mark: 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle) [Link do commita 3](https://github.com/Shintenza/e-biznes-uj-2025/commit/c21261db81676f39ab5f0d63d84ab061c375ca44)
- :white_check_mark: 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle [Link do commita 4](https://github.com/Shintenza/e-biznes-uj-2025/commit/c21261db81676f39ab5f0d63d84ab061c375ca44)
- :white_check_mark: 5.0 dodać konfigurację docker-compose [Link do commita 5](https://github.com/Shintenza/e-biznes-uj-2025/commit/c21261db81676f39ab5f0d63d84ab061c375ca44)

Kod: [task-1](https://github.com/Shintenza/e-biznes-uj-2025/tree/master/task-1)

**Zadanie 2** Scala + Play

- :white_check_mark: 3.0 należy stworzyć kontroler do Produktów [Link do commita 1](https://github.com/Shintenza/e-biznes-uj-2025/commit/58817ee7c8f83e060a1d5bf8692e01e2e98d4134)
- :white_check_mark: 3.5 do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy [Link do commita2 ](https://github.com/Shintenza/e-biznes-uj-2025/commit/58817ee7c8f83e060a1d5bf8692e01e2e98d4134)
- :white_check_mark: 4.0 należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD [Link do commita 3](https://github.com/Shintenza/e-biznes-uj-2025/commit/58817ee7c8f83e060a1d5bf8692e01e2e98d4134)

- :white_check_mark: 4.5 należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok [Link do commita 4](https://github.com/Shintenza/e-biznes-uj-2025/commit/58817ee7c8f83e060a1d5bf8692e01e2e98d4134)

- :white_check_mark: 5.0 należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD
  Kontrolery mogą bazować na listach zamiast baz danych. CRUD: show all, show by id (get), update (put), delete (delete), add (post). [Link do commita 5](https://github.com/Shintenza/e-biznes-uj-2025/commit/58817ee7c8f83e060a1d5bf8692e01e2e98d4134)

Kod: [task-2](https://github.com/Shintenza/e-biznes-uj-2025/tree/master/task-2_scala-shop)

**Zadanie 3** Scala + Play

- :white_check_mark: 3.0 należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord [Link do commita 1](https://github.com/Shintenza/e-biznes-uj-2025/commit/8cd9acef76fbd3e60db41c49cf50daf03a8f61bd)
- :white_check_mark: 3.5 aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) [Link do commita2 ](https://github.com/Shintenza/e-biznes-uj-2025/commit/8cd9acef76fbd3e60db41c49cf50daf03a8f61bd)
- :white_check_mark: 4.0 zwróci listę kategorii na określone żądanie użytkownika [Link do commita 3](https://github.com/Shintenza/e-biznes-uj-2025/commit/8cd9acef76fbd3e60db41c49cf50daf03a8f61bd)
- :white_check_mark: 4.5 zwróci listę produktów wg żądanej kategorii [Link do commita 4](https://github.com/Shintenza/e-biznes-uj-2025/commit/8cd9acef76fbd3e60db41c49cf50daf03a8f61bd)
- :white_check_mark: 5.0 aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex [Link do commita 5](https://github.com/Shintenza/e-biznes-uj-2025/commit/8cd9acef76fbd3e60db41c49cf50daf03a8f61bd)

Kod: [task-3](https://github.com/Shintenza/e-biznes-uj-2025/tree/master/task-3_ktor)

**Zadanie 4** Go

- :white_check_mark: 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie
  miała kontroler Produktów zgodny z CRUD [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/33c8a0b4971d7c7d9c880f21883cfaa001149751)

- :white_check_mark: 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz
  wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast
  listy) [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/33c8a0b4971d7c7d9c880f21883cfaa001149751)

- :white_check_mark: 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/2a7cb59bc9ca5535ffc5e36758155d0f3a345006)

- :white_check_mark: 4.5 Należy stworzyć model kategorii i dodać relację między kategorią,
  a produktem [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/2a7cb59bc9ca5535ffc5e36758155d0f3a345006)

- ❌ 5.0 pogrupować zapytania w gorm’owe scope'y

**Zadanie 5** React

Jako backendu użyto projektu z wcześniejszego zadania

- ✅ 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
  Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
  Produktach powinniśmy pobierać dane o produktach z aplikacji
  serwerowej [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/b48067535813519e08f5558b74a6ddd28130b5f8)
- ✅ 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/b48067535813519e08f5558b74a6ddd28130b5f8)
- ✅ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
  pomocą React hooks [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/b48067535813519e08f5558b74a6ddd28130b5f8)
- ✅ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
  kliencką na dockerze via docker-compose [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/6f037c83c534e6b3edb6600cdb1e871a86a335d0)
- ✅ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/b48067535813519e08f5558b74a6ddd28130b5f8)

** Zadanie 6** Testy

- ✅ 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium
  (Kotlin, Python, Java, JS, Go, Scala) [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/6ffb35acaa86004f5fc6ac3e404318b6b45b74f6)
- ✅ 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50
  asercji [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/6ffb35acaa86004f5fc6ac3e404318b6b45b74f6)
- ❌ 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami
- ❌ 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint
- ❌ 5.0 Należy uruchomić testy funkcjonalne na Browserstacku

**Zadanie 7**
W przypadku tego zadania załączam linki do repozytoriów, gdzie podpięte są badge z sonara

- ✅ 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w
  hookach gita [Link do commita](https://github.com/Shintenza/e-biznes-uj-2025/commit/838a90e9d02a3ded3b6f7c8a27da48b3c59bb34d)
- ✅ 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod
  aplikacji serwerowej) [Link do repo](https://github.com/Shintenza/e-biznes_go-shop)
- ✅ 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod
  aplikacji serwerowej) [Link do repo](https://github.com/Shintenza/e-biznes_go-shop)
- ✅ 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa
  w kodzie w Sonarze (kod aplikacji serwerowej) [Link do repo](https://github.com/Shintenza/e-biznes_go-shop)
- ✅ 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie
  aplikacji klienckiej [Link do repo](https://github.com/Shintenza/e-biznes_react-shop)
