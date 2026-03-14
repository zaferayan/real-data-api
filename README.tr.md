# Real Data API

Gerçek dünya verileri sunan bir REST API. Sahte veri yok - gerçek filmler, gerçek müzisyenler, gerçek tarifler.

Express ile yazildi. Veritabani gerekmez - tek bir `db.json` dosyasi yeterli.

## Canli Demo

Statik JSON: **https://zaferayan.github.io/real-data-api**

## Kurulum

```bash
npm install
```

## Kullanim

```bash
npm start
```

API `http://localhost:4000` adresinde calisir.

## Endpoint'ler

| Endpoint | Adet | Ornek |
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

## Kimlik Dogrulama (Auth)

Ogrencilerin login akislarini pratikte deneyebilmesi icin JWT tabanli auth sistemi.

### Hazir Kullanicilar

| Email | Sifre |
|-------|-------|
| `john@example.com` | `123456` |
| `jane@example.com` | `123456` |
| `ali@example.com` | `123456` |

### Auth Endpoint'leri

| Method | Endpoint | Aciklama |
|--------|----------|----------|
| `POST` | `/auth/register` | Yeni kullanici kaydi |
| `POST` | `/auth/login` | Giris yap, token al |
| `GET` | `/auth/me` | Mevcut kullaniciyi getir (token gerekli) |

### Auth Ornekleri

```bash
# Kayit ol
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ayse","lastName":"Kaya","email":"ayse@example.com","password":"123456"}'

# Giris yap
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Token ile kullanici bilgisi al
curl http://localhost:4000/auth/me \
  -H "Authorization: Bearer eyJhbGci..."
```

## CRUD Islemleri

| Method | Endpoint | Aciklama |
|--------|----------|----------|
| `GET` | `/:collection` | Tum kayitlari getir |
| `GET` | `/:collection/:id` | Tek kayit getir |
| `POST` | `/:collection` | Yeni kayit olustur |
| `PUT` | `/:collection/:id` | Kaydi degistir |
| `PATCH` | `/:collection/:id` | Alanlari guncelle |
| `DELETE` | `/:collection/:id` | Kaydi sil |

## Ornek Istekler

```bash
# Tum filmler
curl http://localhost:4000/movies

# Tek film
curl http://localhost:4000/movies/3

# Yeni pokemon ekle
curl -X POST http://localhost:4000/pokemons \
  -H "Content-Type: application/json" \
  -d '{"name":"Rayquaza","type":"Dragon/Flying","hp":105}'

# Tarif guncelle
curl -X PATCH http://localhost:4000/recipes/6 \
  -H "Content-Type: application/json" \
  -d '{"difficulty":"Hard"}'

# Dinozor sil
curl -X DELETE http://localhost:4000/dinosaurs/10
```

## Ornek Yanit

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

`db.json` dosyasina yeni bir dizi ekleyin. Otomatik olarak endpoint haline gelir:

```json
{
  "cars": [
    { "id": 1, "brand": "Toyota", "model": "Supra", "year": 2024 },
    { "id": 2, "brand": "BMW", "model": "M3", "year": 2023 }
  ]
}
```

Sunucuyu yeniden baslatin ve `GET /cars` hazir.

## Postman Collection

Hazir Postman collection dosyasi projede mevcut. Import etmek icin:

1. Postman'i acin
2. Sol ustten **Import** butonuna tiklayin
3. `Real_Data_API.postman_collection.json` dosyasini surukleyip birakin veya **Upload Files** ile secin
4. Tum endpoint'ler "Real Data API" collection'i altinda gorunecek

Login/Register sonrasi donen token otomatik olarak kaydedilir ve Me isteğinde kullanilir.

## Statik Kullanim (GitHub Pages)

Sunucu calistirmadan verileri dogrudan GitHub Pages uzerinden cekebilirsiniz:

```js
fetch("https://zaferayan.github.io/real-data-api/api/movies.json")
  .then(res => res.json())
  .then(data => console.log(data));
```
