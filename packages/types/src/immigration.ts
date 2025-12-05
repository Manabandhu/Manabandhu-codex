export interface ImmigrationResource {
  id: string;
  title: string;
  link: string;
  category: string;
}

export interface ImmigrationCase {
  id: string;
  question: string;
  status: 'open' | 'responded' | 'closed';
  response?: string;
}
