import { IGame } from './../types/IGame';
import { IComment } from './../types/IComment';

export function shortGameInfo(object: IGame) {
  const result = {
    id: object.id,
    title: object.name,
    releaseYear: object.release_year,
    price: `$${object.price}.00`,
    image:
      object?.cover_art?.formats?.thumbnail?.url ||
      'https://res.cloudinary.com/gamerbox/image/upload/v1607228966/thumbnail_Call_of_Duty_Modern_Warfare_2_1fe3166e3e.jpg',
    imageName: object.cover_art?.formats?.thumbnail?.name || 'no name',
  };
  return result;
}
export function bigGameInfo(object: IGame) {
  const result = {
    title: object.name,
    releaseYear: object.release_year,
    price: `$${object.price}.00`,
    image:
      object?.cover_art?.formats?.small?.url ||
      'https://res.cloudinary.com/gamerbox/image/upload/v1607228966/thumbnail_Call_of_Duty_Modern_Warfare_2_1fe3166e3e.jpg',
    imageName: object?.cover_art?.formats?.small?.name || 'no name',
    gender: object.genre.name,
    publishers: object.publishers,
    platforms: object.platforms,
  };
  return result;
}
export function comments(object: IComment) {
  const result = {
    user: `@${object.user.username}`,
    id: object.id,
    body: object.body,
    date: new Date(object.created_at).toDateString(),
  };
  return result;
}
