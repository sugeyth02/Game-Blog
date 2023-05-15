import { IComment } from './../types/IComment';

function sortByDate(array: Array<IComment>) {
  array.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return array;
}
export { sortByDate };
