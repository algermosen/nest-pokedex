import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

const MONGO_ERROR = {
  DUPLICATE_KEY: 11000,
};

@Injectable()
export class PokemonService {
  private readonly defaultLimit: number;
  private readonly defaultOffset: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
    this.defaultOffset = configService.get<number>('defaultOffset');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.sanitizedName;

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(queryParameters: PaginationDto) {
    const { limit = this.defaultLimit, offset = this.defaultOffset } =
      queryParameters;

    return await this.pokemonModel
      .find()
      .skip(offset)
      .limit(limit)
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
      return pokemon;
    }

    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
      return pokemon;
    }

    pokemon = await this.pokemonModel.findOne({
      name: term.toLowerCase().trim(),
    });

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon could not be found using the term '${term}'`,
      );
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.sanitizedName;
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  handleExceptions(error) {
    if ((error.code = MONGO_ERROR.DUPLICATE_KEY)) {
      throw new BadRequestException(
        `Pokemon exists in DB \n\n ${JSON.stringify(error, null, 2)}`,
      );
    }

    console.log(error);

    throw new InternalServerErrorException(
      `Can't update Pokemon - Check server logs`,
    );
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(term);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletedCount) throw new NotFoundException(`'${id}' not found`);
    return;
  }
}
