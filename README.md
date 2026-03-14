# Real Data API

A REST API serving curated, real-world data sets. No fake data - real films, real musicians, real recipes.

Built with Express. No database needed - just a single `db.json` file.

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

API runs at `http://localhost:4000`.

## Endpoints

| Endpoint | Items | Example |
|----------|-------|---------|
| `/films` | 10 | The Shawshank Redemption, The Dark Knight, Inception... |
| `/books` | 10 | 1984, The Great Gatsby, The Lord of the Rings... |
| `/artists` | 10 | Leonardo da Vinci, Van Gogh, Frida Kahlo... |
| `/musicians` | 10 | The Beatles, Queen, Nirvana, Beyonce... |
| `/countries` | 10 | Japan, Turkey, Brazil, South Korea... |
| `/sports` | 10 | Messi, LeBron James, Serena Williams... |
| `/games` | 10 | Zelda: BOTW, Elden Ring, The Witcher 3... |
| `/recipes` | 10 | Margherita Pizza, Sushi Roll, Kebab, Pad Thai... |
| `/planets` | 8 | Mercury, Venus, Earth, Mars, Jupiter... |
| `/programming` | 10 | JavaScript, Python, TypeScript, Rust, Go... |

## Example Requests

```bash
# All films
curl http://localhost:4000/films

# Single film
curl http://localhost:4000/films/3

# All recipes
curl http://localhost:4000/recipes
```

## Example Response

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

## Adding New Data

Edit `db.json` and add a new top-level array. It will automatically become an endpoint:

```json
{
  "cars": [
    { "id": 1, "brand": "Toyota", "model": "Supra", "year": 2024 },
    { "id": 2, "brand": "BMW", "model": "M3", "year": 2023 }
  ]
}
```

Restart the server and `GET /cars` is ready.
