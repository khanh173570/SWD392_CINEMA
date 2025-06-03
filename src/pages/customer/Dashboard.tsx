import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Calendar, Clock, Film, MapPin, Search, Tag, X } from "lucide-react";
import { CustomerData, Movie, Theater } from "../../types/customer";
import CinestarLogo from "../../components/common/CinestarLogo";

const CustomerDashboard = React.memo(() => {
  const [data, setData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Booking process states
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Query states for filtering
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Fetch data only once on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get<CustomerData>(
          "/data/customerData.json"
        );
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load movie data. Please try again later.");
          console.error("Error loading data:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset selection when step changes - optimized with useEffect dependency
  useEffect(() => {
    if (currentStep === 1) {
      setSelectedTheater(null);
      setSelectedMovie(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else if (currentStep === 2) {
      setSelectedMovie(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else if (currentStep === 3) {
      setSelectedDate(null);
      setSelectedTime(null);
    } else if (currentStep === 4) {
      setSelectedTime(null);
    }
  }, [currentStep]);
  // Filter movies by search query and genre using useMemo to prevent unnecessary recalculations
  const filteredMovies = useMemo(() => {
    if (!data?.movies) return [];

    return data.movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre
        ? movie.genre.includes(selectedGenre)
        : true;
      return matchesSearch && matchesGenre;
    });
  }, [data?.movies, searchQuery, selectedGenre]);
  // Extract all unique genres from movies using useMemo
  const allGenres = useMemo(() => {
    if (!data?.movies) return [];

    return data.movies
      .map((movie) => movie.genre)
      .flat()
      .filter((genre, index, self) => self.indexOf(genre) === index);
  }, [data?.movies]);
  // Handle movie selection with useCallback - memoize with empty dependency array
  // since these functions don't depend on any props or state that changes
  const handleMovieSelect = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentStep(3);
  }, []);

  // Handle theater selection with useCallback
  const handleTheaterSelect = useCallback((theater: Theater) => {
    setSelectedTheater(theater);
    setCurrentStep(2);
  }, []);

  // Handle date selection with useCallback
  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    setCurrentStep(4);
  }, []);

  // Handle time selection with useCallback
  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    // Move to next step or complete booking
    // For now, we'll just stay on step 4
  }, []);

  // Reset the booking process with useCallback
  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setSelectedTheater(null);
    setSelectedMovie(null);
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cinestar-red"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          className="bg-cinestar-red text-white px-4 py-2 rounded-md hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-cinestar-dark text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book Your Cinema Experience
              </h1>
              <p className="text-lg opacity-80 mb-6">
                The best movies in theaters now. Experience the magic on the big
                screen.
              </p>
              <button
                className="bg-cinestar-red text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-700 transition duration-300"
                onClick={() =>
                  document
                    .getElementById("booking-widget")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Tickets Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {" "}
                <img
                  src="/images/cinema-hero.jpg"
                  alt="Cinema Experience"
                  className="rounded-lg shadow-xl"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x400/red/white?text=Cinema+Experience";
                  }}
                />
                <div className="absolute -bottom-4 -right-4 bg-cinestar-red p-4 rounded-full shadow-lg">
                  <CinestarLogo className="h-16 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Listing Section - 2/3 width */}
          <div className="lg:w-4/5">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                  Now Playing
                </h2>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  {/* Search bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search movies..."
                      className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>

                  {/* Genre filter */}
                  <select
                    className="px-4 py-2 border rounded-md"
                    value={selectedGenre || ""}
                    onChange={(e) => setSelectedGenre(e.target.value || null)}
                  >
                    <option value="">All Genres</option>
                    {allGenres?.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Movies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMovies && filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative">
                        {" "}
                        <img
                          src={movie.imageUrl}
                          alt={movie.title}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/300x400/red/white?text=Movie+Poster";
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-cinestar-red text-white text-xs font-bold px-2 py-1 rounded">
                          {movie.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {movie.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{movie.releaseDate}</span>
                        </div>{" "}
                        <div className="flex items-center mb-3 overflow-x-auto whitespace-nowrap">
                          {movie.genre.map((genre, index) => (
                            <React.Fragment key={genre}>
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                {genre}
                              </span>
                              {index < movie.genre.length - 1 && (
                                <span className="mx-1">•</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {movie.description}
                        </p>
                        <button
                          className="w-full bg-cinestar-red text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
                          onClick={() => handleMovieSelect(movie)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">
                      No movies found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Widget - 1/3 width */}
          <div className="lg:w-1/5" id="booking-widget">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Book Tickets
                </h2>
                <CinestarLogo className="h-8 w-8" />
              </div>

              {/* Step indicators */}
              <div className="flex justify-between mb-6 relative">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`z-10 flex items-center justify-center rounded-full h-8 w-8 ${
                      currentStep === step
                        ? "bg-cinestar-red text-white"
                        : currentStep > step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? "✓" : step}
                  </div>
                ))}
                {/* Progress bar */}
                <div className="absolute top-4 left-0 h-0.5 bg-gray-200 w-full -z-0">
                  <div
                    className="h-full bg-cinestar-red transition-all duration-300"
                    style={{ width: `${(currentStep - 1) * 33.33}%` }}
                  ></div>
                </div>
              </div>

              {/* Step labels */}
              <div className="flex justify-between mb-8 text-xs text-gray-500">
                <span className="text-center w-1/4">Theater</span>
                <span className="text-center w-1/4">Movie</span>
                <span className="text-center w-1/4">Date</span>
                <span className="text-center w-1/4">Time</span>
              </div>

              {/* Current selection summary */}
              {(selectedTheater ||
                selectedMovie ||
                selectedDate ||
                selectedTime) && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">
                      Your Selection
                    </h3>
                    <button
                      className="text-gray-400 hover:text-cinestar-red"
                      onClick={resetBooking}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {selectedTheater && (
                    <div className="flex items-center text-sm mb-1">
                      <MapPin className="h-4 w-4 mr-2 text-cinestar-red" />
                      <span>
                        {selectedTheater.name} - {selectedTheater.location}
                      </span>
                    </div>
                  )}

                  {selectedMovie && (
                    <div className="flex items-center text-sm mb-1">
                      <Film className="h-4 w-4 mr-2 text-cinestar-red" />
                      <span>
                        {selectedMovie.title} ({selectedMovie.rating})
                      </span>
                    </div>
                  )}

                  {selectedDate && (
                    <div className="flex items-center text-sm mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-cinestar-red" />
                      <span>{selectedDate}</span>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="flex items-center text-sm mb-1">
                      <Clock className="h-4 w-4 mr-2 text-cinestar-red" />
                      <span>{selectedTime}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step Content */}
              <div className="bg-white rounded-lg">
                {/* Step 1: Select Theater */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">
                      Select a Theater
                    </h3>
                    <div className="space-y-3">
                      {data?.theaters.map((theater) => (
                        <div
                          key={theater.id}
                          className="border rounded-lg p-4 cursor-pointer hover:border-cinestar-red transition-colors"
                          onClick={() => handleTheaterSelect(theater)}
                        >
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-cinestar-red mr-2 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{theater.name}</h4>
                              <p className="text-sm text-gray-600">
                                {theater.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Select Movie */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">
                        Select a Movie
                      </h3>
                      <button
                        className="text-sm text-cinestar-red hover:underline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </button>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                      {data?.movies.map((movie) => (
                        <div
                          key={movie.id}
                          className="border rounded-lg p-3 cursor-pointer hover:border-cinestar-red transition-colors"
                          onClick={() => handleMovieSelect(movie)}
                        >
                          <div className="flex">
                            <img
                              src={movie.imageUrl}
                              alt={movie.title}
                              className="h-20 w-14 object-cover rounded mr-3"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/100x150/red/white?text=Movie";
                              }}
                            />
                            <div>
                              <h4 className="font-medium line-clamp-1">
                                {movie.title}
                              </h4>
                              <div className="flex items-center mb-1">
                                <Tag className="h-3 w-3 text-cinestar-red mr-1" />
                                <span className="text-xs text-gray-600">
                                  {movie.rating}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {movie.genre.slice(0, 2).map((genre) => (
                                  <span
                                    key={genre}
                                    className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded"
                                  >
                                    {genre}
                                  </span>
                                ))}
                                {movie.genre.length > 2 && (
                                  <span className="text-xs text-gray-500">
                                    +{movie.genre.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Select Date */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">
                        Select a Date
                      </h3>
                      <button
                        className="text-sm text-cinestar-red hover:underline"
                        onClick={() => setCurrentStep(2)}
                      >
                        Back
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {data?.showtimes.map((showtime) => (
                        <div
                          key={showtime.id}
                          className={`border rounded-lg p-3 text-center cursor-pointer hover:border-cinestar-red transition-colors ${
                            selectedDate === showtime.date
                              ? "border-cinestar-red bg-red-50"
                              : ""
                          }`}
                          onClick={() => handleDateSelect(showtime.date)}
                        >
                          <Calendar className="h-5 w-5 mx-auto mb-1 text-cinestar-red" />
                          <p className="text-sm font-medium">{showtime.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Select Time */}
                {currentStep === 4 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">
                        Select a Time
                      </h3>
                      <button
                        className="text-sm text-cinestar-red hover:underline"
                        onClick={() => setCurrentStep(3)}
                      >
                        Back
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {data?.showtimes
                        .find((showtime) => showtime.date === selectedDate)
                        ?.times.map((time) => (
                          <div
                            key={time}
                            className={`border rounded-lg p-3 text-center cursor-pointer hover:border-cinestar-red transition-colors ${
                              selectedTime === time
                                ? "border-cinestar-red bg-red-50"
                                : ""
                            }`}
                            onClick={() => handleTimeSelect(time)}
                          >
                            <Clock className="h-5 w-5 mx-auto mb-1 text-cinestar-red" />
                            <p className="text-sm font-medium">{time}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Continue or Complete Button */}
                {selectedTime && (
                  <div className="mt-6">
                    <button className="w-full bg-cinestar-red text-white py-3 rounded-md hover:bg-red-700 transition duration-300 flex items-center justify-center">
                      <span className="mr-2">Continue to Seating</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CustomerDashboard;
