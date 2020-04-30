import { Game } from '../../domain/games/game'
import { GameRepository } from '../../domain/games/gameRepository'
import { Service } from 'typedi'

@Service('GameRepository')
export class InMemoryGameRepository implements GameRepository {
    private games: Map<string, Game> = new Map()

    findAllAvailableGames(): Array<Game> {
        return Array
            .from(this.games.values())
            .filter(game => game.isAvailable)
    }

    addGame(game: Game): void {
        if (this.games.has(game.id.toString())) {
            throw new Error(`game with id '${game.id}' already exists`)
        }

        this.games.set(game.id.toString(), game)
    }
}