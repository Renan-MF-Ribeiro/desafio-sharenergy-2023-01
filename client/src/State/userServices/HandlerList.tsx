import { IUserList } from "types/UserList";
import { IUser } from "types/User";

function Search(term: string, data: IUser[]) {
  const reg = new RegExp(term, "i");
  return (data = data.filter(
    (user) =>
      reg.test(user.name) || reg.test(user.email) || reg.test(user.networkLogin)
  ));
}

export function handleChangePage(list: IUserList, search?: string) {
  const all = search ? Search(search, list.all) : list.all;

  const info = JSON.parse(JSON.stringify(list.info));
  info.page = info.page ? info.page : 1;

  info.total = search ? all.length : 100;

  info.results = info?.results ? info.results : 5;

  if (
    info.results * info.page > info.total &&
    info.total < info.results * info.page - info.results
  ) {
    info.page = 1;
  }

  const data = all.slice(
    info.page * info.results - info.results,
    info.results * info.page
  );

  return { data: data, info: info, all: list.all };
}
