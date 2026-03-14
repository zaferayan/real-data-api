# Real Data API

Gerçek dünya verileri sunan bir REST API. Sahte veri yok - gerçek filmler, gerçek müzisyenler, gerçek tarifler.

Express ile yazıldı. Veritabanı gerekmez - tek bir `db.json` dosyası yeterli.

## Canlı Demo

Statik JSON: **https://zaferayan.github.io/real-data-api**

## Kurulum

```bash
npm install
```

## Kullanım

```bash
npm start
```

API `http://localhost:4000` adresinde çalışır.

## Endpoint'ler

| Endpoint | Adet | Örnek |
|----------|------|-------|
| `/movies` | 10 | The Shawshank Redemption, The Dark Knight, Inception... |
| `/books` | 10 | 1984, The Great Gatsby, The Lord of the Rings... |
| `/artists` | 10 | Leonardo da Vinci, Van Gogh, Frida Kahlo... |
| `/musicians` | 10 | The Beatles, Queen, Nirvana, Beyonce... |
| `/countries` | 10 | Japan, Turkey, Brazil, South Korea... |
| `/sports` | 10 | Messi, LeBron James, Serena Williams... |
| `/games` | 10 | Zelda: BOTW, Elden Ring, The Witcher 3... |
| `/recipes` | 10 | Margherita Pizza, Sushi Roll, Kebab, Pad Thai... |
| `/planets` | 8 | Mercury, Venus, Earth, Mars, Jupiter... |
| `/programming` | 10 | JavaScript, Python, TypeScript, Rust, Go... |
| `/pokemons` | 10 | Pikachu, Charizard, Mewtwo, Gengar... |
| `/superheroes` | 10 | Batman, Spider-Man, Wonder Woman, Iron Man... |
| `/cars` | 10 | Toyota Supra, Ferrari F8, Tesla Model S... |
| `/tvShows` | 10 | Breaking Bad, Friends, Dark, Chernobyl... |
| `/anime` | 10 | Naruto, One Piece, Death Note, Demon Slayer... |
| `/footballTeams` | 10 | Real Madrid, Galatasaray, Liverpool, Bayern... |
| `/instruments` | 10 | Piano, Guitar, Violin, Saxophone... |
| `/dinosaurs` | 10 | T-Rex, Velociraptor, Triceratops, Spinosaurus... |
| `/mythologies` | 10 | Zeus, Thor, Anubis, Amaterasu, Ganesha... |
| `/inventions` | 10 | Printing Press, Telephone, WWW, Penicillin... |
| `/coffees` | 10 | Espresso, Turkish Coffee, Cold Brew, Latte... |

## Kimlik Doğrulama (Auth)

Öğrencilerin login akışlarını pratikte deneyebilmesi için JWT tabanlı auth sistemi.

### Hazır Kullanıcılar

| Email | Şifre |
|-------|-------|
| `john@example.com` | `123456` |
| `jane@example.com` | `123456` |
| `ali@example.com` | `123456` |

### Auth Endpoint'leri

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `POST` | `/auth/register` | Yeni kullanıcı kaydı |
| `POST` | `/auth/login` | Giriş yap, token al |
| `GET` | `/auth/me` | Mevcut kullanıcıyı getir (token gerekli) |

### Auth Örnekleri

```bash
# Kayıt ol
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ayse","lastName":"Kaya","email":"ayse@example.com","password":"123456"}'

# Giriş yap
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Token ile kullanıcı bilgisi al
curl http://localhost:4000/auth/me \
  -H "Authorization: Bearer eyJhbGci..."
```

## CRUD İşlemleri

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET` | `/:collection` | Tüm kayıtları getir |
| `GET` | `/:collection/:id` | Tek kayıt getir |
| `POST` | `/:collection` | Yeni kayıt oluştur |
| `PUT` | `/:collection/:id` | Kaydı değiştir |
| `PATCH` | `/:collection/:id` | Alanları güncelle |
| `DELETE` | `/:collection/:id` | Kaydı sil |

## Örnek İstekler

```bash
# Tüm filmler
curl http://localhost:4000/movies

# Tek film
curl http://localhost:4000/movies/3

# Yeni pokemon ekle
curl -X POST http://localhost:4000/pokemons \
  -H "Content-Type: application/json" \
  -d '{"name":"Rayquaza","type":"Dragon/Flying","hp":105}'

# Tarif güncelle
curl -X PATCH http://localhost:4000/recipes/6 \
  -H "Content-Type: application/json" \
  -d '{"difficulty":"Hard"}'

# Dinozor sil
curl -X DELETE http://localhost:4000/dinosaurs/10
```

## Örnek Yanıt

```json
{
  "id": 3,
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "year": 2008,
  "genre": "Action",
  "rating": 9.0,
  "duration": 152,
  "image": "https://m.media-amazon.com/images/..."
}
```

## Yeni Veri Ekleme

`db.json` dosyasına yeni bir dizi ekleyin. Otomatik olarak endpoint haline gelir:

```json
{
  "cars": [
    { "id": 1, "brand": "Toyota", "model": "Supra", "year": 2024 },
    { "id": 2, "brand": "BMW", "model": "M3", "year": 2023 }
  ]
}
```

Sunucuyu yeniden başlatın ve `GET /cars` hazır.

## Postman Collection

Hazır Postman collection dosyası projede mevcut. Import etmek için:

1. Postman'i açın
2. Sol üstten **Import** butonuna tıklayın
3. `Real_Data_API.postman_collection.json` dosyasını sürükleyip bırakın veya **Upload Files** ile seçin
4. Tüm endpoint'ler "Real Data API" collection'ı altında görünecek

Login/Register sonrası dönen token otomatik olarak kaydedilir ve Me isteğinde kullanılır.

![Postman Collection](docs/postman-screenshot.png)

## Statik Kullanım (GitHub Pages)

Sunucu çalıştırmadan verileri doğrudan GitHub Pages üzerinden çekebilirsiniz:

```js
fetch("https://zaferayan.github.io/real-data-api/api/movies.json")
  .then(res => res.json())
  .then(data => console.log(data));
```
