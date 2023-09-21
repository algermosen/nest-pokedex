import { BadRequestException, Injectable } from '@nestjs/common';
import { SeedDto } from './dto/seed.dto';
import { isPokeRegion } from 'src/common/types';
import { PokemonRegion } from 'src/common/pokemon-region.constant';
import { PokeListResponse } from './interfaces/poke-list-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

const DEFAULT_LIMIT = 500;
const DEFAULT_OFFSET = 0;

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async loadData(seedDto: SeedDto) {
    let offset = DEFAULT_OFFSET;
    let regionRange: number | undefined;

    if (seedDto.region) {
      if (!isPokeRegion(seedDto.region))
        throw new BadRequestException(`${seedDto.region} is no a valid region`);

      const [startId, endId] = new PokemonRegion(
        seedDto.region,
      ).getRegionalPokemonNo();

      regionRange = endId - startId + 1;
      offset = startId - 1;
      console.log({ regionRange, offset });
    }

    const limit = seedDto.limit ?? regionRange ?? DEFAULT_LIMIT;

    const data = await this.http.get<PokeListResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );

    const pokemonToInsert = data.results.map(({ name, url }) => {
      const reg = /pokemon\/(?<no>\d+)\//g;

      const regRes = reg.exec(url);
      return {
        name,
        no: +regRes?.groups.no,
      } as CreatePokemonDto;
    });

    await this.pokemonModel.deleteMany({});
    await this.pokemonModel.insertMany(pokemonToInsert);

    return pokemonToInsert;
  }
}
