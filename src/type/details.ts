type Song = {
  id: number,
  title: string
}

export interface Details {
  id: number,
  performer: string,
  titleAlbum:string,
  genre: string,
  year: string,
  country: string,
  label: string,
  songs: Song[],
  price: number,
  discount: number,
  pictureUrl: string,
  format: string,
  color: string,
}
