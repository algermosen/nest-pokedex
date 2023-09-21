import { PokeRegion } from './types';

export class PokemonRegion {
  private KANTO_RANGE = [1, 151];
  private JOHTO_RANGE = [152, 251];
  private HOENN_RANGE = [252, 386];
  private SINNOH_RANGE = [387, 494];
  private UNOVA_RANGE = [495, 649];
  private KALOS_RANGE = [650, 721];
  private ALOLA_RANGE = [722, 809];
  private GALAR_RANGE = [810, 899];
  private HISUI_RANGE = [900, 905];
  private PALDEA_RANGE = [906, 1010];

  constructor(private readonly name: PokeRegion) {}

  getRegionalPokemonNo() {
    switch (this.name) {
      case 'kanto':
        return this.KANTO_RANGE;
      case 'johto':
        return this.JOHTO_RANGE;
      case 'hoenn':
        return this.HOENN_RANGE;
      case 'sinnoh':
        return this.SINNOH_RANGE;
      case 'unova':
        return this.UNOVA_RANGE;
      case 'kalos':
        return this.KALOS_RANGE;
      case 'alola':
        return this.ALOLA_RANGE;
      case 'galar':
        return this.GALAR_RANGE;
      case 'hisui':
        return this.HISUI_RANGE;
      case 'paldea':
        return this.PALDEA_RANGE;
    }
  }
}
