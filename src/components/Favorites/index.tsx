import { IMWines } from "../../models/Wines.ts";
import { LayoutDefault } from "../Layout/index.tsx";

interface IPropsFavorites {
  favorites: IMWines;
  name: SVGStringList;
}

export const Favorites = ({ name }: IPropsFavorites) => {
  console.log(name);
  return (
    <div>
      <LayoutDefault />
    </div>
  );
};
