import search from '../assets/sms-search.svg'

const SearchBar = function ({
  setSearchQuery,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <label htmlFor="mail-search" className="block mb-4 relative">
      <img
        src={search}
        alt="sms-search"
        className="absolute inset-[auto_auto_50%_1em] translate-y-1/2"
      />
      <input
        type="text"
        name="mail-search"
        onChange={e => setSearchQuery(e.target.value.trim())}
        className="outline-none pl-12 pr-4 py-3 bg-[#191D1D] rounded-xl w-full"
      />
    </label>
  )
}

export default SearchBar
