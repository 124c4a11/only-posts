export interface IOptions {
  sort: 'ASC' | 'DESC';
  filter: {
    name: string;
    value: string;
  };
}
