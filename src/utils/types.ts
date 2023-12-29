// { lat: longlatResults.lat, long: longlatResults.lng }

export interface LatLong {
  lat: number
  long: number
}

export interface ClamRequest {
  payload: {
    name: string | null
    address: string | null
    consistencyScore: number | null
    volumeScore: number | null
    tasteScore: number | null
    priceScore: number | null
    price: number | null
    cuisine: string | null
    awardWinning: string | null
    notes: string | null
    totalScore: number
    lat: number
    long: number
  }
  token: string
}
