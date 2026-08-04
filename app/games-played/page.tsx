import { favoriteGames, currentlyPlaying, alsoPlayed, wishToPlay } from "@/data/games";

export default function GamesPlayedPage() {

  return (
    <div className="md:py-8 flex flex-col gap-12">
      <header className="pt-14 md:pt-20">
        <div className="klabel mb-[22px]">Between commits</div>
        <h1 className="font-serif text-[46px] leading-[0.95] md:text-[64px]">
          Games Played
        </h1>
      </header>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-serif">My Favorite Games</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {favoriteGames.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-serif">Games I'm Playing Now</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {currentlyPlaying.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-serif">Games I Wish to Play in the Future</h2>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {wishToPlay.map((game) => (
            <li key={game}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-serif">I've Also Played These Games</h2>
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

