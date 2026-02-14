# Dog Shows API Documentation

> For the Claude agent building the Next.js frontend.
> This API serves data for a dog show results website. Content is statically generated (ISR) and revalidated on-demand when the admin publishes new data.

## Base URL

```
http://dog-shows-scrapper-admin.test/api/v1
```

## Authentication

Every request must include a Bearer token in the `Authorization` header:

```
Authorization: Bearer {API_TOKEN}
Accept: application/json
```

Store `API_TOKEN` in your Next.js `.env.local` as a **server-side** variable (not `NEXT_PUBLIC_`):

```env
API_TOKEN=dsa_k7m2p9x4w8n1q5r3t6y0u2i8o4a7s1d5f3g9h6j
API_BASE_URL=http://dog-shows-scrapper-admin.test/api/v1
```

Example fetch helper:

```ts
async function api<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${process.env.API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      Accept: "application/json",
    },
    next: { tags: [/* relevant cache tags */] },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

---

## Show Types

The API has three show types:

| Show Type | Description | Breed-related? |
|---|---|---|
| `CONFORMATION` | Standard breed conformation judging | Yes — `breed` field contains an actual breed name |
| `OBEDIENCE` | Obedience trial classes | No — `breed` field contains `"OBEDIENCE TRIAL CLASSES"` |
| `RALLY` | Rally obedience competition | No — `breed` field contains class names like `"Rally Novice Class A"` |
| `GROUP_BIS` | Group judging and Best in Show | No — `breed` field contains group/BIS names like `"SPORTING GROUP"`, `"BEST IN SHOW"` |

**Special "breeds"** that appear in the breeds list but are not actual breeds:
- `JUNIOR SHOWMANSHIP COMPETITION` — has show_type `CONFORMATION` but is a handler competition, not a breed show
- `OBEDIENCE TRIAL CLASSES` — has show_type `OBEDIENCE`
- Rally class names (e.g., `Rally Novice Class A`) — have show_type `RALLY`
- `BEST IN SHOW`, `RESERVE BEST IN SHOW` — have show_type `GROUP_BIS`
- Group names (e.g., `SPORTING GROUP`, `HERDING GROUP`, `WORKING GROUP`) — have show_type `GROUP_BIS`

**Note:** `GROUP_BIS` data is scraped from Infodog's `bno=00000` pages but may not be published yet in the current database.

The frontend separates these from regular breed shows using the `show_types` array in `BreedStat`, the breed name for Junior Showmanship, and the `" GROUP"` suffix for group names.

---

## On-Demand Revalidation

The Laravel admin sends a POST to your Next.js app whenever content changes. You need to create a revalidation API route.

### What Laravel sends

```
POST /api/revalidate
Header: x-revalidate-secret: {NEXTJS_REVALIDATE_SECRET}
Body: {
  "tags": ["dog-shows", "events", "stats"],
  "context": { "type": "batch", "action": "batch-verified", "count": 42 }
}
```

### Tags sent per event

| Admin Action | Tags Sent |
|---|---|
| Show published/unpublished | `dog-shows`, `events`, `stats`, `filters` |
| Batch verified | `dog-shows`, `events`, `stats`, `filters`, `search` |
| Site source verified | `dog-shows`, `events`, `stats`, `filters`, `search` |
| Judge created/updated/deleted | `judges`, `judge-{slug}`, `search` |
| Dog created/updated/deleted | `dogs`, `dog-{slug}`, `search` |
| Dog gallery changed | `dogs`, `dog-{slug}`, `search` |

### Next.js revalidation route example

Create `app/api/revalidate/route.ts`:

```ts
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const tags: string[] = body.tags || [];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: tags, now: Date.now() });
}
```

---

## Endpoints

### 1. Dog Shows (Individual)

#### `GET /dog-shows`

Paginated list of published dog shows. This returns shows **without** their `entries` array (for performance).

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `breed` | string | Exact breed filter (e.g., `PEMBROKE WELSH CORGIS`) |
| `location` | string | Partial match on location |
| `show_type` | string | Exact show type filter (`CONFORMATION`, `OBEDIENCE`, `RALLY`) |
| `judge` | string | Partial match on judge name |
| `search` | string | Searches across show_name, location, breed, judge |
| `date_from` | date (Y-m-d) | Shows on or after this date |
| `date_to` | date (Y-m-d) | Shows on or before this date |
| `sort_by` | string | One of: `show_date`, `show_name`, `entry_count`, `breed` |
| `sort_dir` | string | `asc` or `desc` (default: `desc`) |
| `per_page` | int | 1-100 (default: 20) |

**Response:**

```json
{
  "data": [
    {
      "id": 2948,
      "show_name": "Sunshine State English Cocker Spaniel Club",
      "show_date": "2026-02-13",
      "show_date_formatted": "February 13, 2026",
      "location": "Lakeland, FL",
      "breed": "SPANIELS (ENGLISH COCKER)",
      "show_type": "CONFORMATION",
      "judge": "Ms.  Lisa Ross",
      "judge_slug": "lisa-ross",
      "entry_count": 53,
      "source_url": "https://...",
      "data_quality_score": null,
      "scraped_at": "2026-02-13T23:10:20+00:00"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "last_page": 5, "per_page": 20, "total": 100 }
}
```

**Cache tag:** `dog-shows`

---

#### `GET /dog-shows/{id}`

Single show with **full entries array included**.

**Response:**

```json
{
  "data": {
    "id": 3241,
    "show_name": "Clemson Kennel Club",
    "show_date": "2026-01-03",
    "show_date_formatted": "January 3, 2026",
    "location": "Perry, GA",
    "breed": "PEMBROKE WELSH CORGIS",
    "show_type": "CONFORMATION",
    "judge": "Mr.  John Smith",
    "judge_slug": "john-smith",
    "entry_count": 17,
    "entries": [
      {
        "class_name": "Puppy, 9 & Under 12 Months Dogs",
        "entry_number": "7",
        "placement": "1/W/B/BW(4 Points)",
        "dog_name": "221B CHAOTIC GOOD AT COTTONTAILS",
        "registration": "DN 82415612",
        "sex": null,
        "owner": "Tara  Cotton, Griffin, GA 302236917",
        "handler": null,
        "sire_dam": "GCH Baymoor Imagination RA ... - Castle Of Arundel ...",
        "breeder": "Lauren Trathen",
        "birth_date": null
      },
      {
        "class_name": "Best of Breed Competition",
        "entry_number": "11",
        "placement": "SEL/BOBOH/OHG1                 (2-GC Points)",
        "dog_name": "GCH SAGUARO'S A STAR IS BORN TKN",
        "registration": "DN 76543201",
        "sex": null,
        "owner": "Owner Name, City, ST 12345",
        "handler": null,
        "sire_dam": "Sire Name - Dam Name",
        "breeder": "Breeder Name",
        "birth_date": null
      }
    ],
    "source_url": "https://...",
    "data_quality_score": null,
    "scraped_at": "2026-01-04T10:30:00+00:00"
  }
}
```

**Cache tag:** `dog-shows`

---

#### `GET /shows/upcoming`

Future shows only (show_date >= today), sorted ascending by date.

**Query Parameters:** `breed`, `location`, `per_page`

**Cache tag:** `dog-shows`

---

### 2. Events (Grouped Shows) -- PRIMARY DISPLAY ENDPOINT

This is the **main endpoint for the homepage/listing page**. Shows are grouped by date + base name (e.g., all "Lakeland Winter Haven Kennel Club" shows on the same date become one event).

#### `GET /events`

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `breed` | string | Exact breed filter |
| `location` | string | Partial match |
| `search` | string | Searches show_name, breed, location |
| `date_from` | date | Events on or after |
| `date_to` | date | Events on or before |
| `per_page` | int | 1-100 (default: 20) |
| `page` | int | Page number |

**Response:**

```json
{
  "data": [
    {
      "slug": "lakeland-winter-haven-kennel-club",
      "date": "2026-02-13",
      "name": "Lakeland Winter Haven Kennel Club",
      "location": "Lakeland, FL",
      "breeds": ["WHIPPETS", "PEMBROKE WELSH CORGIS", "OBEDIENCE TRIAL CLASSES", "Rally Novice Class A", "JUNIOR SHOWMANSHIP COMPETITION"],
      "show_count": 210,
      "total_entries": 1973,
      "shows": [
        {
          "id": 2584,
          "show_name": "Lakeland Winter Haven Kennel Club",
          "breed": "PEMBROKE WELSH CORGIS",
          "show_type": "CONFORMATION",
          "judge": "Mrs.  Geneva Bridges",
          "entry_count": 27
        },
        {
          "id": 2721,
          "show_name": "Lakeland Winter Haven Kennel Club",
          "breed": "OBEDIENCE TRIAL CLASSES",
          "show_type": "OBEDIENCE",
          "judge": "Ms.  Nancy J. Watson",
          "entry_count": 19
        }
      ]
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 45,
    "last_page": 3
  }
}
```

**Cache tag:** `events`

---

#### `GET /events/{date}/{slug}`

Single event with full entries for each nested show.

**URL params:**
- `date`: `YYYY-MM-DD` format
- `slug`: URL-safe event name slug

**Query params:** `breed` (exact match), `search` (text search within entries)

Example: `GET /events/2026-02-13/lakeland-winter-haven-kennel-club?breed=PEMBROKE%20WELSH%20CORGIS`

**Response:**

```json
{
  "data": {
    "slug": "lakeland-winter-haven-kennel-club",
    "date": "2026-02-13",
    "name": "Lakeland Winter Haven Kennel Club",
    "location": "Lakeland, FL",
    "breeds": ["PEMBROKE WELSH CORGIS"],
    "show_count": 1,
    "total_entries": 27,
    "shows": [
      {
        "id": 2584,
        "show_name": "Lakeland Winter Haven Kennel Club",
        "breed": "PEMBROKE WELSH CORGIS",
        "show_type": "CONFORMATION",
        "judge": "Mrs.  Geneva Bridges",
        "entry_count": 27,
        "entries": [
          {
            "class_name": "Open Dogs",
            "entry_number": "17",
            "placement": null,
            "dog_name": "HCC BACK TO THE FUTURE",
            "registration": "DN 12345678",
            "sex": null,
            "owner": "Owner Name, City, ST 12345",
            "handler": null,
            "sire_dam": "Sire Name - Dam Name",
            "breeder": "Breeder Name",
            "birth_date": null
          }
        ]
      }
    ]
  }
}
```

**Cache tag:** `events`

---

#### `GET /events/{date}/{slug}/summary`

Lightweight summary for an event — includes breed stats with show_types but no entries.

**Response:**

```json
{
  "data": {
    "slug": "lakeland-winter-haven-kennel-club",
    "date": "2026-02-13",
    "name": "Lakeland Winter Haven Kennel Club",
    "location": "Lakeland, FL",
    "breeds": [
      {
        "name": "PEMBROKE WELSH CORGIS",
        "show_count": 1,
        "entry_count": 27,
        "show_types": ["CONFORMATION"]
      },
      {
        "name": "OBEDIENCE TRIAL CLASSES",
        "show_count": 1,
        "entry_count": 19,
        "show_types": ["OBEDIENCE"]
      },
      {
        "name": "Rally Novice Class A",
        "show_count": 1,
        "entry_count": 70,
        "show_types": ["RALLY"]
      },
      {
        "name": "JUNIOR SHOWMANSHIP COMPETITION",
        "show_count": 1,
        "entry_count": 33,
        "show_types": ["CONFORMATION"]
      }
    ],
    "show_count": 210,
    "total_entries": 1973
  }
}
```

**Cache tag:** `events`

---

### 3. Judges

#### `GET /judges`

Paginated list of published judges.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `search` | string | Searches name, biography, location |
| `specialty` | string | Filter by breed specialty (exact match in JSON array) |
| `per_page` | int | 1-100 (default: 20) |

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "slug": "john-smith",
      "biography": "John has been judging AKC shows for over 20 years...",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "website": "https://johnsmithjudge.com",
      "location": "New York, NY",
      "profile_image_url": "http://dog-shows-scrapper-admin.test/storage/judges/john-smith/profile.jpg",
      "specialties": ["Golden Retriever", "Labrador Retriever"],
      "show_count": 42
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

**Cache tag:** `judges`

---

#### `GET /judges/{slug}`

Single judge profile. Uses slug-based routing.

Example: `GET /judges/john-smith`

Returns same shape as list item but always includes all fields.

**Cache tag:** `judge-{slug}`

---

#### `GET /judges/{slug}/shows`

All published shows judged by this person.

**Query Parameters:** `breed`, `date_from`, `date_to`, `per_page`

Returns standard paginated `DogShowResource` list (without entries).

**Cache tag:** `judge-{slug}`

---

### 4. Dogs

#### `GET /dogs`

Paginated list of published dog profiles.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `breed` | string | Exact breed filter |
| `owner` | string | Partial match on owner |
| `sex` | string | `Male`, `Female`, `Dog`, or `Bitch` |
| `search` | string | Searches name, call_name, breed, owner, registration |
| `per_page` | int | 1-100 (default: 20) |

**Response:**

```json
{
  "data": [
    {
      "id": 8063,
      "name": "221B CHAOTIC GOOD AT COTTONTAILS",
      "slug": "221b-chaotic-good-at-cottontails-ZVbmG",
      "call_name": null,
      "registration_number": "DN 82415612",
      "breed": "PEMBROKE WELSH CORGIS",
      "sex": null,
      "birth_date": null,
      "sire": "GCH Baymoor Imagination RA ...",
      "dam": "Castle Of Arundel At TreoweCorgi ...",
      "breeder": "Lauren Trathen",
      "owner": "Tara  Cotton, Griffin, GA 302236917",
      "handler": null,
      "biography": null,
      "main_image_url": null,
      "gallery": []
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

**Cache tag:** `dogs`

---

#### `GET /dogs/{slug}`

Single dog profile with approved gallery images.

Example: `GET /dogs/221b-chaotic-good-at-cottontails-ZVbmG`

**Cache tag:** `dog-{slug}`

---

#### `GET /dogs/{slug}/results`

Show results history for this specific dog. The API searches through all published shows' `entries` JSON arrays to find matching records (by registration number or dog name).

**Query Parameters:** `date_from`, `date_to`, `per_page`

**Response:**

```json
{
  "data": [
    {
      "show_id": 3241,
      "show_name": "Clemson Kennel Club",
      "show_date": "2026-01-03",
      "location": "Perry, GA",
      "breed": "PEMBROKE WELSH CORGIS",
      "show_type": "CONFORMATION",
      "judge": "Mr.  John Smith",
      "results": [
        {
          "class_name": "Puppy, 9 & Under 12 Months Dogs",
          "entry_number": "7",
          "placement": "1/W/B/BW(4 Points)",
          "dog_name": "221B CHAOTIC GOOD AT COTTONTAILS",
          "registration": "DN 82415612",
          "sex": null,
          "owner": "Tara  Cotton, Griffin, GA 302236917",
          "handler": null
        },
        {
          "class_name": "Owner-Handled Best of Breed Eligible",
          "entry_number": "7",
          "placement": null,
          "dog_name": "221B CHAOTIC GOOD AT COTTONTAILS",
          "registration": "DN 82415612",
          "sex": null,
          "owner": "Tara  Cotton, Griffin, GA 302236917",
          "handler": null
        }
      ]
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

**Cache tag:** `dog-{slug}`

---

### 5. Global Search

#### `GET /search`

Searches across all content types simultaneously.

**Query Parameters:**

| Param | Type | Required | Description |
|---|---|---|---|
| `q` | string | Yes | Search query (min 2 chars) |
| `type` | string | No | `shows`, `judges`, `dogs`, or `all` (default: `all`) |
| `per_page` | int | No | 1-50 per type (default: 10) |

**Response:**

```json
{
  "query": "golden",
  "type": "all",
  "results": {
    "shows": {
      "data": [ /* DogShowResource items */ ],
      "links": { ... },
      "meta": { ... }
    },
    "judges": {
      "data": [ /* JudgeResource items */ ],
      "links": { ... },
      "meta": { ... }
    },
    "dogs": {
      "data": [ /* DogResource items */ ],
      "links": { ... },
      "meta": { ... }
    }
  }
}
```

When `type` is not `all`, only the requested section is included.

**Cache tag:** `search`

---

### 6. Filter Options (for dropdowns/selects)

These endpoints return distinct values from published shows. Cached for 1 hour.

#### `GET /filters/breeds`

```json
{ "data": ["AFGHAN HOUNDS", "AUSTRALIAN SHEPHERDS", "PEMBROKE WELSH CORGIS", "POODLES (STANDARD)"] }
```

#### `GET /filters/locations`

```json
{ "data": ["Fresno, CA", "Lakeland, FL", "Perry, GA"] }
```

#### `GET /filters/show-types`

```json
{ "data": ["CONFORMATION", "OBEDIENCE", "RALLY"] }
```

#### `GET /filters/judges`

```json
{ "data": ["Mrs.  Geneva Bridges", "Ms.  Nancy J. Watson", "Mr.  Dana P. Cline"] }
```

#### `GET /filters/date-range`

```json
{ "data": { "min": "2026-01-03", "max": "2026-02-13" } }
```

**Cache tag:** `filters`

---

### 7. Stats

#### `GET /stats`

Public statistics for displaying on homepage or about page. Cached for 30 minutes.

```json
{
  "data": {
    "total_shows": 1250,
    "total_breeds": 85,
    "total_judges": 42,
    "total_dogs": 120,
    "date_range": {
      "earliest": "2026-01-03",
      "latest": "2026-02-13"
    },
    "total_entries": 15680
  }
}
```

**Cache tag:** `stats`

---

## Error Responses

All errors return JSON:

```json
{
  "error": "NotFoundHttpException",
  "message": "Show not found."
}
```

| Status | Meaning |
|---|---|
| 401 | Invalid or missing API token |
| 404 | Resource not found |
| 422 | Validation error (invalid query params) |
| 500 | Server error |

Validation errors (422):

```json
{
  "message": "The q field is required.",
  "errors": {
    "q": ["The q field is required."]
  }
}
```

---

## Pagination

All paginated endpoints follow Laravel's standard format:

```json
{
  "data": [ ... ],
  "links": {
    "first": "http://dog-shows-scrapper-admin.test/api/v1/dog-shows?page=1",
    "last": "http://dog-shows-scrapper-admin.test/api/v1/dog-shows?page=5",
    "prev": null,
    "next": "http://dog-shows-scrapper-admin.test/api/v1/dog-shows?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "path": "http://dog-shows-scrapper-admin.test/api/v1/dog-shows",
    "per_page": 20,
    "to": 20,
    "total": 100
  }
}
```

The `events` endpoint uses a simplified pagination (not Laravel's paginator):

```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 45,
    "last_page": 3
  }
}
```

---

## Suggested Next.js Pages Structure

```
app/
  page.tsx                          # Homepage - GET /stats + GET /events (latest)
  events/
    page.tsx                        # Events list - GET /events with filters
    [date]/
      [slug]/
        page.tsx                    # Event detail - GET /events/{date}/{slug}
  shows/
    [id]/
      page.tsx                      # Single show - GET /dog-shows/{id}
  judges/
    page.tsx                        # Judges list - GET /judges
    [slug]/
      page.tsx                      # Judge profile - GET /judges/{slug} + /judges/{slug}/shows
  dogs/
    page.tsx                        # Dogs list - GET /dogs
    [slug]/
      page.tsx                      # Dog profile - GET /dogs/{slug} + /dogs/{slug}/results
  search/
    page.tsx                        # Search results - GET /search?q=...
  api/
    revalidate/
      route.ts                      # On-demand ISR revalidation endpoint
```

## Static Generation Strategy

For `generateStaticParams`:
- `/events` - Paginate through `GET /events?page=1...N`
- `/events/[date]/[slug]` - Extract `date` + `slug` from events list
- `/judges/[slug]` - Extract slugs from `GET /judges?per_page=100`
- `/dogs/[slug]` - Extract slugs from `GET /dogs?per_page=100`
- `/shows/[id]` - Extract IDs from events detail pages

Use `next: { tags: ['tag'] }` on each fetch to enable on-demand revalidation via the tag system.

---

## Entry Object Schema

The `entries` array in dog shows contains objects with these fields (all optional except `dog_name`):

```ts
interface ShowEntry {
  class_name?: string;      // e.g., "Open Dogs", "Puppy Bitches 6-9", "Best of Breed Competition"
  entry_number?: string;    // armband/catalog number, e.g., "7", "25"
  placement?: string;       // e.g., "1", "1/W/B/BW(4 Points)", "SEL/BOBOH/OHG1 (2-GC Points)", "A" (absent), or null
  dog_name: string;         // registered name (ALL CAPS)
  registration?: string;    // kennel club registration number, e.g., "DN 82415612"
  sex?: string;             // often null; when present: "Dog" or "Bitch"
  owner?: string;           // includes address, e.g., "Tara  Cotton, Griffin, GA 302236917"
  handler?: string;         // often null
  sire_dam?: string;        // combined sire and dam, e.g., "GCH Sire Name - CH Dam Name"
  breeder?: string;
  birth_date?: string;      // often null
}
```

**Placement values:**
- Numeric: `"1"`, `"2"`, `"3"`, `"4"`
- With awards: `"1/W/B/BW(4 Points)"`, `"1/R"`, `"1/W/BBE/BBEG4"`
- Select/specials: `"SEL(1-GC Points)"`, `"SEL/BOBOH/OHG1 (2-GC Points)"`
- Other: `"OS(1-GC Points)"` (Owner-handled Select), `"A"` (absent), `"1/BP"` (Best Puppy)
- `null` — no placement recorded (common for many entries)

## Next.js Environment Variables

```env
# Server-side only (do NOT prefix with NEXT_PUBLIC_)
API_TOKEN=dsa_k7m2p9x4w8n1q5r3t6y0u2i8o4a7s1d5f3g9h6j
API_BASE_URL=http://dog-shows-scrapper-admin.test/api/v1
REVALIDATE_SECRET=your-nextjs-revalidate-secret-here
```
