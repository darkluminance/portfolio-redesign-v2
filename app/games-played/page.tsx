import { favoriteGames, currentlyPlaying, alsoPlayed, wishToPlay } from "@/data/games";

export default function GamesPlayedPage() {

  return (
    <div className="md:py-8 flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">My Favorite Games</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {favoriteGames.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Games I'm Playing Now</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {currentlyPlaying.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Games I Wish to Play in the Future</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {wishToPlay.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">I've Also Played These Games</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {alsoPlayed.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

