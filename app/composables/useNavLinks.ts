export interface NavLink {
  label: string;
  href: string;
}

export const useNavLinks = (): NavLink[] => [
  { label: 'Magazine', href: '/magazine' },
  { label: 'Authors', href: '/authors' },
  { label: 'Podcast', href: '/podcast' },
];
