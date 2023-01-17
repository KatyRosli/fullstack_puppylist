import http from "../http-common";
import IPuppyData from "../types/Puppy";

const getAll = () => {
  return http.get<Array<IPuppyData>>("/");
};

const get = (id: string) => {
  return http.get<IPuppyData>(`/${id}`);
};

const create = (data: Omit<IPuppyData, 'id'>) => {
  return http.post<Omit<IPuppyData, 'id'>>("/", data);
};

const update = (id: string, data: IPuppyData) => {
  return http.put<any>(`/${id}`, data);
};

const remove = (id: string) => {
  return http.delete<any>(`/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/`);
};

const findByBreed = (breed: string) => {
  return http.get<Array<IPuppyData>>(`/?title=${breed}`);
};

const PuppyService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByBreed,
};

export default PuppyService;