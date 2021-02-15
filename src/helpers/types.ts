export interface ILandings {
    backdrop_path: string | undefined
    first_air_date: string | undefined
    genre_ids: Array<Number>
    id: Number
    name: string | undefined
    origin_country: Array<String>
    origin_language: String | undefined
    origin_name: String | undefined
    overview: String | undefined
    popularity: Number | undefined
    poster_path: String | undefined
    vote_average: Number | undefined
    vote_count: Number | undefined
 }

export interface IStore {
    likedList: Array<ILandings | undefined>,
    loading: boolean,
    cartList: Array<ILandings | undefined>,
    isLightTheme: boolean,
    cartSum: number,
    likedSum: number
}
